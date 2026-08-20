/**
 * Git/GitHub/Deployment Academy — backend API
 * ------------------------------------------------
 * Endpoints:
 *   POST /api/login        -> { token, username }
 *   GET  /api/topics       -> [{ id, title, group, summary, icon }]
 *   GET  /api/content/:id  -> { id, title, blocks: [...] }
 *
 * This uses a single demo account and a simple signed-looking token
 * for demonstration purposes. Swap in real auth (bcrypt + JWT + a
 * database) before using this anywhere real users can reach it.
 */
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { TOPICS, CONTENT } = require("./data/content");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ---- demo user store (swap for a real DB in production) ----
// NOTE: passwords are kept in plain text here only because this is a
// demo. Use bcrypt (or similar) to hash passwords before storing them
// in any real application.
const USERS = [{ username: "admin", password: "admin123" }];
const SECRET = "demo-secret-change-me";

function makeToken(username) {
  const payload = Buffer.from(JSON.stringify({ username, iat: Date.now() })).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 24);
  return `${payload}.${sig}`;
}

function verifyToken(token) {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 24);
  if (expected !== sig) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString());
  } catch {
    return null;
  }
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: "Not authenticated" });
  req.user = decoded;
  next();
}

app.post("/api/register", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  if (username.trim().length < 3) {
    return res.status(400).json({ error: "Username must be at least 3 characters" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }
  const exists = USERS.some((u) => u.username.toLowerCase() === username.toLowerCase());
  if (exists) {
    return res.status(409).json({ error: "That username is already taken" });
  }
  USERS.push({ username, password });
  res.status(201).json({ token: makeToken(username), username });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  const user = USERS.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid username or password" });
  res.json({ token: makeToken(username), username });
});

app.get("/api/topics", requireAuth, (req, res) => {
  res.json(TOPICS);
});

app.get("/api/content/:id", requireAuth, (req, res) => {
  const entry = CONTENT[req.params.id];
  if (!entry) return res.status(404).json({ error: "Topic not found" });
  res.json(entry);
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  console.log(`Demo login -> username: admin / password: admin123`);
});
