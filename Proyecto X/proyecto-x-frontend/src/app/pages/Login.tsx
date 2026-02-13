import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import "../../styles/login.css";
import "../../assets/Logo_Iprocess.png";

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

type Touched = {
  email: boolean;
  password: boolean;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return typeof baseUrl === "string" ? baseUrl.replace(/\/$/, "") : "";
}

export function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    remember: true,
  });

  const [touched, setTouched] = useState<Touched>({
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.email.trim()) e.email = "Ingresa tu correo";
    else if (!emailRegex.test(form.email)) e.email = "Correo inválido";

    if (!form.password) e.password = "Ingresa tu contraseña";

    return e;
  }, [form.email, form.password]);

  const canSubmit = !loading && Object.keys(errors).length === 0;

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setUiError(null);

    try {
      const res = await fetch(`${getApiBaseUrl()}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data.message ||
          data.errors?.email?.[0] ||
          data.errors?.password?.[0] ||
          "No se pudo iniciar sesión";
        setUiError(msg);
        return;
      }

      // Guarda token si existe (tolerante a distintos nombres)
      const token = data.token || data.access_token || data.auth_token;
      if (token) {
        const storage = form.remember ? localStorage : sessionStorage;
        storage.setItem("auth_token", token);
      }

      navigate("/dashboard", { replace: true });
    } catch {
      setUiError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-split">
        <aside className="auth-brand">
          <div className="auth-brand__logoWrap">
            <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "0.06em" }}>
              IPROCESS
            </div>
          </div>

          <div className="auth-brand__divider" />
          <h2 className="auth-brand__title">Proyecto X</h2>
          <p className="auth-brand__subtitle">Accede a tu plataforma</p>
        </aside>

        <main className="auth-panel">
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="auth-header">
              <h1>Iniciar Sesión</h1>
              <p>Ingresa tus credenciales para continuar.</p>
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
                onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
              />
              {touched.email && errors.email && (
                <div className="auth-field-error">{errors.email}</div>
              )}
            </label>

            <label className="auth-label" htmlFor="password">
              Contraseña
              <input
                id="password"
                className="auth-input"
                type="password"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, password: true }))}
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
              />
              {touched.password && errors.password && (
                <div className="auth-field-error">{errors.password}</div>
              )}
            </label>

            <label className="auth-remember">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setField("remember", e.target.checked)}
              />
              <span>Recordarme</span>
            </label>

            <button className="auth-button" type="submit" disabled={!canSubmit}>
              {loading ? "Ingresando..." : "Entrar"}
            </button>

            <div className="auth-register">
              <span>¿No tienes una cuenta?</span>{" "}
              <Link className="auth-register__link" to="/register">
                Regístrate
              </Link>

               <div className="auth-register">
                <Link className="auth-register__link" to="/forgot-password">
                 ¿Olvidaste tu contraseña?
                </Link>
               </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
