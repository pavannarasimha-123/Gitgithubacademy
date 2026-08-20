import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchTopics, fetchContent } from "../api.js";
import Blocks from "../components/Blocks.jsx";

const GROUP_ORDER = ["Foundations", "Core Git", "GitHub Workflow", "Deployment"];

export default function ContentView({ username, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [content, setContent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTopics().then(setTopics).catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    setContent(null);
    fetchContent(id).then(setContent).catch((err) => setError(err.message));
    window.scrollTo({ top: 0 });
  }, [id]);

  const grouped = {};
  topics.forEach((t) => {
    grouped[t.group] = grouped[t.group] || [];
    grouped[t.group].push(t);
  });

  return (
    <div className="shell">
      <nav className="sidebar">
        <Link to="/topics" className="brand" style={{ textDecoration: "none" }}>
          <div className="brand-mark">$_</div>
          <div className="brand-text">Git &amp; GitHub Academy<span>{username}</span></div>
        </Link>
        {GROUP_ORDER.filter((g) => grouped[g]?.length).map((group) => (
          <div className="nav-group" key={group}>
            <div className="nav-group-label">{group}</div>
            {grouped[group].map((t) => (
              <Link
                key={t.id}
                to={`/topics/${t.id}`}
                className={`nav-link${t.id === id ? " active" : ""}`}
              >
                <span className="nav-dot" />{t.title}
              </Link>
            ))}
          </div>
        ))}
        <button className="btn-ghost logout-bottom" onClick={onLogout}>Log out</button>
      </nav>

      <main className="main">
        <div className="container content-container">
          {error && <div className="auth-error">{error}</div>}
          {!content && !error && <div className="loading-state">Loading…</div>}
          {content && (
            <>
              <div className="block-kicker">Topic</div>
              <div className="content-title-row">
                {content.badge && (
                  <div className="tool-badge" style={{ background: content.badgeColor || "#161b22", color: "#fff" }}>
                    {content.badge}
                  </div>
                )}
                <h1 className="block-title" style={{ marginBottom: 0 }}>{content.title}</h1>
              </div>
              <div className="content-body">
                <Blocks blocks={content.blocks} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
