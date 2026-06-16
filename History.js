import React, { useState } from "react";
import "./History.css";

function riskColor(level) {
  if (level === "High") return "var(--risk-high)";
  if (level === "Medium") return "var(--risk-mid)";
  return "var(--risk-low)";
}

function riskEmoji(level) {
  if (level === "High") return "🚨";
  if (level === "Medium") return "⚠️";
  return "✅";
}

export default function History({ history, onClear, onRemove }) {
  const [confirmClear, setConfirmClear] = useState(false);

  if (history.length === 0) {
    return (
      <div className="history-layout">
        <div className="history-header">
          <h2 className="history-title">Analysis History</h2>
        </div>
        <div className="history-empty">
          <div className="empty-icon" aria-hidden="true">📋</div>
          <p>No analyses yet.</p>
          <p className="empty-sub">Go to the Detector tab and analyze a message to see it here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-layout">
      <div className="history-header">
        <h2 className="history-title">Analysis History</h2>
        <div className="history-actions">
          <span className="history-count">{history.length} saved</span>
          {confirmClear ? (
            <>
              <button className="confirm-clear" onClick={() => { onClear(); setConfirmClear(false); }}>
                Confirm clear
              </button>
              <button className="cancel-clear" onClick={() => setConfirmClear(false)}>Cancel</button>
            </>
          ) : (
            <button className="clear-history-btn" onClick={() => setConfirmClear(true)}>
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="history-list">
        {history.map((entry) => (
          <div className="history-card fade-up" key={entry.id}>
            <div className="history-card-left">
              <span className="history-emoji" aria-hidden="true">
                {riskEmoji(entry.result.riskLevel)}
              </span>
            </div>
            <div className="history-card-body">
              <div className="history-card-top">
                <span
                  className="history-risk-badge"
                  style={{ color: riskColor(entry.result.riskLevel), borderColor: riskColor(entry.result.riskLevel) }}
                >
                  {entry.result.riskLevel} Risk
                </span>
                <span className="history-prob">{entry.result.scamProbability}% scam</span>
                <span className="history-category">{entry.result.category}</span>
              </div>
              <p className="history-message-preview">{entry.message}</p>
              {entry.result.verdict && (
                <p className="history-verdict">"{entry.result.verdict}"</p>
              )}
              <div className="history-card-footer">
                <span className="history-date">
                  {new Date(entry.analyzedAt).toLocaleString()}
                </span>
                <button
                  className="remove-entry-btn"
                  onClick={() => onRemove(entry.id)}
                  aria-label="Remove this entry"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
