import React from "react";
import "./RiskMeter.css";

export default function RiskMeter({ probability, riskLevel }) {
  const color =
    riskLevel === "High" ? "var(--risk-high)" :
    riskLevel === "Medium" ? "var(--risk-mid)" :
    "var(--risk-low)";

  const label =
    riskLevel === "High" ? "High Risk – Likely Scam" :
    riskLevel === "Medium" ? "Medium Risk – Suspicious" :
    "Low Risk – Looks Legitimate";

  const emoji =
    riskLevel === "High" ? "🚨" :
    riskLevel === "Medium" ? "⚠️" : "✅";

  return (
    <div className={`risk-meter risk-${riskLevel?.toLowerCase()}`}>
      <div className="risk-header">
        <span className="risk-emoji" aria-hidden="true">{emoji}</span>
        <div>
          <div className="risk-label">{label}</div>
          <div className="risk-score-text">Scam probability: <strong>{probability}%</strong></div>
        </div>
        <div className="risk-badge" style={{ color, borderColor: color }}>
          {riskLevel}
        </div>
      </div>

      <div className="meter-track" role="progressbar" aria-valuenow={probability} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="meter-fill"
          style={{ width: `${probability}%`, background: color }}
        />
        <div className="meter-zones">
          <span className="zone-label" style={{ left: "0%" }}>0</span>
          <span className="zone-label" style={{ left: "30%" }}>30</span>
          <span className="zone-label" style={{ left: "70%" }}>70</span>
          <span className="zone-label" style={{ left: "96%" }}>100</span>
        </div>
      </div>

      <div className="meter-legend">
        <span className="legend-item low">● Low (0–30)</span>
        <span className="legend-item mid">● Medium (31–69)</span>
        <span className="legend-item high">● High (70–100)</span>
      </div>
    </div>
  );
}
