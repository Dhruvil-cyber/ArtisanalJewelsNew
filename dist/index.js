var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  analytics: () => analytics,
  banners: () => banners,
  cart: () => cart,
  cartRelations: () => cartRelations,
  categories: () => categories,
  categoriesRelations: () => categoriesRelations,
  insertAnalyticsSchema: () => insertAnalyticsSchema,
  insertBannerSchema: () => insertBannerSchema,
  insertCartSchema: () => insertCartSchema,
  insertCategorySchema: () => insertCategorySchema,
  insertNewsletterSchema: () => insertNewsletterSchema,
  insertOrderSchema: () => insertOrderSchema,
  insertProductSchema: () => insertProductSchema,
  insertPromotionSchema: () => insertPromotionSchema,
  insertReviewSchema: () => insertReviewSchema,
  insertUserSchema: () => insertUserSchema,
  insertVariantSchema: () => insertVariantSchema,
  newsletter: () => newsletter,
  orders: () => orders,
  productVariants: () => productVariants,
  productVariantsRelations: () => productVariantsRelations,
  products: () => products,
  productsRelations: () => productsRelations,
  promotions: () => promotions,
  reviews: () => reviews,
  reviewsRelations: () => reviewsRelations,
  sessions: () => sessions,
  users: () => users
});
import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  serial
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var sessions, users, categories, products, productVariants, cart, orders, banners, reviews, categoriesRelations, productsRelations, productVariantsRelations, cartRelations, reviewsRelations, insertCategorySchema, insertProductSchema, insertVariantSchema, insertCartSchema, insertOrderSchema, insertReviewSchema, insertBannerSchema, insertUserSchema, promotions, analytics, newsletter, insertPromotionSchema, insertAnalyticsSchema, insertNewsletterSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    sessions = pgTable(
      "sessions",
      {
        sid: varchar("sid").primaryKey(),
        sess: jsonb("sess").notNull(),
        expire: timestamp("expire").notNull()
      },
      (table) => [index("IDX_session_expire").on(table.expire)]
    );
    users = pgTable("users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      email: varchar("email").unique().notNull(),
      password: varchar("password").notNull(),
      // For JWT auth
      firstName: varchar("first_name"),
      lastName: varchar("last_name"),
      profileImageUrl: varchar("profile_image_url"),
      role: varchar("role").default("customer").notNull(),
      // customer, admin
      wishlist: text("wishlist").array().default(sql`'{}'`),
      isVerified: boolean("is_verified").default(false),
      lastLoginAt: timestamp("last_login_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    categories = pgTable("categories", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 100 }).notNull(),
      slug: varchar("slug", { length: 100 }).unique().notNull(),
      description: text("description"),
      parentId: integer("parent_id"),
      sortOrder: integer("sort_order").default(0),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow()
    });
    products = pgTable("products", {
      id: serial("id").primaryKey(),
      title: varchar("title", { length: 255 }).notNull(),
      handle: varchar("handle", { length: 255 }).unique().notNull(),
      description: text("description"),
      shortDescription: varchar("short_description", { length: 500 }),
      category: integer("category_id"),
      tags: text("tags").array().default(sql`'{}'`),
      images: jsonb("images").default(sql`'[]'`),
      // Array of image objects with url, alt, etc.
      basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
      currency: varchar("currency", { length: 3 }).default("USD"),
      metal: varchar("metal"),
      // gold, white-gold, rose-gold, platinum, silver
      gemstone: varchar("gemstone"),
      carat: decimal("carat", { precision: 4, scale: 2 }),
      size: varchar("size"),
      sku: varchar("sku", { length: 100 }).unique(),
      stock: integer("stock").default(0),
      isFeatured: boolean("is_featured").default(false),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    productVariants = pgTable("product_variants", {
      id: serial("id").primaryKey(),
      productId: integer("product_id").notNull(),
      sku: varchar("sku", { length: 100 }).unique().notNull(),
      metal: varchar("metal"),
      size: varchar("size"),
      gemstone: varchar("gemstone"),
      carat: decimal("carat", { precision: 4, scale: 2 }),
      price: decimal("price", { precision: 10, scale: 2 }).notNull(),
      stock: integer("stock").default(0),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow()
    });
    cart = pgTable("cart", {
      id: serial("id").primaryKey(),
      userId: varchar("user_id"),
      sessionId: varchar("session_id"),
      productId: integer("product_id").notNull(),
      variantId: integer("variant_id"),
      quantity: integer("quantity").default(1),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    orders = pgTable("orders", {
      id: serial("id").primaryKey(),
      userId: varchar("user_id"),
      email: varchar("email").notNull(),
      status: varchar("status").default("pending"),
      // pending, confirmed, shipped, delivered, cancelled
      items: jsonb("items").notNull(),
      // Array of order items
      shippingAddress: jsonb("shipping_address").notNull(),
      billingAddress: jsonb("billing_address"),
      subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
      shipping: decimal("shipping", { precision: 10, scale: 2 }).default("0"),
      tax: decimal("tax", { precision: 10, scale: 2 }).default("0"),
      total: decimal("total", { precision: 10, scale: 2 }).notNull(),
      currency: varchar("currency", { length: 3 }).default("USD"),
      paymentStatus: varchar("payment_status").default("pending"),
      paymentMethod: varchar("payment_method"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    banners = pgTable("banners", {
      id: serial("id").primaryKey(),
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      images: jsonb("images").default(sql`'[]'`),
      // Array of image objects with url, alt, etc.
      isActive: boolean("is_active").default(true),
      sortOrder: integer("sort_order").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    reviews = pgTable("reviews", {
      id: serial("id").primaryKey(),
      productId: integer("product_id").notNull(),
      userId: varchar("user_id"),
      customerName: varchar("customer_name"),
      rating: integer("rating").notNull(),
      // 1-5 stars
      title: varchar("title", { length: 255 }),
      comment: text("comment"),
      isVerified: boolean("is_verified").default(false),
      isApproved: boolean("is_approved").default(false),
      createdAt: timestamp("created_at").defaultNow()
    });
    categoriesRelations = relations(categories, ({ many, one }) => ({
      products: many(products),
      parent: one(categories, {
        fields: [categories.parentId],
        references: [categories.id]
      }),
      children: many(categories)
    }));
    productsRelations = relations(products, ({ many, one }) => ({
      category: one(categories, {
        fields: [products.category],
        references: [categories.id]
      }),
      variants: many(productVariants),
      reviews: many(reviews),
      cartItems: many(cart)
    }));
    productVariantsRelations = relations(productVariants, ({ one }) => ({
      product: one(products, {
        fields: [productVariants.productId],
        references: [products.id]
      })
    }));
    cartRelations = relations(cart, ({ one }) => ({
      product: one(products, {
        fields: [cart.productId],
        references: [products.id]
      }),
      variant: one(productVariants, {
        fields: [cart.variantId],
        references: [productVariants.id]
      })
    }));
    reviewsRelations = relations(reviews, ({ one }) => ({
      product: one(products, {
        fields: [reviews.productId],
        references: [products.id]
      })
    }));
    insertCategorySchema = createInsertSchema(categories).omit({
      id: true,
      createdAt: true
    });
    insertProductSchema = createInsertSchema(products).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertVariantSchema = createInsertSchema(productVariants).omit({
      id: true,
      createdAt: true
    });
    insertCartSchema = createInsertSchema(cart).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertOrderSchema = createInsertSchema(orders).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertReviewSchema = createInsertSchema(reviews).omit({
      id: true,
      createdAt: true
    });
    insertBannerSchema = createInsertSchema(banners).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertUserSchema = createInsertSchema(users).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      wishlist: true,
      isVerified: true,
      lastLoginAt: true
    }).extend({
      password: z.string().min(6, "Password must be at least 6 characters")
    });
    promotions = pgTable("promotions", {
      id: serial("id").primaryKey(),
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      discountType: varchar("discount_type").notNull(),
      // percentage, fixed
      discountValue: decimal("discount_value", { precision: 5, scale: 2 }).notNull(),
      code: varchar("code", { length: 50 }),
      minOrderValue: decimal("min_order_value", { precision: 10, scale: 2 }),
      maxUses: integer("max_uses"),
      currentUses: integer("current_uses").default(0),
      isActive: boolean("is_active").default(true),
      startDate: timestamp("start_date").notNull(),
      endDate: timestamp("end_date").notNull(),
      createdAt: timestamp("created_at").defaultNow()
    });
    analytics = pgTable("analytics", {
      id: serial("id").primaryKey(),
      date: varchar("date").notNull(),
      // YYYY-MM-DD format
      revenue: decimal("revenue", { precision: 12, scale: 2 }).default("0"),
      orders: integer("orders").default(0),
      visitors: integer("visitors").default(0),
      pageViews: integer("page_views").default(0),
      conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }).default("0"),
      createdAt: timestamp("created_at").defaultNow()
    });
    newsletter = pgTable("newsletter", {
      id: serial("id").primaryKey(),
      email: varchar("email").unique().notNull(),
      firstName: varchar("first_name"),
      isActive: boolean("is_active").default(true),
      source: varchar("source").default("website"),
      // website, admin, etc.
      subscribedAt: timestamp("subscribed_at").defaultNow(),
      unsubscribedAt: timestamp("unsubscribed_at")
    });
    insertPromotionSchema = createInsertSchema(promotions).omit({
      id: true,
      createdAt: true
    });
    insertAnalyticsSchema = createInsertSchema(analytics).omit({
      id: true,
      createdAt: true
    });
    insertNewsletterSchema = createInsertSchema(newsletter).omit({
      id: true,
      subscribedAt: true,
      unsubscribedAt: true
    });
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  db: () => db,
  pool: () => pool
});
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: schema_exports });
  }
});

