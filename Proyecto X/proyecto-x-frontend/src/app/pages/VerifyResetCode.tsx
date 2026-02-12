import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import "../../styles/password.css";

function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return typeof baseUrl === "string" ? baseUrl.replace(/\/$/, "") : "";
}

export function VerifyResetCode() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const email = params.get("email") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const error = useMemo(() => {
    if (!email.trim()) return "Falta el correo. Vuelve al paso anterior.";
    if (!code.trim()) return "Ingresa el código";
    if (code.trim().length < 4) return "Código inválido";
    return "";
  }, [email, code]);

  const canSubmit = !loading && !error;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setUiError(null);

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/verify-reset-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setUiError(data.message || "Código incorrecto");
        return;
      }

      navigate(
        `/change-password?email=${encodeURIComponent(email.trim())}&code=${encodeURIComponent(
          code.trim()
        )}`,
        { replace: true }
      );
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
          <p className="auth-brand__subtitle">Paso 2: verifica el código.</p>
        </aside>

        <main className="auth-panel">
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="auth-header">
              <h1>Verificar código</h1>
              <p>Ingresa el código enviado a tu correo.</p>
            </div>

            {uiError && (
              <div className="auth-error" role="alert">
                {uiError}
              </div>
            )}

            <label className="auth-label" htmlFor="code">
              Código
              <input
                id="code"
                className="auth-input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                inputMode="numeric"
              />
              {!!error && <div className="auth-field-error">{error}</div>}
            </label>

            <button className="auth-button" type="submit" disabled={!canSubmit}>
              {loading ? "Verificando..." : "Continuar"}
            </button>

            <div className="auth-register">
              <Link className="auth-register__link" to="/forgot-password">
                Cambiar correo
              </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
