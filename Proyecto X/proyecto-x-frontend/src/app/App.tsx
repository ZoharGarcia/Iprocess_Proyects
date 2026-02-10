// ayudame a comentariar este código de React con TypeScript, explicando cada parte y su función en el contexto de una aplicación de autenticación y rutas protegidas.

// Importaciones necesarias para la aplicación
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "../pages/Home";
import "../styles/App.css";
import React from "react";

// Componente para la página de inicio

function Dashboard() { // Componente para la página del dashboard, que se muestra solo a usuarios autenticados
  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Logged in</p>
    </div>
  );
}

// Función para verificar si el usuario está autenticado, revisando si hay un token de autenticación en el almacenamiento local o de sesión

function isAuthenticated(): boolean {
  return Boolean(
    localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token") // Verifica si existe un token de autenticación en el almacenamiento local o de sesión
  );
}

// Componente para proteger rutas, redirigiendo a la página de inicio de sesión si el usuario no está autenticado

function ProtectedRoute({ children }: { children: React.ReactNode }) { // Componente que recibe como prop los elementos hijos (children) que se desean proteger
  if (!isAuthenticated()) { // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Componente principal de la aplicación que define las rutas y su protección
// Define las rutas de la aplicación utilizando el componente Routes de react-router-dom. Cada ruta se asocia con un componente específico y se protege según sea necesario.

export default function App() { // Componente principal de la aplicación que define las rutas y su protección
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
      <Route
        path="/register"
        element={
          isAuthenticated()
            ? <Navigate to="/login" replace />
            : <Register />
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
