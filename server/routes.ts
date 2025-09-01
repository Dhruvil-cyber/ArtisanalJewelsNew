import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertProductSchema, insertCategorySchema, insertReviewSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user || null);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public product routes
  app.get("/api/products", async (req, res) => {
    try {
      const {
        category,
        search,
        minPrice,
        maxPrice,
        metal,
        gemstone,
        featured,
        limit = "20",
        offset = "0"
      } = req.query;

      const filters = {
        category: category ? parseInt(category as string) : undefined,
        search: search as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        metal: metal as string,
        gemstone: gemstone as string,
        featured: featured === "true",
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      };

      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const variants = await storage.getProductVariants(id);
      const reviews = await storage.getReviews(id);
      
      res.json({ ...product, variants, reviews });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/products/handle/:handle", async (req, res) => {
    try {
      const product = await storage.getProductByHandle(req.params.handle);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const variants = await storage.getProductVariants(product.id);
      const reviews = await storage.getReviews(product.id);
      
      res.json({ ...product, variants, reviews });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Cart routes
  app.get("/api/cart", async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const sessionId = req.session?.id || req.headers['x-session-id'] as string;
      
      const items = await storage.getCartItems(userId, sessionId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const sessionId = req.session?.id || req.headers['x-session-id'] as string;
      const { productId, variantId, quantity = 1 } = req.body;

      const item = await storage.addToCart({
        userId,
        sessionId,
        productId,
        variantId,
        quantity,
      });
      
      res.status(201).json(item);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;

      const item = await storage.updateCartItem(id, quantity);
      res.json(item);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  // Wishlist routes (protected)
  app.get("/api/wishlist", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const wishlistIds = await storage.getWishlist(userId);
      
      // Get full product details for wishlist items
      const products = [];
      for (const productId of wishlistIds) {
        const product = await storage.getProduct(productId);
        if (product) {
          products.push(product);
        }
      }
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({ message: "Failed to fetch wishlist" });
    }
  });

  app.post("/api/wishlist", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { productId } = req.body;

      await storage.addToWishlist(userId, productId);
      res.status(201).json({ message: "Added to wishlist" });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      res.status(500).json({ message: "Failed to add to wishlist" });
    }
  });

  app.delete("/api/wishlist/:productId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const productId = parseInt(req.params.productId);

      await storage.removeFromWishlist(userId, productId);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      res.status(500).json({ message: "Failed to remove from wishlist" });
    }
  });

  // Orders (protected)
  app.get("/api/orders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const order = await storage.createOrder(req.body);
      
      // Clear cart after order creation
      const userId = req.user?.claims?.sub;
      const sessionId = req.session?.id || req.headers['x-session-id'] as string;
      await storage.clearCart(userId, sessionId);
      
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Reviews
  app.get("/api/products/:id/reviews", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const reviews = await storage.getReviews(productId);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/products/:id/reviews", isAuthenticated, async (req: any, res) => {
    try {
      const productId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      const { rating, title, comment } = req.body;

      const review = await storage.createReview({
        productId,
        userId,
        customerName: req.user.claims.first_name ? 
          `${req.user.claims.first_name} ${req.user.claims.last_name || ''}`.trim() :
          req.user.claims.email?.split('@')[0] || 'Anonymous',
        rating,
        title,
        comment,
        isVerified: true, // Since user is authenticated
      });
      
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Admin routes (protected)
  app.get("/api/admin/products", isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const products = await storage.getProducts({ limit: 100 });
      res.json(products);
    } catch (error) {
      console.error("Error fetching admin products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post("/api/admin/products", isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validated = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validated);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put("/api/admin/products/:id", isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const id = parseInt(req.params.id);
      const product = await storage.updateProduct(id, req.body);
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.post("/api/admin/categories", isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validated = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validated);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  // Seed data endpoint for initial setup
  app.post("/api/seed", async (req, res) => {
    try {
      // Create default categories
      const engagementCategory = await storage.createCategory({
        name: "Engagement Rings",
        slug: "engagement-rings",
        description: "Beautiful engagement rings for your special moment",
      });

      const necklaceCategory = await storage.createCategory({
        name: "Necklaces",
        slug: "necklaces", 
        description: "Elegant necklaces for every occasion",
      });

      const earringCategory = await storage.createCategory({
        name: "Earrings",
        slug: "earrings",
        description: "Stunning earrings to complement your style",
      });

      const braceletCategory = await storage.createCategory({
        name: "Bracelets",
        slug: "bracelets",
        description: "Sophisticated bracelets and bangles",
      });

      // Create sample products
      const products = [
        {
          title: "Classic Solitaire Diamond Ring",
          handle: "classic-solitaire-diamond-ring",
          description: "A timeless solitaire diamond ring featuring a brilliant 1-carat diamond set in 14k gold. Perfect for engagements and special occasions.",
          shortDescription: "1ct Diamond, 14k Gold",
          category: engagementCategory.id,
          tags: ["diamond", "engagement", "solitaire", "classic"],
          images: [
            {
              url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
              alt: "Classic diamond engagement ring"
            }
          ],
          basePrice: "3200.00",
          metal: "gold",
          gemstone: "diamond",
          carat: "1.00",
          sku: "ENG-SOL-1CT-14K",
          stock: 15,
          isFeatured: true,
        },
        {
          title: "Pearl Strand Necklace",
          handle: "pearl-strand-necklace",
          description: "Elegant cultured pearl necklace with 18k gold clasp. Each pearl is hand-selected for its luster and quality.",
          shortDescription: "Cultured Pearls, 18k Gold",
          category: necklaceCategory.id,
          tags: ["pearl", "necklace", "elegant", "classic"],
          images: [
            {
              url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
              alt: "Elegant pearl necklace"
            }
          ],
          basePrice: "1850.00",
          metal: "gold",
          gemstone: "pearl",
          sku: "NECK-PEARL-18K",
          stock: 8,
          isFeatured: true,
        },
        {
          title: "Diamond Stud Earrings",
          handle: "diamond-stud-earrings",
          description: "Classic diamond stud earrings featuring 0.5ct diamonds each in white gold settings. Perfect for everyday elegance.",
          shortDescription: "0.5ct Each, White Gold",
          category: earringCategory.id,
          tags: ["diamond", "studs", "earrings", "white-gold"],
          images: [
            {
              url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
              alt: "Diamond stud earrings"
            }
          ],
          basePrice: "2400.00",
          metal: "white-gold",
          gemstone: "diamond",
          carat: "0.50",
          sku: "EAR-STUD-05CT-WG",
          stock: 12,
          isFeatured: true,
        },
        {
          title: "Tennis Bracelet",
          handle: "tennis-bracelet",
          description: "Stunning diamond line tennis bracelet in 18k gold. Features carefully matched diamonds for consistent brilliance.",
          shortDescription: "Diamond Line, 18k Gold",
          category: braceletCategory.id,
          tags: ["diamond", "bracelet", "tennis", "luxury"],
          images: [
            {
              url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
              alt: "Diamond tennis bracelet"
            }
          ],
          basePrice: "4750.00",
          metal: "gold",
          gemstone: "diamond",
          sku: "BRAC-TENNIS-18K",
          stock: 5,
          isFeatured: true,
        },
      ];

      for (const productData of products) {
        await storage.createProduct(productData);
      }

      res.json({ message: "Database seeded successfully" });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ message: "Failed to seed database" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
