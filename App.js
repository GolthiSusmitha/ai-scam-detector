import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";
import About from "./pages/About";
import { useHistory } from "./hooks/useHistory";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const { history, addEntry, clearHistory, removeEntry } = useHistory();

  function handleAnalysisComplete(message, result) {
    addEntry(message, result);
  }

  return (
    <div className="app">
      <Navbar activePage={page} onNavigate={setPage} />

      <main className="app-main">
        {page === "home" && (
          <Home onAnalysisComplete={handleAnalysisComplete} />
        )}
        {page === "history" && (
          <History
            history={history}
            onClear={clearHistory}
            onRemove={removeEntry}
          />
        )}
        {page === "about" && <About />}
      </main>

      <footer className="app-footer">
        <p>ScamShield AI — Powered by Google Gemini</p>
        <p className="footer-sub">For educational purposes. Always verify offers independently.</p>
      </footer>
    </div>
  );
}
