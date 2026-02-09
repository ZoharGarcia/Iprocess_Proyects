import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginResponse = {
  token: string;
  user?: { id: number; name: string; email: string };
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

function saveToken(token: string) {
  localStorage.setItem("auth_token", token);
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length >= 6 && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) return;

    setLoading(true);
    try {
      if (!API_BASE_URL) {
        throw new Error("Falta VITE_API_BASE_URL en tu .env");
      }

      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Si Laravel devuelve errores tipo 422/401
      if (!res.ok) {
        let msg = "Credenciales inválidas.";
        try {
          const data = await res.json();
          // Ajusta esto según tu backend:
          // - Sanctum / custom: { message: "..."}
          // - Validation: { errors: { email: ["..."] } }
          if (data?.message) msg = data.message;
          if (data?.errors) {
            const firstKey = Object.keys(data.errors)[0];
            if (firstKey && data.errors[firstKey]?.[0]) msg = data.errors[firstKey][0];
          }
        } catch {
          // ignore parse error
        }
        throw new Error(msg);
      }

      const data = (await res.json()) as LoginResponse;

      if (!data?.token) {
        throw new Error("La respuesta del backend no trae token.");
      }

      saveToken(data.token);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Error desconocido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Proyecto X</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Correo
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              autoComplete="email"
            />
          </label>

          <label className="auth-label">
            Contraseña
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-button" type="submit" disabled={!canSubmit}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div className="auth-footer">
          <small>API: {API_BASE_URL ? API_BASE_URL : "No configurada"}</small>
        </div>
      </div>
    </div>
  );
}
