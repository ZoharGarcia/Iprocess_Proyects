import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import "../../styles/password.css";

type FormState = {
  email: string;
  code: string;
  password: string;
  passwordConfirm: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return typeof baseUrl === "string" ? baseUrl.replace(/\/$/, "") : "";
}

export function Password() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    email: "",
    code: "",
    password: "",
    passwordConfirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.email.trim()) e.email = "Ingresa tu correo";
    else if (!emailRegex.test(form.email.trim())) e.email = "Correo inválido";

    if (!form.code.trim()) e.code = "Ingresa el código";
    else if (form.code.trim().length < 4) e.code = "Código inválido";

    if (!form.password) e.password = "Ingresa una nueva contraseña";
    else if (form.password.length < 6) e.password = "Mínimo 6 caracteres";

    if (!form.passwordConfirm) e.passwordConfirm = "Confirma contraseña";
    else if (form.passwordConfirm !== form.password)
      e.passwordConfirm = "No coinciden";

    return e;
  }, [form]);

  const canSubmit = !loading && Object.keys(errors).length === 0;

  function setField<K extends keyof FormState>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setUiError(null);

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          code: form.code.trim(),
          password: form.password,
          password_confirmation: form.passwordConfirm,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data.message ||
          data.errors?.email?.[0] ||
          data.errors?.code?.[0] ||
          data.errors?.password?.[0] ||
          "No se pudo restablecer la contraseña";
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
          <p className="auth-brand__subtitle">
            Ingresa el código y define una nueva contraseña.
          </p>
        </aside>

        <main className="auth-panel">
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="auth-header">
              <h1>Restablecer contraseña</h1>
              <p>Completa los campos para recuperar tu cuenta.</p>
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
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                autoComplete="email"
                placeholder="user@gmail.com"
              />
              {errors.email && (
                <div className="auth-field-error">{errors.email}</div>
              )}
            </label>

            <label className="auth-label" htmlFor="code">
              Código
              <input
                id="code"
                className="auth-input"
                type="text"
                value={form.code}
                onChange={(e) => setField("code", e.target.value)}
                placeholder="######"
              />
              {errors.code && (
                <div className="auth-field-error">{errors.code}</div>
              )}
            </label>

            <label className="auth-label" htmlFor="password">
              Nueva contraseña
              <input
                id="password"
                className="auth-input"
                type="password"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres"
              />
              {errors.password && (
                <div className="auth-field-error">{errors.password}</div>
              )}
            </label>

            <label className="auth-label" htmlFor="passwordConfirm">
              Confirmar contraseña
              <input
                id="passwordConfirm"
                className="auth-input"
                type="password"
                value={form.passwordConfirm}
                onChange={(e) => setField("passwordConfirm", e.target.value)}
                autoComplete="new-password"
                placeholder="Repite tu contraseña"
              />
              {errors.passwordConfirm && (
                <div className="auth-field-error">{errors.passwordConfirm}</div>
              )}
            </label>

            <button className="auth-button" type="submit" disabled={!canSubmit}>
              {loading ? "Procesando..." : "Cambiar contraseña"}
            </button>

            <div className="auth-register">
              <span>¿Recordaste tu contraseña?</span>{" "}
              <Link className="auth-register__link" to="/login">
                Iniciar Sesión
              </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
