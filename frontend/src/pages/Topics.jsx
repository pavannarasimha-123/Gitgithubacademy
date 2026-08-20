import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTopics } from "../api.js";

const GROUP_ORDER = ["Foundations", "Core Git", "GitHub Workflow", "Deployment"];

export default function Topics({ username, onLogout }) {
  const [topics, setTopics] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics()
      .then(setTopics)
      .catch((err) => setError(err.message));
  }, []);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = topics.filter(
      (t) => !q || t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q)
    );
    const map = {};
    filtered.forEach((t) => {
      map[t.group] = map[t.group] || [];
      map[t.group].push(t);
    });
    return map;
  }, [topics, query]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">$_</div>
          <div className="brand-text">Git &amp; GitHub Academy<span>choose what to learn</span></div>
        </div>
        <div className="topbar-right">
          <span className="user-pill">{username}</span>
          <button className="btn-ghost" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <div className="topics-hero">
        <div className="eyebrow">what do you want to learn?</div>
        <h1 className="hero-title">Pick a topic, get the full step-by-step.</h1>
        <p className="hero-sub">From your first <code className="inline">git init</code> to a live URL on Render or Railway — every topic includes commands, diagrams, and a walkthrough.</p>
        <input
          className="search-input"
          placeholder="Search topics… e.g. 'branch', 'render', 'ssh'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {error && <div className="auth-error" style={{ margin: "0 48px" }}>{error}</div>}

      <div className="topics-body">
        {GROUP_ORDER.filter((g) => grouped[g]?.length).map((group) => (
          <section key={group} className="topic-group">
            <h2 className="group-title">{group}</h2>
            <div className="topic-grid">
              {grouped[group].map((t) => (
                <button key={t.id} className="topic-card" onClick={() => navigate(`/topics/${t.id}`)}>
                  <div className="topic-icon">{t.icon}</div>
                  <div className="topic-card-title">{t.title}</div>
                  <div className="topic-card-summary">{t.summary}</div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
