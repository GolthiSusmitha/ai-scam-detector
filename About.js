import React from "react";
import "./About.css";

const SCAM_TYPES = [
  {
    icon: "💸",
    title: "Advance Fee Scams",
    desc: "You're asked to pay a 'processing fee', 'registration fee', or 'taxes' upfront to claim a scholarship or job offer. Legitimate programs never charge fees before awarding money.",
  },
  {
    icon: "📧",
    title: "Phishing Emails",
    desc: "Fake emails impersonating real universities or companies, designed to steal your personal information, login credentials, or financial data.",
  },
  {
    icon: "🏦",
    title: "Bank Detail Harvesting",
    desc: "Scammers ask for your bank account details to 'deposit' prize money. They use these details to drain your account.",
  },
  {
    icon: "🎯",
    title: "Guaranteed Scholarship Scams",
    desc: "No legitimate scholarship is 'guaranteed'. Scammers promise guaranteed awards to lure victims into paying fees.",
  },
  {
    icon: "👔",
    title: "Fake Job Offers",
    desc: "Offers for high-paying remote jobs that require no experience or qualifications, often asking for upfront training or equipment fees.",
  },
  {
    icon: "⏰",
    title: "Urgency Manipulation",
    desc: "Creating artificial time pressure ('respond in 24 hours') to prevent you from verifying the offer or consulting others.",
  },
];

const RED_FLAGS = [
  "Unsolicited contact — you never applied",
  "Grammar errors, awkward phrasing",
  "Gmail/Yahoo used as 'official' email",
  "Asks for money, bank details, or ID upfront",
  "Promises unrealistically large amounts",
  "No official website or verifiable address",
  "Pressure to respond immediately",
  "Asks you to keep the offer secret",
  "Vague about the sponsoring organization",
  "Requests Western Union or cryptocurrency payment",
];

const VERIFY_STEPS = [
  { step: "01", title: "Google the organization", desc: "Search the exact scholarship/company name. Check for scam reports or warnings." },
  { step: "02", title: "Verify the email domain", desc: "Real universities use official domains (e.g. @mit.edu), not Gmail or Yahoo." },
  { step: "03", title: "Call the official number", desc: "Find the contact number on the organization's real website — not from the email." },
  { step: "04", title: "Never pay to receive money", desc: "Legitimate scholarships and employers never require upfront payments." },
  { step: "05", title: "Consult a trusted adult", desc: "Share the offer with a counselor, teacher, or family member before responding." },
];

export default function About() {
  return (
    <div className="about-layout">
      <div className="about-hero fade-up">
        <div className="about-hero-badge">Knowledge Center</div>
        <h1 className="about-hero-title">Understanding Scholarship &<br />Job Offer Scams</h1>
        <p className="about-hero-sub">
          Every year, thousands of students lose money to scammers posing as scholarships or employers.
          Learn to spot the warning signs before it's too late.
        </p>
      </div>

      <section className="about-section fade-up">
        <h2 className="section-heading">Common Scam Types</h2>
        <div className="scam-types-grid">
          {SCAM_TYPES.map(({ icon, title, desc }) => (
            <div className="scam-type-card" key={title}>
              <div className="scam-type-icon" aria-hidden="true">{icon}</div>
              <h3 className="scam-type-title">{title}</h3>
              <p className="scam-type-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section fade-up">
        <h2 className="section-heading">Red Flags to Watch For</h2>
        <ul className="red-flags-list">
          {RED_FLAGS.map((flag) => (
            <li key={flag}>
              <span className="rf-dot" aria-hidden="true">🚩</span>
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-section fade-up">
        <h2 className="section-heading">How to Verify an Offer</h2>
        <div className="verify-steps">
          {VERIFY_STEPS.map(({ step, title, desc }) => (
            <div className="verify-step" key={step}>
              <div className="step-number" aria-hidden="true">{step}</div>
              <div>
                <h3 className="step-title">{title}</h3>
                <p className="step-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section fade-up">
        <div className="how-it-works-card">
          <h2 className="section-heading" style={{ marginBottom: 20 }}>How ScamShield Works</h2>
          <p className="how-desc">
            ScamShield uses Google Gemini AI to analyze text for patterns associated with fraudulent
            scholarship and job offers. Our AI examines writing style, requests made, contact
            information, urgency cues, and hundreds of other signals to compute a scam probability score.
          </p>
          <div className="how-steps">
            {[
              { icon: "📋", label: "Paste message" },
              { icon: "🤖", label: "AI analyzes" },
              { icon: "📊", label: "Risk scored" },
              { icon: "🛡️", label: "Stay safe" },
            ].map(({ icon, label }) => (
              <div className="how-step" key={label}>
                <div className="how-step-icon" aria-hidden="true">{icon}</div>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="how-disclaimer">
            ⚠️ ScamShield is an AI-powered tool and may not be 100% accurate. Always verify independently
            and never share sensitive personal or financial information with unverified parties.
          </p>
        </div>
      </section>
    </div>
  );
}
