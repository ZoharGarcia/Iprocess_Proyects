// Importaciones

import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

// Tipos/Types

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type ApiRegisterResponse = {
  token?: string;
};

// Utilidades

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return typeof baseUrl === "string" ? baseUrl.replace(/\/$/, "") : "";
}

function extractToken(payload: unknown): string | null { // Función para extraer el token de autenticación de la respuesta de la API. Devuelve el token si está presente, o null si no se encuentra.
  if ( // Condicion para verificar si el payload es un objeto que contiene un token de autenticación en alguna de las posibles propiedades (token, access_token o data.token) y que dicho token es una cadena. Si se cumple esta condición, devuelve el token; de lo contrario, devuelve null.
    payload &&
    typeof payload === "object" &&
    "token" in payload &&
    typeof (payload as { token: unknown }).token === "string"
  ) {
    return (payload as { token: string }).token;
  }
  return null;
}

// Componente principal de la página de registro

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

/**Validaciones de campos del formulario utilizando useMemo para memorizar los errores y evitar cálculos innecesarios en cada renderizado. 
Verifica que el nombre tenga al menos 2 caracteres, que el correo sea válido, que la contraseña tenga al menos 6 caracteres y que la confirmación de contraseña coincida con la contraseña.*/

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

// Submit
/* Función para manejar el envío del formulario de registro. Realiza la validación de los campos, muestra errores si es necesario, y si todo es correcto, envía una solicitud a la API para intentar crear una nueva cuenta. Si el registro es exitoso, almacena el token de autenticación y redirige al usuario al dashboard. 
Si ocurre algún error durante este proceso, muestra un mensaje de error en la interfaz de usuario.*/

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, passwordConfirm: true });
    setUiError(null);

    if (!canSubmit) return; // Si no se puede enviar el formulario (por ejemplo, si hay errores de validación o si ya se está procesando una solicitud), simplemente retorna y no realiza ninguna acción.

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

      const token = extractToken(data); // Intenta extraer el token de autenticación de la respuesta de la API utilizando la función extractToken. Si se encuentra un token válido, lo almacena en el almacenamiento local y redirige al usuario al dashboard. Si no se encuentra un token válido, redirige al usuario a la página de inicio de sesión.
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

// UI

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
