import express from "express";
import next from "next";
import fs from "fs/promises";
import { parse } from "url";
import { exiftool } from "exiftool-vendored";
import multer from "multer";
import os from "os";
import path from "path";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// const upload = multer({ dest: "/tmp/uploads/" });
const upload = multer({ dest: path.join(os.tmpdir(), "uploads") });
app.prepare().then(() => {
  const server = express();
  console.log("inside server.ts");

  server.post("/api/exif", upload.single("file"), async (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
    } else {
      try {
        const tags = await exiftool.read(req.file.path);
        res.json({ newMetadata: tags });
      } catch (error) {
        console.error("Error in exiftool processing:", error);
        res.status(500).json({
          error: `Failed to read metadata: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
        });
      } finally {
        // No need to call exiftool.end() here
        try {
          await fs.unlink(req.file.path);
        } catch (err) {
          console.error("Error deleting file:", err);
        }
      }
    }
  });

  server.all("*", (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const port = process.env.PORT || 3000;
  const serverInstance = server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

  const gracefulShutdown = async() => {
    await exiftool.end();
    serverInstance.close(() => {
      console.log("Server closing");
      process.exit(0);
    })
  }

  process.on("SIGTERM", gracefulShutdown)
  process.on("SIGINT", gracefulShutdown)
});
