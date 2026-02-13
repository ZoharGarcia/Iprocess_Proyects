import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import "../../styles/password.css";
import "../../assets/Logo_Iprocess.png";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return typeof baseUrl === "string" ? baseUrl.replace(/\/$/, "") : "";
}

export function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const error = useMemo(() => {
    if (!email.trim()) return "Ingresa tu correo";
    if (!emailRegex.test(email.trim())) return "Correo inválido";
    return "";
  }, [email]);

  const canSubmit = !loading && !error;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setUiError(null);

    try {
      const res = await fetch(`${getApiBaseUrl()}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setUiError(data.message || "No se pudo enviar el código");
        return;
      }

      navigate(`/verify-reset-code?email=${encodeURIComponent(email.trim())}`, {
        replace: true,
      });
    } catch {
      setUiError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-split auth-split--password">
        <aside className="auth-brand">
          <div className="auth-brand__logoWrap">
            <div className="auth-brand__mini">RECUPERACIÓN</div>
          </div>
          <div className="auth-brand__divider" />
          <h2 className="auth-brand__title">Proyecto X</h2>
          <p className="auth-brand__subtitle">Paso 1: ingresa tu correo.</p>
        </aside>

        <main className="auth-panel">
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="auth-header">
              <h1>Recuperar contraseña</h1>
              <p>Te enviaremos un código a tu correo.</p>
            </div>

            {uiError && (
              <div className="auth-error" role="alert">
                {uiError}
              </div>
            )}

            <label className="auth-label" htmlFor="email">
              Correo
              <input
                id="email"
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="usuario@gmail.com"
              />
              {!!error && <div className="auth-field-error">{error}</div>}
            </label>

            <button className="auth-button" type="submit" disabled={!canSubmit}>
              {loading ? "Enviando..." : "Enviar código"}
            </button>

            <div className="auth-register">
              <Link className="auth-register__link" to="/login">
                Volver a login
              </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
