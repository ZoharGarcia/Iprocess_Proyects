import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import "../../styles/register.css";

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type Touched = Record<keyof FormState, boolean>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return typeof baseUrl === "string" ? baseUrl.replace(/\/$/, "") : "";
}

export function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [touched, setTouched] = useState<Touched>({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) e.name = "Ingresa tu nombre";
    else if (form.name.trim().length < 2) e.name = "Mínimo 2 caracteres";

    if (!form.email.trim()) e.email = "Ingresa tu correo";
    else if (!emailRegex.test(form.email)) e.email = "Correo inválido";

    if (!form.password) e.password = "Ingresa contraseña";
    else if (form.password.length < 6) e.password = "Mínimo 6 caracteres";

    if (!form.passwordConfirm) e.passwordConfirm = "Confirma contraseña";
    else if (form.password !== form.passwordConfirm)
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
      const res = await fetch(`${getApiBaseUrl()}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          password_confirmation: form.passwordConfirm,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data.message ||
          data.errors?.email?.[0] ||
          data.errors?.password?.[0] ||
          "No se pudo registrar";
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
      <div className="auth-split">
        <aside className="auth-brand">
          <div className="auth-brand__logoWrap">
            <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "0.06em" }}>
              IPROCESS
            </div>
          </div>

          <div className="auth-brand__divider" />
          <h2 className="auth-brand__title">Proyecto X</h2>
          <p className="auth-brand__subtitle">Crea tu cuenta para continuar</p>
        </aside>

        <main className="auth-panel">
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="auth-header">
              <h1>Crear cuenta</h1>
              <p>Completa los datos para registrarte.</p>
            </div>

            {uiError && (
              <div className="auth-error" role="alert">
                {uiError}
              </div>
            )}

            <label className="auth-label" htmlFor="name">
              Nombre
              <input
                id="name"
                className="auth-input"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                autoComplete="name"
                placeholder="Tu nombre"
              />
              {touched.name && errors.name && (
                <div className="auth-field-error">{errors.name}</div>
              )}
            </label>

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
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres"
              />
              {touched.password && errors.password && (
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
                onBlur={() => setTouched((p) => ({ ...p, passwordConfirm: true }))}
                autoComplete="new-password"
                placeholder="Repite tu contraseña"
              />
              {touched.passwordConfirm && errors.passwordConfirm && (
                <div className="auth-field-error">{errors.passwordConfirm}</div>
              )}
            </label>

            <button className="auth-button" type="submit" disabled={!canSubmit}>
              {loading ? "Creando..." : "Crear cuenta"}
            </button>

            <div className="auth-register">
              <span>¿Ya tienes una cuenta?</span>{" "}
              <Link className="auth-register__link" to="/login">
                Inicia sesión
              </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}