import React from "react";
import "./Navbar.css";

export default function Navbar({ activePage, onNavigate }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => onNavigate("home")}>
          <span className="brand-icon" aria-hidden="true">🛡️</span>
          <span className="brand-name">ScamShield</span>
          <span className="brand-tag">AI</span>
        </button>

        <nav className="navbar-nav" role="navigation" aria-label="Main navigation">
          <button
            className={`nav-link ${activePage === "home" ? "active" : ""}`}
            onClick={() => onNavigate("home")}
          >
            Detector
          </button>
          <button
            className={`nav-link ${activePage === "history" ? "active" : ""}`}
            onClick={() => onNavigate("history")}
          >
            History
          </button>
          <button
            className={`nav-link ${activePage === "about" ? "active" : ""}`}
            onClick={() => onNavigate("about")}
          >
            About
          </button>
        </nav>
      </div>
    </header>
  );
}
