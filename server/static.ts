import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { getMetaForPath, buildMetaTags } from "./meta";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Long cache for hashed assets (JS/CSS bundles have content hashes in filenames)
  app.use("/assets", express.static(path.join(distPath, "assets"), {
    maxAge: "1y",
    immutable: true,
  }));

  // Medium cache for images
  app.use("/images", express.static(path.join(distPath, "images"), {
    maxAge: "7d",
  }));

  // Short cache for everything else (favicon, etc.)
  app.use(express.static(distPath, { maxAge: "1h" }));

  // Inject server-side meta tags then fall through to index.html
  app.use("/{*path}", async (req, res) => {
    try {
      let html = await fs.promises.readFile(path.resolve(distPath, "index.html"), "utf-8");
      const meta = await getMetaForPath(req.path);
      const metaHtml = buildMetaTags(meta);
      html = html.replace("</head>", `${metaHtml}\n  </head>`);
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch {
      res.sendFile(path.resolve(distPath, "index.html"));
    }
  });
}
