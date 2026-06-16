import React, { useState } from "react";
import { analyzeMessage } from "../utils/api";
import AnalysisResult from "../components/AnalysisResult";
import "./Home.css";

const EXAMPLE_SCAM = `Congratulations! You have been selected for the $50,000 International Excellence Scholarship! This is a limited time offer and you must respond within 24 hours. No application needed - just send your bank details and a $150 processing fee via Western Union to claim your award. Contact us immediately at scholarships4real@gmail.com. Don't miss this AMAZING opportunity!`;

const EXAMPLE_LEGIT = `Dear applicant, thank you for applying to the Rhodes Scholarship 2025 program. We have reviewed your application and would like to invite you to the regional selection interview on March 15th. Please visit our official website at rhodesscholarship.org to confirm your attendance and review the interview guidelines. Contact our admissions office at admissions@rhodeshouse.ox.ac.uk with any questions.`;

export default function Home({ onAnalysisComplete }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const charCount = message.length;
  const maxChars = 5000;

  async function handleAnalyze() {
    if (!message.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeMessage(message);
      setResult(data);
      onAnalysisComplete(message, data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleExample(text) {
    setMessage(text);
    setResult(null);
    setError(null);
  }

  function handleClear() {
    setMessage("");
    setResult(null);
    setError(null);
  }

  return (
    <div className="home-layout">
      {/* Hero */}
      <div className="hero fade-up">
        <div className="hero-badge">Powered by Gemini AI</div>
        <h1 className="hero-title">Detect Scholarship &<br />Job Offer Scams</h1>
        <p className="hero-sub">
          Paste any suspicious message and our AI will analyze it for scam patterns,
          red flags, and risk indicators — in seconds.
        </p>
        <div className="hero-stats">
          <div className="stat"><strong>3</strong><span>Risk Levels</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>AI</strong><span>Powered</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>Free</strong><span>To Use</span></div>
        </div>
      </div>

      {/* Input card */}
      <div className="input-card fade-up">
        <div className="input-card-header">
          <h2 className="input-title">Paste Message to Analyze</h2>
          <div className="example-buttons">
            <span className="examples-label">Try example:</span>
            <button className="example-btn scam" onClick={() => handleExample(EXAMPLE_SCAM)}>
              🚨 Scam
            </button>
            <button className="example-btn legit" onClick={() => handleExample(EXAMPLE_LEGIT)}>
              ✅ Legit
            </button>
          </div>
        </div>

        <div className="textarea-wrap">
          <textarea
            className="message-textarea"
            placeholder="Paste the scholarship or job offer message here…&#10;&#10;E.g.: 'Congratulations! You've been selected for a $10,000 scholarship…'"
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) setMessage(e.target.value);
            }}
            rows={8}
            aria-label="Message to analyze"
          />
          <div className={`char-count ${charCount > maxChars * 0.9 ? "warn" : ""}`}>
            {charCount}/{maxChars}
          </div>
        </div>

        {error && (
          <div className="error-banner" role="alert">
            <span aria-hidden="true">⚠️</span> {error}
          </div>
        )}

        <div className="input-actions">
          {message && (
            <button className="clear-btn" onClick={handleClear} disabled={loading}>
              Clear
            </button>
          )}
          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={!message.trim() || loading}
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Analyzing…
              </>
            ) : (
              <>
                <span aria-hidden="true">🔍</span> Analyze Message
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="loading-card" aria-live="polite" aria-busy="true">
          <div className="loading-inner">
            <div className="loading-pulse" aria-hidden="true" />
            <p>Gemini AI is analyzing your message for scam patterns…</p>
          </div>
          <div className="skeleton-rows">
            {[80, 60, 90, 45, 70].map((w, i) => (
              <div key={i} className="skeleton-row" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {result && !loading && <AnalysisResult result={result} />}

      {/* Tips strip */}
      {!result && !loading && (
        <div className="tips-strip fade-up">
          {[
            { icon: "💸", tip: "Asks for upfront fees or bank details" },
            { icon: "⏰", tip: "Creates urgency — 'act in 24 hours'" },
            { icon: "📧", tip: "Uses Gmail/Yahoo for official contact" },
            { icon: "🎁", tip: "Unsolicited prize or scholarship offer" },
          ].map(({ icon, tip }) => (
            <div className="tip-card" key={tip}>
              <span className="tip-icon" aria-hidden="true">{icon}</span>
              <span className="tip-text">{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
