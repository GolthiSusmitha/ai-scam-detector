// ============================================================
//  Gemini Scam Detection API Integration
//  Supports: Text | PDF | Image | URL
//  Model: gemini-1.5-flash (multimodal)
// ============================================================

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// ─── Init Gemini ────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ─── Scam Detection System Prompt ───────────────────────────
const SCAM_SYSTEM_PROMPT = `
You are an expert scam detection assistant. Your job is to analyze the given content 
(text message, document, image, or webpage content) and determine whether it is a scam 
or legitimate.

Analyze the following and provide a structured response:

1. VERDICT: [SCAM / LEGITIMATE / SUSPICIOUS / UNCERTAIN]
2. CONFIDENCE: [percentage, e.g. 92%]
3. SCAM TYPE (if scam): [e.g. Phishing, Lottery Scam, Job Scam, Investment Fraud, 
   Impersonation, OTP Fraud, Loan Scam, etc.]
4. RED FLAGS: List specific red flags found (if any)
5. SAFE INDICATORS: List legitimate signals (if any)
6. EXPLANATION: A clear, simple explanation for the user (2-3 sentences)
7. RECOMMENDATION: What the user should do next

Be concise, clear, and helpful. If the content is in a regional language (Telugu, Hindi, 
Tamil, etc.), detect and analyze it accordingly and respond in English.
`;

// ─── Helper: Convert file to base64 ─────────────────────────
function fileToBase64(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return fileBuffer.toString("base64");
}

// ─── Helper: Get MIME type ───────────────────────────────────
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  return mimeMap[ext] || "application/octet-stream";
}

// ─── Helper: Fetch URL content ───────────────────────────────
function fetchUrlContent(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

// ─── Helper: Strip HTML tags ─────────────────────────────────
function stripHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 8000); // Limit tokens
}

// ============================================================
//  CORE FUNCTIONS
// ============================================================

// ─── 1. Analyze Plain Text ───────────────────────────────────
async function analyzeText(userText) {
  const prompt = `${SCAM_SYSTEM_PROMPT}\n\nAnalyze this message/text for scam:\n\n"${userText}"`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ─── 2. Analyze PDF File ────────────────────────────────────
async function analyzePDF(filePath) {
  const base64Data = fileToBase64(filePath);

  const result = await model.generateContent([
    SCAM_SYSTEM_PROMPT,
    "\n\nAnalyze this PDF document for scam indicators:",
    {
      inlineData: {
        mimeType: "application/pdf",
        data: base64Data,
      },
    },
  ]);

  return result.response.text();
}

// ─── 3. Analyze Image (screenshot, photo of message) ────────
async function analyzeImage(filePath) {
  const base64Data = fileToBase64(filePath);
  const mimeType = getMimeType(filePath);

  const result = await model.generateContent([
    SCAM_SYSTEM_PROMPT,
    "\n\nAnalyze this image (could be a screenshot of a message, email, or advertisement) for scam indicators:",
    {
      inlineData: {
        mimeType: mimeType,
        data: base64Data,
      },
    },
  ]);

  return result.response.text();
}

// ─── 4. Analyze URL / Link ───────────────────────────────────
async function analyzeURL(url) {
  let urlContent = "";

  try {
    const html = await fetchUrlContent(url);
    urlContent = stripHtml(html);
  } catch (err) {
    // If fetch fails, just analyze the URL structure itself
    urlContent = "(Could not fetch page content — analyzing URL structure only)";
  }

  const prompt = `
${SCAM_SYSTEM_PROMPT}

Analyze this URL and its page content for scam indicators.

URL: ${url}

Page Content (extracted):
${urlContent}

Also check:
- Is the domain suspicious or misspelled?
- Does it use HTTP instead of HTTPS?
- Are there urgent calls to action, prize claims, or personal info requests?
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ============================================================
//  MAIN ROUTER — Call this from your chat/form handler
// ============================================================

/**
 * detectScam()
 *
 * @param {string} type     - "text" | "pdf" | "image" | "url"
 * @param {string} content  - The text/URL string, or local file path for pdf/image
 * @returns {Promise<object>} - { success, type, result, error }
 *
 * Usage Examples:
 *   detectScam("text",  "Congratulations! You won ₹10 lakh. Click here to claim.")
 *   detectScam("pdf",   "./uploads/document.pdf")
 *   detectScam("image", "./uploads/screenshot.jpg")
 *   detectScam("url",   "https://suspicious-lottery-site.com")
 */
async function detectScam(type, content) {
  try {
    let result;

    switch (type) {
      case "text":
        result = await analyzeText(content);
        break;

      case "pdf":
        result = await analyzePDF(content);
        break;

      case "image":
        result = await analyzeImage(content);
        break;

      case "url":
        result = await analyzeURL(content);
        break;

      default:
        throw new Error(`Unsupported type: "${type}". Use text | pdf | image | url`);
    }

    return {
      success: true,
      type,
      result,
    };
  } catch (error) {
    return {
      success: false,
      type,
      result: null,
      error: error.message,
    };
  }
}

// ============================================================
//  EXPORTS — Import in your Express route / controller
// ============================================================
module.exports = {
  detectScam,
  analyzeText,
  analyzePDF,
  analyzeImage,
  analyzeURL,
};

// ============================================================
//  QUICK TEST (run: node geminiScamDetection.js)
// ============================================================
if (require.main === module) {
  (async () => {
    console.log("\n🔍 Running Scam Detection Tests...\n");

    // Test 1: Text
    const textResult = await detectScam(
      "text",
      "Dear Customer, your SBI account is blocked. Click http://sbi-verify.xyz to unblock now and enter your OTP."
    );
    console.log("── TEXT TEST ──────────────────────────");
    console.log(textResult.result);

    // Test 2: URL
    const urlResult = await detectScam("url", "https://example.com");
    console.log("\n── URL TEST ───────────────────────────");
    console.log(urlResult.result);

    // Uncomment to test PDF/Image:
    // const pdfResult  = await detectScam("pdf",   "./test.pdf");
    // const imgResult  = await detectScam("image", "./test.jpg");
    // console.log(pdfResult.result);
    // console.log(imgResult.result);
  })();
}
