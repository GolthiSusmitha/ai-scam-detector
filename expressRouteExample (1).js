// ============================================================
//  Express Route Example — How to plug detectScam() into
//  your existing Node.js / Express backend
// ============================================================

const express = require("express");
const multer = require("multer");
const path = require("path");
const { detectScam } = require("./geminiScamDetection");

const router = express.Router();

// ─── Multer: File Upload Config ──────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|png|jpg|jpeg|webp/;
    const valid =
      allowed.test(path.extname(file.originalname).toLowerCase()) &&
      allowed.test(file.mimetype);
    valid ? cb(null, true) : cb(new Error("Only PDF and image files allowed"));
  },
});

// ─── POST /api/scam/text ─────────────────────────────────────
router.post("/text", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "message is required" });

  const response = await detectScam("text", message);
  res.json(response);
});

// ─── POST /api/scam/url ──────────────────────────────────────
router.post("/url", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });

  const response = await detectScam("url", url);
  res.json(response);
});

// ─── POST /api/scam/file  (PDF or Image) ────────────────────
router.post("/file", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "file is required" });

  const ext = path.extname(req.file.originalname).toLowerCase();
  const type = ext === ".pdf" ? "pdf" : "image";

  const response = await detectScam(type, req.file.path);
  res.json(response);
});

module.exports = router;

// ─── In your main app.js, register like this: ───────────────
// const scamRouter = require("./expressRouteExample");
// app.use("/api/scam", scamRouter);
