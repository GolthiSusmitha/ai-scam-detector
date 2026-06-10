import React, { useState } from "react";
import RiskMeter from "./RiskMeter";
import "./AnalysisResult.css";

function Section({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="result-section">
      <button className="section-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="section-title">
          <span aria-hidden="true">{icon}</span> {title}
        </span>
        <span className={`chevron ${open ? "open" : ""}`} aria-hidden="true">›</span>
      </button>
      {open && <div className="section-body">{children}</div>}
    </div>
  );
}

export default function AnalysisResult({ result }) {
  const { scamProbability, riskLevel, verdict, redFlags, legitimateSignals,
          explanation, recommendations, category, analyzedAt } = result;

  const formattedDate = new Date(analyzedAt).toLocaleString();

  return (
    <div className="analysis-result fade-up">
      <div className="result-meta">
        <span className="category-pill">{category}</span>
        <span className="analyzed-at">Analyzed {formattedDate}</span>
      </div>

      <RiskMeter probability={scamProbability} riskLevel={riskLevel} />

      {verdict && (
        <div className="verdict-box">
          <span aria-hidden="true">💬</span>
          <p>{verdict}</p>
        </div>
      )}

      {redFlags?.length > 0 && (
        <Section title="Red Flags" icon="🚩" defaultOpen={true}>
          <ul className="flag-list red-flags">
            {redFlags.map((flag, i) => (
              <li key={i}><span aria-hidden="true">⛔</span> {flag}</li>
            ))}
          </ul>
        </Section>
      )}

      {legitimateSignals?.length > 0 && (
        <Section title="Legitimate Signals" icon="✅" defaultOpen={riskLevel !== "High"}>
          <ul className="flag-list legit-signals">
            {legitimateSignals.map((sig, i) => (
              <li key={i}><span aria-hidden="true">✔</span> {sig}</li>
            ))}
          </ul>
        </Section>
      )}

      {explanation && (
        <Section title="Detailed Analysis" icon="🔍" defaultOpen={true}>
          <div className="explanation-text">
            {explanation.split("\n").filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Section>
      )}

      {recommendations?.length > 0 && (
        <Section title="Safety Recommendations" icon="🛡️" defaultOpen={true}>
          <ol className="recommendations-list">
            {recommendations.map((rec, i) => (
              <li key={i}><span className="rec-num">{i + 1}</span> {rec}</li>
            ))}
          </ol>
        </Section>
      )}
    </div>
  );
}
