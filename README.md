# 🛡️ ScamShield – AI Scholarship & Job Scam Detector

An AI-powered web application that helps students detect fake scholarship and job offers using Google Gemini AI.

![Risk Levels: Low ✅ | Medium ⚠️ | High 🚨](https://img.shields.io/badge/Risk%20Levels-Low%20%7C%20Medium%20%7C%20High-blue)

---

## ✨ Features

- **AI-Powered Analysis** — Gemini 1.5 Flash analyzes text for scam patterns
- **Scam Probability Score** — 0–100% likelihood score with visual meter
- **Risk Levels** — Low / Medium / High with clear visual indicators
- **Red Flag Detection** — Specific suspicious elements highlighted
- **Safety Recommendations** — Actionable steps to protect yourself
- **Analysis History** — Last 20 analyses saved in localStorage
- **About Page** — Educational content on common scam types
- **Mobile-Friendly** — Fully responsive design
- **Rate Limited** — 30 requests per 15 minutes per IP

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- A Google Gemini API key ([Get one free](https://aistudio.google.com/app/apikey))

### 1. Clone & Install

```bash
git clone https://github.com/your-username/scam-detector.git
cd scam-detector
npm run install:all
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Run Development Servers

**Terminal 1 – Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 – Frontend:**
```bash
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Structure

```
scam-detector/
├── backend/
│   ├── src/
│   │   └── index.js          # Express server + Gemini integration
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js/.css
│       │   ├── RiskMeter.js/.css
│       │   └── AnalysisResult.js/.css
│       ├── pages/
│       │   ├── Home.js/.css
│       │   ├── History.js/.css
│       │   └── About.js/.css
│       ├── hooks/
│       │   └── useHistory.js
│       ├── utils/
│       │   └── api.js
│       ├── App.js/.css
│       └── index.js/.css
└── README.md
```

---

## 🌐 API Endpoints

### `POST /api/analyze`
Analyze a message for scam indicators.

**Request:**
```json
{ "message": "Your scholarship message here..." }
```

**Response:**
```json
{
  "scamProbability": 85,
  "riskLevel": "High",
  "verdict": "This message exhibits multiple hallmarks of a scholarship scam.",
  "redFlags": ["Requests upfront fee", "Uses Gmail for official contact"],
  "legitimateSignals": [],
  "explanation": "Detailed AI analysis...",
  "recommendations": ["Do not send money", "Report to authorities"],
  "category": "Scholarship Scam",
  "analyzedAt": "2025-01-01T00:00:00.000Z"
}
```

### `GET /api/health`
Check server status and Gemini configuration.

---

## 🚢 Deployment

### Backend (Railway / Render / Fly.io)
Set environment variables: `GEMINI_API_KEY`, `FRONTEND_URL`, `NODE_ENV=production`

### Frontend (Vercel / Netlify)
```bash
cd frontend && npm run build
```
Set `REACT_APP_API_URL=https://your-backend-url.com` in the platform's env settings.

---

## 🔑 Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key and add it to `backend/.env`

The free tier includes generous usage limits suitable for personal or small-scale use.

---

## ⚠️ Disclaimer

ScamShield is an AI-powered tool for educational purposes. It may not detect all scams and can occasionally produce false positives. Always verify suspicious offers independently and consult trusted adults before sharing personal information.

---

## 📄 License

MIT
