import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type ApiRegisterResponse =
  | { token: string }
  | { access_token: string }
  | { data?: { token?: string } }
  | Record<string, unknown>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getApiBaseUrl(): string {
  const v = import.meta.env.VITE_API_BASE_URL;
  return typeof v === "string" ? v.replace(/\/$/, "") : "";
}

function extractToken(payload: unknown): string | null {
  if (
    payload &&
    typeof payload === "object" &&
    "token" in payload &&
    typeof (payload as { token: unknown }).token === "string"
  ) {
    return (payload as { token: string }).token;
  }
  return null;
}


export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) next.name = "Ingresa tu nombre.";
    else if (name.length < 2) next.name = "El nombre debe tener al menos 2 caracteres.";

    if (!email) next.email = "Ingresa tu correo.";
    else if (!emailRegex.test(email)) next.email = "Ingresa un correo válido.";

    if (!form.password) next.password = "Ingresa tu contraseña.";
    else if (form.password.length < 6) next.password = "La contraseña debe tener al menos 6 caracteres.";

    if (!form.passwordConfirm) next.passwordConfirm = "Confirma tu contraseña.";
    else if (form.passwordConfirm !== form.password)
      next.passwordConfirm = "Las contraseñas no coinciden.";

    return next;
  }, [form.name, form.email, form.password, form.passwordConfirm]);

  const canSubmit =
    !loading &&
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.passwordConfirm;

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, passwordConfirm: true });
    setUiError(null);

    if (!canSubmit) return;

    setLoading(true);
    try {
      const base = getApiBaseUrl();

      const res = await fetch(`${base}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          password_confirmation: form.passwordConfirm, // Laravel common convention
        }),
      });

      let data: ApiRegisterResponse = {};
      try {
        data = (await res.json()) as ApiRegisterResponse;
      } catch {
        data = {};
      }

      if (!res.ok) {
        // Mensajes user-friendly
        if (res.status === 422) {
          setUiError("Revisa los datos e inténtalo de nuevo.");
          return;
        }
        setUiError("No se pudo crear la cuenta. Inténtalo más tarde.");
        return;
      }

      // Si backend devuelve token, autologin; si no, manda a login
      const token = extractToken(data);
      if (token) {
        localStorage.setItem("auth_token", token);
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } catch {
      setUiError("No se pudo crear la cuenta. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register">
      <form className="register__card" onSubmit={onSubmit} noValidate>
        <h1 className="register__title">Crear cuenta</h1>
        <p className="register__subtitle">Completa tus datos para registrarte.</p>

        {uiError && (
          <div className="register__alert" role="alert">
            {uiError}
          </div>
        )}

        <div className="register__field">
          <label className="register__label" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            className="register__input"
            type="text"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            autoComplete="name"
            placeholder="Tu nombre"
          />
          {touched.name && errors.name && <div className="register__error">{errors.name}</div>}
        </div>

        <div className="register__field">
          <label className="register__label" htmlFor="email">
            Correo
          </label>
          <input
            id="email"
            className="register__input"
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            autoComplete="email"
            placeholder="correo@empresa.com"
          />
          {touched.email && errors.email && <div className="register__error">{errors.email}</div>}
        </div>

        <div className="register__field">
          <label className="register__label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            className="register__input"
            type="password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            autoComplete="new-password"
            placeholder="••••••••"
          />
          {touched.password && errors.password && (
            <div className="register__error">{errors.password}</div>
          )}
        </div>

        <div className="register__field">
          <label className="register__label" htmlFor="passwordConfirm">
            Confirmar contraseña
          </label>
          <input
            id="passwordConfirm"
            className="register__input"
            type="password"
            value={form.passwordConfirm}
            onChange={(e) => setField("passwordConfirm", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, passwordConfirm: true }))}
            autoComplete="new-password"
            placeholder="••••••••"
          />
          {touched.passwordConfirm && errors.passwordConfirm && (
            <div className="register__error">{errors.passwordConfirm}</div>
          )}
        </div>

        <button className="register__submit" type="submit" disabled={!canSubmit}>
          {loading ? "Creando..." : "Crear cuenta"}
        </button>

        <p className="register__footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}
