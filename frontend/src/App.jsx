import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Topics from "./pages/Topics.jsx";
import ContentView from "./pages/ContentView.jsx";

export default function App() {
  const [username, setUsername] = useState(() => localStorage.getItem("gga_username") || "");

  useEffect(() => {
    const token = localStorage.getItem("gga_token");
    if (!token) setUsername("");
  }, []);

  function handleLogin(user, token) {
    localStorage.setItem("gga_token", token);
    localStorage.setItem("gga_username", user);
    setUsername(user);
  }

  function handleLogout() {
    localStorage.removeItem("gga_token");
    localStorage.removeItem("gga_username");
    setUsername("");
  }

  const isAuthed = Boolean(username && localStorage.getItem("gga_token"));

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthed ? <Navigate to="/topics" replace /> : <Login onLogin={handleLogin} />}
      />
      <Route
        path="/topics"
        element={isAuthed ? <Topics username={username} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/topics/:id"
        element={isAuthed ? <ContentView username={username} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to={isAuthed ? "/topics" : "/login"} replace />} />
    </Routes>
  );
}
