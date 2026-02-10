import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import "../styles/App.css";
import React from "react";

function Dashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Logged in</p>
    </div>
  );
}

function isAuthenticated(): boolean {
  return Boolean(
    localStorage.getItem("auth_token") ||
    sessionStorage.getItem("auth_token")
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* 🏠 Home = página de inicio */}
      <Route path="/" element={<Home />} />

      {/* 🔓 Público */}
      <Route
        path="/login"
        element={
          isAuthenticated()
            ? <Navigate to="/dashboard" replace />
            : <Login />
        }
      />

      {/* 🔒 Protegidas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 🧭 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
