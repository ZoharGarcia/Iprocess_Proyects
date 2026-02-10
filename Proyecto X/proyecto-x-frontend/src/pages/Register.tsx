// src/pages/Register.tsx
import { useState, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [emailExists, setEmailExists] = useState<boolean | null>(null);

  // Validaciones de frontend
  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) next.name = "Ingresa tu nombre.";
    else if (name.length < 2) next.name = "El nombre debe tener al menos 2 caracteres.";

    if (!email) next.email = "Ingresa tu correo.";
    else if (!emailRegex.test(email)) next.email = "Ingresa un correo válido.";
    else if (emailExists) next.email = "Este correo ya está registrado.";

    if (!form.password) next.password = "Ingresa tu contraseña.";
    else if (form.password.length < 6) next.password = "La contraseña debe tener al menos 6 caracteres.";

    if (!form.passwordConfirm) next.passwordConfirm = "Confirma tu contraseña.";
    else if (form.passwordConfirm !== form.password)
      next.passwordConfirm = "Las contraseñas no coinciden.";

    return next;
  }, [form, emailExists]);

  const canSubmit =
    !loading &&
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.passwordConfirm;

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Validación de email en tiempo real
  useEffect(() => {
    const timer = setTimeout(() => {
      if (emailRegex.test(form.email)) {
        checkEmail(form.email).then(setEmailExists).catch(() => setEmailExists(null));
      } else {
        setEmailExists(null);
      }
    }, 500); // debounce de 500ms

    return () => clearTimeout(timer);
  }, [form.email]);

  async function checkEmail(email: string) {
    const base = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${base}/check-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.exists;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, passwordConfirm: true });
    setUiError(null);

    if (!canSubmit) return;

    setLoading(true);
    try {
      const base = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${base}/register`, {
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
        if (res.status === 422) setUiError("Revisa los datos e inténtalo de nuevo.");
        else setUiError("No se pudo crear la cuenta. Inténtalo más tarde.");
        return;
      }

      // Guardar token si existe
const token =
  "token" in data && typeof (data as { token: string }).token === "string"
    ? (data as { token: string }).token
    : "access_token" in data && typeof (data as { access_token: string }).access_token === "string"
    ? (data as { access_token: string }).access_token
    : "data" in data && data.data && typeof data.data.token === "string"
    ? data.data.token
    : null;

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

        {/* Nombre */}
        <div className="register__field">
          <label className="register__label" htmlFor="name">Nombre</label>
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

        {/* Email */}
        <div className="register__field">
          <label className="register__label" htmlFor="email">Correo</label>
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

        {/* Contraseña */}
        <div className="register__field">
          <label className="register__label" htmlFor="password">Contraseña</label>
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

        {/* Confirmar contraseña */}
        <div className="register__field">
          <label className="register__label" htmlFor="passwordConfirm">Confirmar contraseña</label>
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
