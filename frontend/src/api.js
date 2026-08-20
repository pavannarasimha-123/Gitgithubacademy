const BASE = "https://gitgithubacademy.onrender.com/api";

function authHeaders() {
  const token = localStorage.getItem("gga_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(username, password) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data; // { token, username }
}

export async function register(username, password) {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");
  return data; // { token, username }
}

export async function fetchTopics() {
  const res = await fetch(`${BASE}/topics`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to load topics");
  return res.json();
}

export async function fetchContent(id) {
  const res = await fetch(`${BASE}/content/${id}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to load content");
  return res.json();
}
