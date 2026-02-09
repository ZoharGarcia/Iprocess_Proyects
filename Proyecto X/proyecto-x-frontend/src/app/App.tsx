import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login.tsx";
import Home from "../components/Home.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import "../styles/App.css";

function Dashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Loggin</p>
    </div>
  );
}

function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token"));
}


function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Raíz: si hay token -> dashboard, si no -> login */}
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Público */}
      <Route path="/login" element={<Login />} />

      {/* Privado con layout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
