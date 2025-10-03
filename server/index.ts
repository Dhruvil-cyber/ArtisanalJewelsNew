import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";

const app = express();

// ---- STRICT CORS (works for prod + dev) ----
const ALLOWED_ORIGINS = new Set<string>([
  // Your production domains
  "https://www.artisanaljewels.com",
  "https://artisanaljewels.com",
  "https://www.artisanaljewels.shop",
  "https://artisanaljewels.shop",
  // Preview / fallback domains (add your actual preview domains)
  "https://artisanal-jewels1.vercel.app",
  "https://artisanal-jewels.vercel.app",
]);

const isDev = (process.env.NODE_ENV || "development") !== "production";

// Trust proxy for secure cookies behind Render's proxy
app.set("trust proxy", 1);

// Simple logging function
function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// CORS middleware - MUST be before all other middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  // Always vary on Origin so caches don't mix responses
  res.setHeader("Vary", "Origin");

  if (isDev) {
    // In dev be permissive (but still return credentials correctly)
    if (origin) res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    if (origin && ALLOWED_ORIGINS.has(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
  }

  // If you use cookies/session, you need credentials = true
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Include ALL headers your frontend might send
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-session-id"
  );

  // Allowed methods
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  // Respond to preflight right here - use 200 (some CDNs/proxies strip headers from 204)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
});

// Increase body parser limits to handle multiple image uploads (base64 encoded)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
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
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv === "development") {
    // Only import vite in development - using dynamic import to avoid bundling in production
    try {
      const viteModule = await eval('import("./vite.js")');
      await viteModule.setupVite(app, server);
    } catch (e) {
      console.error("Failed to setup Vite:", e);
    }
  } else {
    // Production: API-only server - no frontend serving to avoid any vite dependencies
    log("Production mode: API-only server");
    
    // Simple catch-all for any non-API routes
    app.use("*", (_req, res) => {
      res.status(200).json({ 
        message: "Artisanal Jewels API is running", 
        status: "production",
        note: "This is an API-only deployment. Frontend is hosted separately on Netlify.",
        api_endpoints: [
          "/api/auth/*", "/api/products", "/api/categories", 
          "/api/cart", "/api/wishlist", "/api/orders", "/api/reviews"
        ]
      });
    });
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
