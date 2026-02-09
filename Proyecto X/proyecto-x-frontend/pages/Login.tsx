import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../styles/Login.css";

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

type ApiLoginResponse =
  | { token: string }
  | { access_token: string }
  | { data?: { token?: string } }
  | Record<string, unknown>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getApiBaseUrl() {
  // Producción: si no hay .env, usa same-origin (deploy/proxy).
  const v = (import.meta as any)?.env?.VITE_API_BASE_URL;
  return typeof v === "string" ? v.replace(/\/$/, "") : "";
}

function extractToken(payload: ApiLoginResponse): string | null {
  if (typeof (payload as any)?.token === "string") return (payload as any).token;
  if (typeof (payload as any)?.access_token === "string") return (payload as any).access_token;
  if (typeof (payload as any)?.data?.token === "string") return (payload as any).data.token;
  return null;
}

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    remember: true,
  });

  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};
    const email = form.email.trim();

    if (!email) next.email = "Ingresa tu correo.";
    else if (!emailRegex.test(email)) next.email = "Ingresa un correo válido.";

    if (!form.password) next.password = "Ingresa tu contraseña.";
    else if (form.password.length < 6) next.password = "La contraseña debe tener al menos 6 caracteres.";

    return next;
  }, [form.email, form.password]);

  const canSubmit = !loading && !errors.email && !errors.password;

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setUiError(null);

    if (!canSubmit) return;

    setLoading(true);
    try {
      const base = getApiBaseUrl();

      const res = await fetch(`${base}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      let data: ApiLoginResponse = {};
      try {
        data = (await res.json()) as ApiLoginResponse;
      } catch {
        data = {};
      }

      if (!res.ok) {
        if (res.status === 401) {
          setUiError("Correo o contraseña incorrectos.");
          return;
        }
        if (res.status === 422) {
          setUiError("Revisa los datos e inténtalo de nuevo.");
          return;
        }
        setUiError("No se pudo iniciar sesión. Inténtalo más tarde.");
        return;
      }

      const token = extractToken(data);
      if (!token) {
        setUiError("No se pudo iniciar sesión. Inténtalo más tarde.");
        return;
      }

      if (form.remember) localStorage.setItem("auth_token", token);
      else sessionStorage.setItem("auth_token", token);

      navigate("/dashboard", { replace: true });
    } catch {
      setUiError("No se pudo iniciar sesión. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <form className="login__card" onSubmit={onSubmit} noValidate>
        <h1 className="login__title">Iniciar sesión</h1>
        <p className="login__subtitle">Ingresa tus credenciales para continuar.</p>

        {uiError && (
          <div className="login__alert" role="alert">
            {uiError}
          </div>
        )}

        <div className="login__field">
          <label className="login__label" htmlFor="email">
            Correo
          </label>
          <input
            id="email"
            className="login__input"
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            autoComplete="email"
            placeholder="correo@empresa.com"
          />
          {touched.email && errors.email && <div className="login__error">{errors.email}</div>}
        </div>

        <div className="login__field">
          <label className="login__label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            className="login__input"
            type="password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            autoComplete="current-password"
            placeholder="••••••••"
          />
          {touched.password && errors.password && (
            <div className="login__error">{errors.password}</div>
          )}
        </div>

        <label className="login__remember">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => setField("remember", e.target.checked)}
          />
          <span>Recordarme</span>
        </label>

        <button className="login__submit" type="submit" disabled={!canSubmit}>
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}