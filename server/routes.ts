import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // IP-based country detection endpoint
  app.get("/api/country", (req: Request, res) => {
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "";
    res.json({ ip, country: null }); // Render provides real IP via x-forwarded-for
    // We return the IP and let the client resolve — or use a server-side lookup
  });

  // IP geolocation proxy (avoids CORS issues)
  app.get("/api/geoip", async (req: Request, res) => {
    try {
      const ip =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        "";
      const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`);
      const data = await response.json();
      res.json({ countryCode: data.countryCode || null });
    } catch {
      res.json({ countryCode: null });
    }
  });

  app.get("/api/creators", async (_req, res) => {
    try {
      const creators = await storage.getAllCreators();
      res.json(creators);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creators" });
    }
  });

  app.get("/api/creators/featured", async (_req, res) => {
    try {
      const creators = await storage.getFeaturedCreators();
      res.json(creators);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured creators" });
    }
  });

  app.get("/api/creators/:slug", async (req, res) => {
    try {
      const creator = await storage.getCreatorBySlug(req.params.slug);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      res.json(creator);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creator" });
    }
  });

  app.get("/api/creators/:slug/tiers", async (req, res) => {
    try {
      const creator = await storage.getCreatorBySlug(req.params.slug);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      const tiersList = await storage.getTiersByCreatorId(creator.id);
      res.json(tiersList);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tiers" });
    }
  });

  app.get("/api/creators/:slug/posts", async (req, res) => {
    try {
      const creator = await storage.getCreatorBySlug(req.params.slug);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      const postsList = await storage.getPostsByCreatorId(creator.id);
      res.json(postsList);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/creators/:slug/products", async (req, res) => {
    try {
      const creator = await storage.getCreatorBySlug(req.params.slug);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      const productsList = await storage.getProductsByCreatorId(creator.id);
      res.json(productsList);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Sitemap — dynamically includes all creator pages
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const BASE_URL = "https://swordpay.com";
      const today = new Date().toISOString().split("T")[0];

      const staticPages = [
        { loc: "/", priority: "1.0", changefreq: "daily" },
        { loc: "/explore", priority: "0.9", changefreq: "daily" },
        { loc: "/how-it-works", priority: "0.7", changefreq: "monthly" },
        { loc: "/onlyfans-alternative", priority: "0.9", changefreq: "weekly" },
      ];

      const creators = await storage.getAllCreators();
      const creatorPages = creators.map((c: { slug: string }) => ({
        loc: `/creator/${c.slug}`,
        priority: "0.8",
        changefreq: "weekly",
      }));

      const allPages = [...staticPages, ...creatorPages];

      const urlEntries = allPages
        .map(
          (p) => `  <url>
    <loc>${BASE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
        )
        .join("\n");

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (error) {
      res.status(500).send("Failed to generate sitemap");
    }
  });

  // Robots.txt
  app.get("/robots.txt", (_req, res) => {
    res.header("Content-Type", "text/plain");
    res.send(`User-agent: *
Allow: /

Sitemap: https://swordpay.com/sitemap.xml`);
  });

  return httpServer;
}
