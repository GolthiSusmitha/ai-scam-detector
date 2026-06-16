import { useState, useEffect } from "react";

const STORAGE_KEY = "scamshield_history";
const MAX_HISTORY = 20;

export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {}
  }, [history]);

  const addEntry = (message, result) => {
    const entry = {
      id: Date.now(),
      message: message.slice(0, 120) + (message.length > 120 ? "…" : ""),
      result,
      analyzedAt: new Date().toISOString(),
    };
    setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY));
  };

  const clearHistory = () => setHistory([]);
  const removeEntry = (id) => setHistory((prev) => prev.filter((e) => e.id !== id));

  return { history, addEntry, clearHistory, removeEntry };
}
