import { db } from "./db";
import { categories, products } from "@shared/schema";
import { sql } from "drizzle-orm";

export async function seedDatabase() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(products);
  await db.delete(categories);

  // Seed categories
  const categoryData = [
    { name: "Rings", slug: "rings", description: "Elegant rings for every occasion", sortOrder: 1 },
    { name: "Necklaces", slug: "necklaces", description: "Beautiful necklaces and pendants", sortOrder: 2 },
    { name: "Earrings", slug: "earrings", description: "Stunning earrings to complete any look", sortOrder: 3 },
    { name: "Bracelets", slug: "bracelets", description: "Luxurious bracelets and bangles", sortOrder: 4 },
    { name: "Wedding", slug: "wedding", description: "Perfect pieces for your special day", sortOrder: 5 }
  ];

  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  console.log("Seeded categories:", insertedCategories.length);

  // Seed products
  const productData = [
    {
      title: "Diamond Solitaire Engagement Ring",
      handle: "diamond-solitaire-engagement-ring",
      description: "A timeless classic featuring a brilliant round diamond set in 14k white gold. This elegant solitaire design showcases the beauty of the center stone with a clean, sophisticated setting.",
      shortDescription: "Classic diamond solitaire in 14k white gold",
      category: insertedCategories[0].id, // Rings
      tags: ["engagement", "diamond", "solitaire", "classic"],
      images: [
        { url: "/api/placeholder/ring-1.jpg", alt: "Diamond Solitaire Ring Front View" },
        { url: "/api/placeholder/ring-1-side.jpg", alt: "Diamond Solitaire Ring Side View" }
      ],
      basePrice: "2999.00",
      currency: "USD",
      metal: "white-gold",
      gemstone: "diamond",
      carat: "1.00",
      sku: "DSR-001-WG",
      stock: 10,
      isFeatured: true,
      isActive: true
    },
    {
      title: "Pearl Drop Earrings",
      handle: "pearl-drop-earrings",
      description: "Elegant freshwater pearl drop earrings featuring lustrous pearls suspended from delicate gold chains. Perfect for both casual and formal occasions.",
      shortDescription: "Classic pearl drop earrings in gold",
      category: insertedCategories[2].id, // Earrings
      tags: ["pearls", "earrings", "elegant", "gold"],
      images: [
        { url: "/api/placeholder/earrings-1.jpg", alt: "Pearl Drop Earrings" }
      ],
      basePrice: "299.00",
      currency: "USD",
      metal: "gold",
      gemstone: "pearl",
      sku: "PDE-001-G",
      stock: 25,
      isFeatured: false,
      isActive: true
    },
    {
      title: "Rose Gold Tennis Bracelet",
      handle: "rose-gold-tennis-bracelet",
      description: "A stunning tennis bracelet featuring a continuous line of brilliant diamonds set in luxurious rose gold. This timeless piece adds sparkle to any ensemble.",
      shortDescription: "Diamond tennis bracelet in rose gold",
      category: insertedCategories[3].id, // Bracelets
      tags: ["tennis", "bracelet", "diamond", "rose-gold"],
      images: [
        { url: "/api/placeholder/bracelet-1.jpg", alt: "Rose Gold Tennis Bracelet" }
      ],
      basePrice: "1899.00",
      currency: "USD",
      metal: "rose-gold",
      gemstone: "diamond",
      carat: "3.00",
      sku: "RTB-001-RG",
      stock: 8,
      isFeatured: true,
      isActive: true
    },
    {
      title: "Emerald Pendant Necklace",
      handle: "emerald-pendant-necklace",
      description: "A captivating emerald pendant surrounded by a halo of diamonds, suspended from a delicate platinum chain. This piece embodies elegance and sophistication.",
      shortDescription: "Emerald and diamond pendant in platinum",
      category: insertedCategories[1].id, // Necklaces
      tags: ["emerald", "pendant", "diamond", "platinum"],
      images: [
        { url: "/api/placeholder/necklace-1.jpg", alt: "Emerald Pendant Necklace" }
      ],
      basePrice: "3499.00",
      currency: "USD",
      metal: "platinum",
      gemstone: "emerald",
      carat: "2.50",
      sku: "EPN-001-PT",
      stock: 5,
      isFeatured: true,
      isActive: true
    },
    {
      title: "Sapphire Halo Ring",
      handle: "sapphire-halo-ring",
      description: "A magnificent blue sapphire surrounded by a brilliant halo of diamonds, set in white gold. This ring combines traditional elegance with modern craftsmanship.",
      shortDescription: "Blue sapphire halo ring in white gold",
      category: insertedCategories[0].id, // Rings
      tags: ["sapphire", "halo", "diamond", "engagement"],
      images: [
        { url: "/api/placeholder/ring-2.jpg", alt: "Sapphire Halo Ring" }
      ],
      basePrice: "2799.00",
      currency: "USD",
      metal: "white-gold",
      gemstone: "sapphire",
      carat: "1.50",
      sku: "SHR-001-WG",
      stock: 12,
      isFeatured: false,
      isActive: true
    },
    {
      title: "Wedding Band Set",
      handle: "wedding-band-set",
      description: "Matching his and hers wedding bands crafted in 18k gold. These bands feature a comfort fit design and subtle diamond accents for a perfect union of style and comfort.",
      shortDescription: "Matching wedding band set in 18k gold",
      category: insertedCategories[4].id, // Wedding
      tags: ["wedding", "bands", "matching", "gold"],
      images: [
        { url: "/api/placeholder/wedding-bands.jpg", alt: "Wedding Band Set" }
      ],
      basePrice: "1299.00",
      currency: "USD",
      metal: "gold",
      sku: "WBS-001-G",
      stock: 15,
      isFeatured: true,
      isActive: true
    }
  ];

  const insertedProducts = await db.insert(products).values(productData).returning();
  console.log("Seeded products:", insertedProducts.length);

  console.log("Database seeding completed!");
  return { categories: insertedCategories, products: insertedProducts };
}

// Run if called directly
seedDatabase().catch(console.error);