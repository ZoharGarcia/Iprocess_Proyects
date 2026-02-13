import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import "../../styles/password.css";
import "../../assets/Logo_Iprocess.png";

function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return typeof baseUrl === "string" ? baseUrl.replace(/\/$/, "") : "";
}

export function ChangePassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const email = params.get("email") || "";
  const code = params.get("code") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const error = useMemo(() => {
    if (!email.trim() || !code.trim())
      return "Faltan datos. Vuelve a verificar el código.";

    if (!password) return "Ingresa una nueva contraseña";
    if (password.length < 6) return "Mínimo 6 caracteres";

    if (!passwordConfirm) return "Confirma contraseña";
    if (passwordConfirm !== password) return "No coinciden";

    return "";
  }, [email, code, password, passwordConfirm]);

  const canSubmit = !loading && !error;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setUiError(null);

    try {
      const res = await fetch(`${getApiBaseUrl()}/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          code: code.trim(),
          password,
          password_confirmation: passwordConfirm,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data.message ||
          data.errors?.email?.[0] ||
          data.errors?.code?.[0] ||
          data.errors?.password?.[0] ||
          "No se pudo cambiar la contraseña";
        setUiError(msg);
        return;
      }

      navigate("/login", { replace: true });
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
          <p className="auth-brand__subtitle">Paso 3: nueva contraseña.</p>
        </aside>

        <main className="auth-panel">
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="auth-header">
              <h1>Nueva contraseña</h1>
              <p>Define tu nueva contraseña.</p>
            </div>

            {uiError && (
              <div className="auth-error" role="alert">
                {uiError}
              </div>
            )}

            {!!error && !uiError && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <label className="auth-label" htmlFor="password">
              Nueva contraseña
              <input
                id="password"
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres"
              />
            </label>

            <label className="auth-label" htmlFor="passwordConfirm">
              Confirmar contraseña
              <input
                id="passwordConfirm"
                className="auth-input"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                autoComplete="new-password"
                placeholder="Repite tu contraseña"
              />
            </label>

            <button className="auth-button" type="submit" disabled={!canSubmit}>
              {loading ? "Guardando..." : "Cambiar contraseña"}
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
