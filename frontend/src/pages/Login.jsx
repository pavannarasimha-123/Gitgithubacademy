import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api.js";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState(mode === "login" ? "admin" : "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function switchMode(next) {
    setMode(next);
    setError("");
    setPassword("");
    setConfirm("");
    setUsername(next === "login" ? "admin" : "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (mode === "register" && password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      const data = mode === "login" ? await login(username, password) : await register(username, password);
      onLogin(data.username, data.token);
      navigate("/topics");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const isRegister = mode === "register";

  return (
    <div className="auth-screen">
      <div className="auth-glow" />
      <div className="auth-card">
        <div className="brand-mark-lg">$_</div>
        <h1 className="auth-title">Git &amp; GitHub Academy</h1>
        <p className="auth-sub">
          {isRegister
            ? "Create an account to start learning Git, GitHub, and deployment."
            : "Sign in to start learning Git, GitHub, and deployment — step by step."}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab${!isRegister ? " active" : ""}`}
            onClick={() => switchMode("login")}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`auth-tab${isRegister ? " active" : ""}`}
            onClick={() => switchMode("register")}
          >
            Create account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field-label" htmlFor="username">Username</label>
          <input
            id="username"
            className="field-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <label className="field-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="field-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isRegister ? "new-password" : "current-password"}
            minLength={isRegister ? 6 : undefined}
            required
          />

          {isRegister && (
            <>
              <label className="field-label" htmlFor="confirm">Confirm password</label>
              <input
                id="confirm"
                type="password"
                className="field-input"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                minLength={6}
                required
              />
            </>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? (isRegister ? "Creating account..." : "Signing in...") : isRegister ? "Create account" : "Sign in"}
          </button>
        </form>

        {!isRegister && (
          <div className="auth-hint">
            <span className="callout-label">Demo credentials</span>
            <code className="inline">admin</code> / <code className="inline">admin123</code>
          </div>
        )}
        {isRegister && (
          <div className="auth-hint">
            <span className="callout-label">Note</span>
            Accounts are stored in memory for this demo and reset when the backend restarts.
          </div>
        )}
      </div>
    </div>
  );
}