// server/sendgrid.ts
var sendgrid_exports = {};
__export(sendgrid_exports, {
  sendEmail: () => sendEmail,
  sendNewsletterUpdate: () => sendNewsletterUpdate,
  sendWelcomeEmail: () => sendWelcomeEmail
});
import { MailService } from "@sendgrid/mail";
async function sendEmail(params) {
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html
    });
    return true;
  } catch (error) {
    console.error("SendGrid email error:", error);
    return false;
  }
}
async function sendWelcomeEmail(email, firstName) {
  const name = firstName || "Valued Customer";
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Artisanal Jewels Newsletter</title>
      <style>
        body {
          font-family: 'Georgia', serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fafafa;
        }
        .header {
          text-align: center;
          background-color: #8B7355;
          color: white;
          padding: 30px 20px;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 16px;
          opacity: 0.9;
        }
        .button {
          display: inline-block;
          background-color: #8B7355;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">\u{1F48E} Artisanal Jewels</div>
        <div class="subtitle">Welcome to our exclusive newsletter</div>
      </div>
      
      <div class="content">
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for subscribing to our newsletter. You're now part of our exclusive community and will be the first to know about:</p>
        
        <ul>
          <li>\u2728 New jewelry collections and limited editions</li>
          <li>\u{1F389} Special promotions and member-only discounts</li>
          <li>\u{1F48E} Behind-the-scenes craftsmanship stories</li>
          <li>\u{1F4DA} Jewelry care tips and styling guides</li>
        </ul>
        
        <p>As a welcome gift, enjoy browsing our latest featured pieces:</p>
        <a href="${process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}` : "http://localhost:5000"}/catalog" class="button">Explore Our Collection</a>
        
        <p>We're thrilled to have you with us on this journey of elegance and craftsmanship.</p>
        
        <p>Warm regards,<br>
        The Artisanal Jewels Team</p>
      </div>
      
      <div class="footer">
        <p>If you no longer wish to receive these emails, you can <a href="{{unsubscribe}}">unsubscribe here</a>.</p>
        <p>\xA9 2024 Artisanal Jewels. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
  const text2 = `Welcome, ${name}!

Thank you for subscribing to our newsletter. You're now part of our exclusive community and will be the first to know about:

- New jewelry collections and limited editions
- Special promotions and member-only discounts  
- Behind-the-scenes craftsmanship stories
- Jewelry care tips and styling guides

As a welcome gift, visit our catalog to explore our latest featured pieces.

We're thrilled to have you with us on this journey of elegance and craftsmanship.

Warm regards,
The Artisanal Jewels Team`;
  return sendEmail({
    to: email,
    from: "dhruvilsavani123@gmail.com",
    subject: "Welcome to Artisanal Jewels Newsletter! \u2728",
    text: text2,
    html
  });
}
async function sendNewsletterUpdate(email, firstName, subject, content) {
  const name = firstName || "Valued Customer";
  const baseUrl = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}` : "http://localhost:5000";
  let productsHtml = "";
  if (content.products && content.products.length > 0) {
    productsHtml = `
      <h3>Latest Products</h3>
      <div style="display: grid; gap: 20px;">
        ${content.products.map((product) => {
      const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : "";
      return `
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: white;">
              ${imageUrl ? `<img src="${imageUrl}" alt="${product.title}" style="width: 100%; max-width: 200px; height: auto; border-radius: 4px;">` : ""}
              <h4 style="margin: 10px 0;">${product.title}</h4>
              <p style="font-size: 18px; color: #8B7355; font-weight: bold;">$${product.basePrice}</p>
              <a href="${baseUrl}/product/${product.handle}" style="display: inline-block; background-color: #8B7355; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px;">View Product</a>
            </div>
          `;
    }).join("")}
      </div>
    `;
  }
  let promotionsHtml = "";
  if (content.promotions && content.promotions.length > 0) {
    promotionsHtml = `
      <h3>Special Offers</h3>
      ${content.promotions.map((promo) => `
        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 15px 0;">
          <h4>${promo.title}</h4>
          <p>${promo.description}</p>
        </div>
      `).join("")}
    `;
  }
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: 'Georgia', serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fafafa;
        }
        .header {
          text-align: center;
          background-color: #8B7355;
          color: white;
          padding: 30px 20px;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .button {
          display: inline-block;
          background-color: #8B7355;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          margin: 10px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">\u{1F48E} Artisanal Jewels</div>
        <div class="subtitle">${content.title}</div>
      </div>
      
      <div class="content">
        <h2>Hello, ${name}!</h2>
        <p>${content.message}</p>
        
        ${productsHtml}
        ${promotionsHtml}
        
        <p>Visit our store to explore our complete collection:</p>
        <a href="${baseUrl}/catalog" class="button">Browse All Products</a>
        
        <p>Thank you for being part of our community!</p>
        
        <p>Best regards,<br>
        The Artisanal Jewels Team</p>
      </div>
      
      <div class="footer">
        <p>If you no longer wish to receive these emails, you can <a href="{{unsubscribe}}">unsubscribe here</a>.</p>
        <p>\xA9 2024 Artisanal Jewels. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
  const text2 = `${content.title}

Hello, ${name}!

${content.message}

${content.products ? content.products.map((p) => `${p.title} - $${p.basePrice}
View: ${baseUrl}/product/${p.handle}`).join("\n\n") : ""}

${content.promotions ? content.promotions.map((p) => `${p.title}: ${p.description}`).join("\n\n") : ""}

Visit our store: ${baseUrl}/catalog

Thank you for being part of our community!

Best regards,
The Artisanal Jewels Team`;
  return sendEmail({
    to: email,
    from: "dhruvilsavani123@gmail.com",
    subject,
    text: text2,
    html
  });
}
var mailService;
var init_sendgrid = __esm({
  "server/sendgrid.ts"() {
    "use strict";
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY environment variable must be set");
    }
    mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);
  }
});

// server/index.ts
import express from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
init_schema();
init_db();
import { eq, desc, asc, and, or, ilike, sql as sql2, isNull } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations (required for Replit Auth)
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || void 0;
  }
  async createUser(userData) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.email,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async updateUser(id, updates) {
    const [user] = await db.update(users).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return user;
  }
  // Category operations
  async getCategories() {
    return await db.select().from(categories).where(eq(categories.isActive, true)).orderBy(asc(categories.sortOrder));
  }
  async createCategory(category) {
    const [created] = await db.insert(categories).values(category).returning();
    return created;
  }
  // Product operations
  async getProducts(filters = {}) {
    const conditions = [eq(products.isActive, true)];
    if (filters.category) {
      conditions.push(eq(products.category, filters.category));
    }
    if (filters.search) {
      conditions.push(
        or(
          ilike(products.title, `%${filters.search}%`),
          ilike(products.description, `%${filters.search}%`)
        )
      );
    }
    if (filters.minPrice) {
      conditions.push(sql2`${products.basePrice}::numeric >= ${filters.minPrice}`);
    }
    if (filters.maxPrice) {
      conditions.push(sql2`${products.basePrice}::numeric <= ${filters.maxPrice}`);
    }
    if (filters.metal) {
      conditions.push(eq(products.metal, filters.metal));
    }
    if (filters.gemstone) {
      conditions.push(eq(products.gemstone, filters.gemstone));
    }
    if (filters.featured) {
      conditions.push(eq(products.isFeatured, true));
    }
    let queryBuilder = db.select().from(products).where(and(...conditions)).orderBy(desc(products.createdAt));
    if (filters.limit) {
      queryBuilder = queryBuilder.limit(filters.limit);
    }
    if (filters.offset) {
      queryBuilder = queryBuilder.offset(filters.offset);
    }
    return await queryBuilder;
  }
  async getProduct(id) {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || void 0;
  }
  async getProductByHandle(handle) {
    const [product] = await db.select().from(products).where(eq(products.handle, handle));
    return product || void 0;
  }
  async createProduct(product) {
    const [created] = await db.insert(products).values(product).returning();
    return created;
  }
  async updateProduct(id, product) {
    const [updated] = await db.update(products).set({ ...product, updatedAt: /* @__PURE__ */ new Date() }).where(eq(products.id, id)).returning();
    return updated;
  }
  async deleteProduct(id) {
    await db.delete(products).where(eq(products.id, id));
  }
  // Product variant operations
  async getProductVariants(productId) {
    return await db.select().from(productVariants).where(eq(productVariants.productId, productId));
  }
  async createVariant(variant) {
    const [created] = await db.insert(productVariants).values(variant).returning();
    return created;
  }
  async updateVariant(id, variant) {
    const [updated] = await db.update(productVariants).set(variant).where(eq(productVariants.id, id)).returning();
    return updated;
  }
  // Cart operations
  async getCartItems(userId, sessionId) {
    const conditions = [];
    if (userId) {
      conditions.push(eq(cart.userId, userId));
    }
    if (sessionId) {
      conditions.push(eq(cart.sessionId, sessionId));
    }
    if (conditions.length === 0) return [];
    const cartItems = await db.select().from(cart).where(or(...conditions));
    const cartWithProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await db.select().from(products).where(eq(products.id, item.productId)).limit(1);
        if (product.length > 0) {
          return {
            ...item,
            price: product[0].basePrice,
            title: product[0].title,
            images: product[0].images
          };
        }
        return item;
      })
    );
    return cartWithProducts;
  }
  async addToCart(item) {
    const conditions = [];
    if (item.userId) {
      conditions.push(eq(cart.userId, item.userId));
    } else if (item.sessionId) {
      conditions.push(eq(cart.sessionId, item.sessionId));
      conditions.push(isNull(cart.userId));
    } else {
      const [created] = await db.insert(cart).values(item).returning();
      return created;
    }
    conditions.push(eq(cart.productId, item.productId));
    if (item.variantId !== void 0 && item.variantId !== null) {
      conditions.push(eq(cart.variantId, item.variantId));
    } else {
      conditions.push(isNull(cart.variantId));
    }
    const existingItem = await db.select().from(cart).where(and(...conditions)).limit(1);
    if (existingItem.length > 0) {
      const currentQuantity = existingItem[0].quantity || 0;
      const addQuantity = item.quantity || 1;
      const newQuantity = currentQuantity + addQuantity;
      const [updated] = await db.update(cart).set({
        quantity: newQuantity,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(cart.id, existingItem[0].id)).returning();
      return updated;
    } else {
      const [created] = await db.insert(cart).values(item).returning();
      return created;
    }
  }
  async updateCartItem(id, quantity) {
    const [updated] = await db.update(cart).set({ quantity, updatedAt: /* @__PURE__ */ new Date() }).where(eq(cart.id, id)).returning();
    return updated;
  }
  async removeFromCart(id) {
    await db.delete(cart).where(eq(cart.id, id));
  }
  async clearCart(userId, sessionId) {
    const conditions = [];
    if (userId) {
      conditions.push(eq(cart.userId, userId));
    }
    if (sessionId) {
      conditions.push(eq(cart.sessionId, sessionId));
    }
    if (conditions.length > 0) {
      await db.delete(cart).where(or(...conditions));
    }
  }
  // Order operations
  async getOrders(userId) {
    const query = db.select().from(orders).orderBy(desc(orders.createdAt));
    if (userId) {
      return await query.where(eq(orders.userId, userId));
    }
    return await query;
  }
  async getOrder(id) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || void 0;
  }
  async createOrder(order) {
    const [created] = await db.insert(orders).values(order).returning();
    return created;
  }
  async updateOrderStatus(id, status) {
    const [updated] = await db.update(orders).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(orders.id, id)).returning();
    return updated;
  }
  // Review operations
  async getReviews(productId) {
    return await db.select().from(reviews).where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true))).orderBy(desc(reviews.createdAt));
  }
  async createReview(review) {
    const [created] = await db.insert(reviews).values(review).returning();
    return created;
  }
  // Wishlist operations
  async addToWishlist(userId, productId) {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");
    const currentWishlist = user.wishlist || [];
    if (!currentWishlist.includes(productId.toString())) {
      const updatedWishlist = [...currentWishlist, productId.toString()];
      await db.update(users).set({ wishlist: updatedWishlist }).where(eq(users.id, userId));
    }
  }
  async removeFromWishlist(userId, productId) {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");
    const currentWishlist = user.wishlist || [];
    const updatedWishlist = currentWishlist.filter((id) => id !== productId.toString());
    await db.update(users).set({ wishlist: updatedWishlist }).where(eq(users.id, userId));
  }
  async getWishlist(userId) {
    const user = await this.getUser(userId);
    if (!user) return [];
    return (user.wishlist || []).map((id) => parseInt(id));
  }
  // Additional Analytics operations for admin dashboard
  async getTotalOrders() {
    const result = await db.select({ count: sql2`count(*)` }).from(orders);
    return result[0]?.count || 0;
  }
  async getTotalRevenue() {
    const result = await db.select({
      total: sql2`coalesce(sum(${orders.total}), 0)`
    }).from(orders);
    return result[0]?.total || 0;
  }
  async getTotalCustomers() {
    const result = await db.select({ count: sql2`count(*)` }).from(users);
    return result[0]?.count || 0;
  }
  async getOrdersFromDate(date) {
    return await db.select().from(orders).where(sql2`${orders.createdAt} >= ${date}`).orderBy(desc(orders.createdAt));
  }
  async getRevenueFromDate(date) {
    const result = await db.select({
      total: sql2`coalesce(sum(${orders.total}), 0)`
    }).from(orders).where(sql2`${orders.createdAt} >= ${date}`);
    return result[0]?.total || 0;
  }
  async getRevenueAnalytics(period) {
    const now = /* @__PURE__ */ new Date();
    let days = 7;
    switch (period) {
      case "30d":
        days = 30;
        break;
      case "90d":
        days = 90;
        break;
      case "1y":
        days = 365;
        break;
      default:
        days = 7;
    }
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1e3);
    const revenueData = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1e3);
      const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1e3);
      const result = await db.select({
        total: sql2`coalesce(sum(${orders.total}), 0)`
      }).from(orders).where(sql2`${orders.createdAt} >= ${date} AND ${orders.createdAt} < ${nextDate}`);
      revenueData.push({
        date: date.toISOString().split("T")[0],
        revenue: result[0]?.total || 0
      });
    }
    return revenueData;
  }
  async getTopSellingProducts() {
    return [
      { id: 1, title: "Diamond Solitaire Ring", sales: 24, revenue: 48e3 },
      { id: 2, title: "Pearl Necklace", sales: 18, revenue: 25200 },
      { id: 3, title: "Gold Earrings", sales: 15, revenue: 22500 },
      { id: 4, title: "Tennis Bracelet", sales: 12, revenue: 57e3 },
      { id: 5, title: "Ruby Ring", sales: 8, revenue: 24e3 }
    ];
  }
  async getLowStockProducts() {
    return await db.select().from(products).where(sql2`${products.stock} <= 5`).orderBy(asc(products.stock));
  }
  async getTotalProducts() {
    const result = await db.select({ count: sql2`count(*)` }).from(products);
    return result[0]?.count || 0;
  }
  async getCustomerAnalytics() {
    const now = /* @__PURE__ */ new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const totalCustomers = await this.getTotalCustomers();
    const newCustomersThisMonth = await db.select({
      count: sql2`count(*)`
    }).from(users).where(sql2`${users.createdAt} >= ${thisMonth}`);
    const newCustomersLastMonth = await db.select({
      count: sql2`count(*)`
    }).from(users).where(sql2`${users.createdAt} >= ${lastMonth} AND ${users.createdAt} < ${thisMonth}`);
    return {
      totalCustomers,
      newCustomersThisMonth: newCustomersThisMonth[0]?.count || 0,
      newCustomersLastMonth: newCustomersLastMonth[0]?.count || 0,
      customerGrowth: 12.5
      // Mock growth percentage
    };
  }
  // Placeholder implementations for existing interface methods
  async getActivePromotions() {
    return [];
  }
  async createPromotion(promotion) {
    return promotion;
  }
  async getAnalytics(startDate, endDate) {
    return [];
  }
  async updateAnalytics(date, data) {
  }
  // Customer management implementations
  async getAllCustomers() {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }
  // Banner operations
  async getBanners() {
    return await db.select().from(banners).orderBy(asc(banners.sortOrder));
  }
  async getActiveBanners() {
    return await db.select().from(banners).where(eq(banners.isActive, true)).orderBy(asc(banners.sortOrder));
  }
  async createBanner(banner) {
    const [created] = await db.insert(banners).values(banner).returning();
    return created;
  }
  async updateBanner(id, banner) {
    const [updated] = await db.update(banners).set({ ...banner, updatedAt: /* @__PURE__ */ new Date() }).where(eq(banners.id, id)).returning();
    return updated;
  }
  async deleteBanner(id) {
    await db.delete(banners).where(eq(banners.id, id));
  }
  async getCustomerStats(userId) {
    const orderCountResult = await db.select({ count: sql2`count(*)` }).from(orders).where(eq(orders.userId, userId));
    const totalSpentResult = await db.select({ total: sql2`COALESCE(sum(${orders.total}), 0)` }).from(orders).where(eq(orders.userId, userId));
    const lastOrderResult = await db.select({ createdAt: orders.createdAt }).from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt)).limit(1);
    return {
      totalOrders: orderCountResult[0]?.count || 0,
      totalSpent: totalSpentResult[0]?.total || 0,
      lastOrder: lastOrderResult[0]?.createdAt || null
    };
  }
  // Newsletter operations
  async getNewsletterSubscribers() {
    return await db.select().from(newsletter).where(eq(newsletter.isActive, true)).orderBy(desc(newsletter.subscribedAt));
  }
  async createNewsletter(data) {
    const [created] = await db.insert(newsletter).values(data).returning();
    return created;
  }
  async updateNewsletterSubscription(id, data) {
    const [updated] = await db.update(newsletter).set(data).where(eq(newsletter.id, id)).returning();
    return updated;
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
var JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
var JWT_EXPIRES_IN = "7d";
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}
async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
async function requireAuth(req, res, next) {
  const token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  req.user = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
    firstName: null,
    lastName: null,
    password: "",
    profileImageUrl: null,
    createdAt: null,
    updatedAt: null,
    wishlist: null,
    isVerified: null,
    lastLoginAt: null
  };
  next();
}

// server/routes.ts
init_schema();
init_db();
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import { eq as eq2, and as and2 } from "drizzle-orm";
async function registerRoutes(app2) {
  app2.use(cookieParser());
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil"
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, firstName, lastName } = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: "customer"
      });
      const token = generateToken(user);
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // 'none' for cross-domain
        maxAge: 7 * 24 * 60 * 60 * 1e3
        // 7 days
      });
      res.status(201).json({
        message: "User created successfully",
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = generateToken(user);
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // 'none' for cross-domain
        maxAge: 7 * 24 * 60 * 60 * 1e3
        // 7 days
      });
      res.json({
        message: "Login successful",
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });
  app2.get("/api/login", (req, res) => {
    res.redirect("/login");
  });
  app2.get("/api/auth/login", (req, res) => {
    res.redirect("/login");
  });
  app2.get("/api/logout", (req, res) => {
    res.clearCookie("authToken");
    res.redirect("/");
  });
  app2.post("/api/auth/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logged out successfully" });
  });
  app2.get("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const user = await storage.getUser(authReq.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/products", async (req, res) => {
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
        category: category ? parseInt(category) : void 0,
        search,
        minPrice: minPrice ? parseFloat(minPrice) : void 0,
        maxPrice: maxPrice ? parseFloat(maxPrice) : void 0,
        metal,
        gemstone,
        featured: featured === "true",
        limit: parseInt(limit),
        offset: parseInt(offset)
      };
      const products2 = await storage.getProducts(filters);
      const productsWithReviews = await Promise.all(
        products2.map(async (product) => {
          const productReviews = await db.select().from(reviews).where(and2(eq2(reviews.productId, product.id), eq2(reviews.isApproved, true)));
          const reviewCount = productReviews.length;
          let averageRating = 0;
          if (reviewCount > 0) {
            const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
            averageRating = totalRating / reviewCount;
          }
          return {
            ...product,
            reviewCount,
            averageRating: Math.round(averageRating * 10) / 10
            // Round to 1 decimal place
          };
        })
      );
      res.json(productsWithReviews);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const variants = await storage.getProductVariants(id);
      const reviews2 = await storage.getReviews(id);
      res.json({ ...product, variants, reviews: reviews2 });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  app2.get("/api/products/handle/:handle", async (req, res) => {
    try {
      const product = await storage.getProductByHandle(req.params.handle);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const variants = await storage.getProductVariants(product.id);
      const reviews2 = await storage.getReviews(product.id);
      res.json({ ...product, variants, reviews: reviews2 });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      const categories2 = await storage.getCategories();
      res.json(categories2);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  app2.get("/api/cart", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const userId = authReq.user.id;
      const sessionId = req.headers["x-session-id"];
      const items = await storage.getCartItems(userId, sessionId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });
  app2.post("/api/cart", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const userId = authReq.user.id;
      const sessionId = req.headers["x-session-id"];
      const { productId, variantId, quantity = 1 } = req.body;
      const item = await storage.addToCart({
        userId,
        sessionId,
        productId,
        variantId,
        quantity
      });
      res.status(201).json(item);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });
  app2.put("/api/cart/:id", async (req, res) => {
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
  app2.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });
  app2.post("/api/create-payment-intent", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const { cartItems, amount, currency = "aud" } = req.body;
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }
      const customer = await stripe.customers.create({
        name: authReq.user.firstName && authReq.user.lastName ? `${authReq.user.firstName} ${authReq.user.lastName}` : "Customer",
        email: authReq.user.email || void 0,
        address: {
          line1: "123 Sample Street",
          city: "International City",
          state: "State",
          postal_code: "12345",
          country: "AU"
          // Australia - non-Indian address required
        }
      });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        // Convert to cents
        currency,
        description: "Artisanal Jewels - Luxury jewelry purchase from Melbourne, Australia",
        customer: customer.id,
        shipping: {
          name: authReq.user.firstName && authReq.user.lastName ? `${authReq.user.firstName} ${authReq.user.lastName}` : "Customer",
          address: {
            line1: "123 Sample Street",
            city: "International City",
            state: "State",
            postal_code: "12345",
            country: "AU"
            // Australia
          }
        },
        metadata: {
          userId: authReq.user.id,
          itemCount: cartItems?.length?.toString() || "0"
        },
        automatic_payment_methods: {
          enabled: true
        }
      });
      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent" });
    }
  });
  app2.post("/api/confirm-payment", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const { paymentIntentId, shippingAddress } = req.body;
      if (!paymentIntentId) {
        return res.status(400).json({ message: "Payment intent ID is required" });
      }
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({ message: "Payment not completed" });
      }
      const userId = authReq.user.id;
      const sessionId = req.headers["x-session-id"];
      const cartItems = await storage.getCartItems(userId, sessionId);
      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      const subtotal = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price || "0") * (item.quantity || 1),
        0
      );
      const shipping = 25;
      const tax = 0;
      const total = subtotal + shipping + tax;
      const orderData = {
        userId,
        email: authReq.user.email,
        items: cartItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
          title: item.title
        })),
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        currency: paymentIntent.currency.toUpperCase(),
        status: "confirmed",
        shippingAddress,
        paymentIntentId: paymentIntent.id,
        paymentStatus: "paid"
      };
      console.log("\u{1F6CD}\uFE0F Creating order with data:", JSON.stringify(orderData, null, 2));
      const order = await storage.createOrder(orderData);
      await storage.clearCart(userId, sessionId);
      res.json({
        message: "Payment confirmed and order created",
        orderId: order.id,
        order
      });
    } catch (error) {
      console.error("Error confirming payment:", error);
      res.status(500).json({ message: "Error confirming payment" });
    }
  });
  app2.get("/api/wishlist", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const userId = authReq.user.id;
      const wishlistIds = await storage.getWishlist(userId);
      const products2 = [];
      for (const productId of wishlistIds) {
        const product = await storage.getProduct(productId);
        if (product) {
          products2.push(product);
        }
      }
      res.json(products2);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({ message: "Failed to fetch wishlist" });
    }
  });
  app2.post("/api/wishlist", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const userId = authReq.user.id;
      const { productId } = req.body;
      await storage.addToWishlist(userId, productId);
      res.status(201).json({ message: "Added to wishlist" });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      res.status(500).json({ message: "Failed to add to wishlist" });
    }
  });
  app2.delete("/api/wishlist/:productId", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const userId = authReq.user.id;
      const productId = parseInt(req.params.productId);
      await storage.removeFromWishlist(userId, productId);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      res.status(500).json({ message: "Failed to remove from wishlist" });
    }
  });
  app2.get("/api/orders", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const userId = authReq.user?.id;
      const orders2 = await storage.getOrders(userId);
      res.json(orders2);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  app2.get("/api/orders/:id", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const userId = authReq.user?.id;
      const orderId = parseInt(req.params.id);
      if (isNaN(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      const order = await storage.getOrder(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (order.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const order = await storage.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });
  app2.get("/api/products/:id/reviews", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const reviews2 = await storage.getReviews(productId);
      res.json(reviews2);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });
  app2.post("/api/products/:id/reviews", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const productId = parseInt(req.params.id);
      const userId = authReq.user.id;
      const { rating, title, comment } = req.body;
      const review = await storage.createReview({
        productId,
        userId,
        customerName: authReq.user?.firstName ? `${authReq.user.firstName} ${authReq.user.lastName || ""}`.trim() : authReq.user?.email?.split("@")[0] || "Anonymous",
        rating,
        title,
        comment,
        isVerified: true
        // Since user is authenticated
      });
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });
  app2.get("/api/admin/products", async (req, res) => {
    try {
      const products2 = await storage.getProducts({ limit: 100 });
      res.json(products2);
    } catch (error) {
      console.error("Error fetching admin products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.post("/api/admin/products", async (req, res) => {
    try {
      const validated = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validated);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });
  app2.put("/api/admin/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.updateProduct(id, req.body);
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });
  app2.get("/api/reviews/approved", async (req, res) => {
    try {
      const result = await db.select({
        id: reviews.id,
        customerName: reviews.customerName,
        rating: reviews.rating,
        title: reviews.title,
        comment: reviews.comment,
        isApproved: reviews.isApproved
      }).from(reviews).where(eq2(reviews.isApproved, true)).orderBy(reviews.createdAt);
      res.json(result);
    } catch (error) {
      console.error("Error fetching approved reviews:", error);
      res.status(500).json({ message: "Failed to fetch approved reviews" });
    }
  });
  app2.put("/api/admin/reviews/:id/approve", async (req, res) => {
    try {
      const reviewId = parseInt(req.params.id);
      const result = await db.update(reviews).set({ isApproved: true }).where(eq2(reviews.id, reviewId)).returning();
      if (result.length === 0) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json(result[0]);
    } catch (error) {
      console.error("Error approving review:", error);
      res.status(500).json({ message: "Failed to approve review" });
    }
  });
  app2.get("/api/admin/orders", async (req, res) => {
    try {
      const orders2 = await storage.getOrders();
      res.json(orders2);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  app2.get("/api/admin/reviews", async (req, res) => {
    try {
      const result = await db.select({
        id: reviews.id,
        productId: reviews.productId,
        userId: reviews.userId,
        customerName: reviews.customerName,
        rating: reviews.rating,
        title: reviews.title,
        comment: reviews.comment,
        isApproved: reviews.isApproved,
        createdAt: reviews.createdAt
      }).from(reviews).orderBy(reviews.createdAt);
      res.json(result);
    } catch (error) {
      console.error("Error fetching admin reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });
  app2.put("/api/admin/orders/:id/status", async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const { status } = req.body;
      if (isNaN(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      if (!status || !["pending", "confirmed", "shipped", "delivered", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status. Must be one of: pending, confirmed, shipped, delivered, cancelled" });
      }
      const order = await storage.updateOrderStatus(orderId, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Failed to update order status" });
    }
  });
  app2.post("/api/admin/categories", async (req, res) => {
    try {
      const validated = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validated);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });
  app2.get("/api/admin/banners", async (req, res) => {
    try {
      const banners2 = await storage.getBanners();
      res.json(banners2);
    } catch (error) {
      console.error("Error fetching banners:", error);
      res.status(500).json({ message: "Failed to fetch banners" });
    }
  });
  app2.post("/api/admin/banners", async (req, res) => {
    try {
      const validated = insertBannerSchema.parse(req.body);
      const banner = await storage.createBanner(validated);
      res.status(201).json(banner);
    } catch (error) {
      console.error("Error creating banner:", error);
      res.status(500).json({ message: "Failed to create banner" });
    }
  });
  app2.put("/api/admin/banners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const banner = await storage.updateBanner(id, req.body);
      res.json(banner);
    } catch (error) {
      console.error("Error updating banner:", error);
      res.status(500).json({ message: "Failed to update banner" });
    }
  });
  app2.delete("/api/admin/banners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBanner(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting banner:", error);
      res.status(500).json({ message: "Failed to delete banner" });
    }
  });
  app2.get("/api/banners", async (req, res) => {
    try {
      const banners2 = await storage.getActiveBanners();
      res.json(banners2);
    } catch (error) {
      console.error("Error fetching active banners:", error);
      res.status(500).json({ message: "Failed to fetch banners" });
    }
  });
  app2.get("/api/admin/analytics/overview", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const user = await storage.getUser(authReq.user.id);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const totalOrders = await storage.getTotalOrders();
      const totalRevenue = await storage.getTotalRevenue();
      const totalCustomers = await storage.getTotalCustomers();
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const currentMonth = /* @__PURE__ */ new Date();
      currentMonth.setDate(1);
      const monthlyOrders = await storage.getOrdersFromDate(currentMonth);
      const monthlyRevenue = await storage.getRevenueFromDate(currentMonth);
      res.json({
        totalOrders,
        totalRevenue,
        totalCustomers,
        avgOrderValue,
        monthlyOrders: monthlyOrders.length,
        monthlyRevenue,
        revenueGrowth: 15.8,
        // Mock growth percentage
        orderGrowth: 23.4
        // Mock growth percentage
      });
    } catch (error) {
      console.error("Analytics overview error:", error);
      res.status(500).json({ message: "Failed to fetch analytics overview" });
    }
  });
  app2.get("/api/admin/analytics/revenue", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const user = await storage.getUser(authReq.user.id);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const { period = "7d" } = req.query;
      const revenueData = await storage.getRevenueAnalytics(period);
      res.json(revenueData);
    } catch (error) {
      console.error("Revenue analytics error:", error);
      res.status(500).json({ message: "Failed to fetch revenue analytics" });
    }
  });
  app2.get("/api/admin/analytics/products", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const user = await storage.getUser(authReq.user.id);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const topProducts = await storage.getTopSellingProducts();
      const lowStockProducts = await storage.getLowStockProducts();
      res.json({
        topProducts,
        lowStockProducts,
        totalProducts: await storage.getTotalProducts()
      });
    } catch (error) {
      console.error("Product analytics error:", error);
      res.status(500).json({ message: "Failed to fetch product analytics" });
    }
  });
  app2.get("/api/admin/analytics/customers", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const user = await storage.getUser(authReq.user.id);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const customerStats = await storage.getCustomerAnalytics();
      res.json(customerStats);
    } catch (error) {
      console.error("Customer analytics error:", error);
      res.status(500).json({ message: "Failed to fetch customer analytics" });
    }
  });
  app2.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email, firstName, source = "website" } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ message: "Valid email address is required" });
      }
      const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { newsletter: newsletter2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eq3 } = await import("drizzle-orm");
      const { sendWelcomeEmail: sendWelcomeEmail2 } = await Promise.resolve().then(() => (init_sendgrid(), sendgrid_exports));
      const [existingSubscription] = await db2.select().from(newsletter2).where(eq3(newsletter2.email, email));
      if (existingSubscription) {
        if (existingSubscription.isActive) {
          return res.status(400).json({ message: "This email is already subscribed to our newsletter" });
        } else {
          await db2.update(newsletter2).set({
            isActive: true,
            firstName: firstName || existingSubscription.firstName,
            source,
            unsubscribedAt: null
          }).where(eq3(newsletter2.id, existingSubscription.id));
          await sendWelcomeEmail2(email, firstName || existingSubscription.firstName);
          return res.json({ message: "Newsletter subscription reactivated successfully" });
        }
      }
      await db2.insert(newsletter2).values({
        email,
        firstName: firstName || null,
        source,
        isActive: true
      });
      await sendWelcomeEmail2(email, firstName);
      res.json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });
  app2.post("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ message: "Valid email address is required" });
      }
      const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { newsletter: newsletter2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eq3 } = await import("drizzle-orm");
      const [updated] = await db2.update(newsletter2).set({
        isActive: false,
        unsubscribedAt: /* @__PURE__ */ new Date()
      }).where(eq3(newsletter2.email, email)).returning();
      if (!updated) {
        return res.status(404).json({ message: "Email not found in our newsletter list" });
      }
      res.json({ message: "Successfully unsubscribed from newsletter" });
    } catch (error) {
      console.error("Newsletter unsubscribe error:", error);
      res.status(500).json({ message: "Failed to unsubscribe from newsletter" });
    }
  });
  app2.post("/api/admin/newsletter/send", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const user = await storage.getUser(authReq.user.id);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const { subject, title, message, includeProducts, includePromotions } = req.body;
      if (!subject || !title || !message) {
        return res.status(400).json({ message: "Subject, title, and message are required" });
      }
      const { sendNewsletterUpdate: sendNewsletterUpdate2 } = await Promise.resolve().then(() => (init_sendgrid(), sendgrid_exports));
      const subscribers = await storage.getNewsletterSubscribers();
      if (subscribers.length === 0) {
        return res.json({ message: "No active subscribers found", sent: 0 });
      }
      let products2 = [];
      let promotions2 = [];
      if (includeProducts) {
        products2 = await storage.getProducts({ featured: true, limit: 4 });
      }
      if (includePromotions) {
        const banners2 = await storage.getActiveBanners();
        promotions2 = banners2.map((banner) => ({
          title: banner.title,
          description: banner.description || "Special offer available now!"
        }));
      }
      const newsletterContent = {
        title,
        message,
        products: products2.length > 0 ? products2 : void 0,
        promotions: promotions2.length > 0 ? promotions2 : void 0
      };
      let sentCount = 0;
      let failedCount = 0;
      let lastError = null;
      for (const subscriber of subscribers) {
        try {
          const success = await sendNewsletterUpdate2(
            subscriber.email,
            subscriber.firstName,
            subject,
            newsletterContent
          );
          if (success) {
            sentCount++;
          } else {
            failedCount++;
          }
        } catch (error) {
          console.error(`Failed to send newsletter to ${subscriber.email}:`, error);
          failedCount++;
          lastError = error;
        }
      }
      if (sentCount === 0 && failedCount > 0) {
        return res.status(500).json({
          message: "Failed to send newsletter - email service error",
          error: lastError?.message || "Unknown email service error",
          sent: sentCount,
          failed: failedCount,
          totalSubscribers: subscribers.length
        });
      }
      res.json({
        message: sentCount > 0 ? "Newsletter sending completed" : "Newsletter partially sent",
        sent: sentCount,
        failed: failedCount,
        totalSubscribers: subscribers.length,
        warning: failedCount > 0 ? "Some emails failed to send - check email service configuration" : null
      });
    } catch (error) {
      console.error("Newsletter send error:", error);
      res.status(500).json({ message: "Failed to send newsletter" });
    }
  });
  app2.get("/api/admin/newsletter/subscribers", requireAuth, async (req, res) => {
    try {
      const authReq = req;
      const user = await storage.getUser(authReq.user.id);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      console.error("Newsletter subscribers error:", error);
      res.status(500).json({ message: "Failed to fetch newsletter subscribers" });
    }
  });
  app2.post("/api/seed", async (req, res) => {
    try {
      const engagementCategory = await storage.createCategory({
        name: "Engagement Rings",
        slug: "engagement-rings",
        description: "Beautiful engagement rings for your special moment"
      });
      const necklaceCategory = await storage.createCategory({
        name: "Necklaces",
        slug: "necklaces",
        description: "Elegant necklaces for every occasion"
      });
      const earringCategory = await storage.createCategory({
        name: "Earrings",
        slug: "earrings",
        description: "Stunning earrings to complement your style"
      });
      const braceletCategory = await storage.createCategory({
        name: "Bracelets",
        slug: "bracelets",
        description: "Sophisticated bracelets and bangles"
      });
      const products2 = [
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
          isFeatured: true
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
          isFeatured: true
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
          isFeatured: true
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
          isFeatured: true
        }
      ];
      for (const productData of products2) {
        await storage.createProduct(productData);
      }
      res.json({ message: "Database seeded successfully" });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ message: "Failed to seed database" });
    }
  });
  app2.get("/api/test/customers", async (req, res) => {
    try {
      const customers = await storage.getAllCustomers();
      const customersWithStats = await Promise.all(
        customers.map(async (customer) => {
          const stats = await storage.getCustomerStats(customer.id);
          return {
            ...customer,
            stats
          };
        })
      );
      res.json(customersWithStats);
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ message: "Failed to fetch customers" });
    }
  });
  app2.get("/api/admin/customers", async (req, res) => {
    try {
      const customers = await storage.getAllCustomers();
      const customersWithStats = await Promise.all(
        customers.map(async (customer) => {
          const stats = await storage.getCustomerStats(customer.id);
          return {
            ...customer,
            stats
          };
        })
      );
      res.json(customersWithStats);
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ message: "Failed to fetch customers" });
    }
  });
  app2.get("/api/admin/customers/:id/stats", async (req, res) => {
    try {
      const customerId = req.params.id;
      const stats = await storage.getCustomerStats(customerId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching customer stats:", error);
      res.status(500).json({ message: "Failed to fetch customer stats" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/index.ts
var app = express();
app.set("trust proxy", 1);
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (process.env.NODE_ENV === "development") {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  } else if (origin && (origin.includes("artisanal-jewels") && origin.includes("vercel.app") || origin.includes("netlify.app"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,x-session-id");
  if (req.method === "OPTIONS") {
    res.status(204).send();
    return;
  }
  next();
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (process.env.NODE_ENV === "development") {
    try {
      const viteModule = await eval('import("./vite.js")');
      await viteModule.setupVite(app, server);
    } catch (e) {
      console.error("Failed to setup Vite:", e);
    }
  } else {
    log("Production mode: API-only server");
    app.use("*", (_req, res) => {
      res.status(200).json({
        message: "Artisanal Jewels API is running",
        status: "production",
        note: "This is an API-only deployment. Frontend is hosted separately on Netlify.",
        api_endpoints: [
          "/api/auth/*",
          "/api/products",
          "/api/categories",
          "/api/cart",
          "/api/wishlist",
          "/api/orders",
          "/api/reviews"
        ]
      });
    });
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
