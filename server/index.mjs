import express from "express";
import multer from "multer";
import cors from "cors";
import { ExifTool } from "exiftool-vendored";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

// ES modules fixes for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Initialize ExifTool
const exiftool = new ExifTool();

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Express server is running!" });
});

// Handle file uploads and EXIF extraction
app.post("/api/exif", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    console.log("Reading EXIF data from:", req.file.path);
    const metadata = await exiftool.read(req.file.path);
    console.log(metadata);
    res.json(metadata);
  } catch (error) {
    console.error("Error reading EXIF:", error);
    res.status(500).json({ error: "Failed to read EXIF data" });
  }
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
