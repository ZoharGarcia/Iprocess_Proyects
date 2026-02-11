import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Main from "@/pages/Main";

import { Layout } from "@/app/components/Layout";

// 🔐 Verificar autenticación
function isAuthenticated(): boolean {
  return Boolean(
    localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
  );
}

// 🔒 Ruta protegida
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// 🟢 Dashboard (protegido)
function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token =
      localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");

    try {
      if (token) {
        await fetch("http://127.0.0.1:8000/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }

    localStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_token");

    navigate("/login", { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Logged in</p>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* ✅ Públicas con Header/Footer */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/main"
        element={
          <Layout>
            <Main />
          </Layout>
        }
      />

      {/* 🔓 Públicas sin Layout (normalmente login/register van “limpios”) */}
      <Route
        path="/login"
        element={
          isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      <Route
        path="/register"
        element={
          isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Register />
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
