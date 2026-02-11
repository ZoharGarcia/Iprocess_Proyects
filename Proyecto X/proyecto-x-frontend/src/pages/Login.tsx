// Importaciones
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../app/components/LoginForm";
import "../styles/Login.css";

type FormState = {
  // Define el tipo FormState, que representa el estado del formulario de inicio de sesión, incluyendo los campos de correo electrónico, contraseña y la opción de recordar sesión.
  email: string;
  password: string;
  remember: boolean;
};

type ApiLoginResponse = {
  // Define el tipo ApiLoginResponse, que representa la posible estructura de la respuesta de la API al intentar iniciar sesión. Puede contener un token de autenticación en diferentes formatos, dependiendo de cómo el backend lo envíe.
  token?: string;
  access_token?: string;
  data?: { token?: string };
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function extractToken(payload: ApiLoginResponse): string | null {
  return payload.token ?? payload.access_token ?? payload.data?.token ?? null;
}

// Función para obtener la URL base de la API desde variables de entorno de Vite
function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;

  if (envUrl) {
    // Quita posible slash final para evitar duplicados
    return envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
  }

  // Fallback solo en desarrollo si la variable no está definida
  if (import.meta.env.MODE === "development") {
    return "http://127.0.0.1:8000/api";
  }

  throw new Error("VITE_API_BASE_URL no está configurada");
}

export default function Login() {
  // Componente para la página de inicio de sesión
  const navigate = useNavigate();

  // Define el estado del formulario utilizando el hook useState, inicializando los campos de correo electrónico, contraseña y la opción de recordar sesión con valores predeterminados.
  const [form, setForm] = useState<FormState>({
    // Estado del formulario, que incluye los campos de correo electrónico, contraseña y la opción de recordar sesión. Inicializa el correo electrónico y la contraseña como cadenas vacías, y la opción de recordar sesión como verdadera.
    email: "",
    password: "",
    remember: true,
  });

  const [touched, setTouched] = useState({
    // Estado para rastrear si los campos del formulario han sido tocados (interactuados) por el usuario, lo que se utiliza para mostrar mensajes de error solo después de que el usuario haya interactuado con los campos. Inicializa ambos campos como no tocados (false).
    email: false,
    password: false,
  });

  // Estado para rastrear si la solicitud de inicio de sesión está en curso (loading) y para almacenar cualquier error de interfaz de usuario (uiError) que pueda ocurrir durante el proceso de inicio de sesión.
  const [loading, setLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.email) next.email = "Ingresa tu correo.";
    else if (!emailRegex.test(form.email)) {
      next.email = "Correo inválido.";
    }

    if (!form.password) next.password = "Ingresa tu contraseña.";
    else if (form.password.length < 6) {
      next.password = "Mínimo 6 caracteres.";
    }

    return next;
  }, [form]);

  const canSubmit = !loading && !errors.email && !errors.password;

  // Funciones
  // Funciones para manejar cambios en los campos del formulario, eventos de desenfoque (blur) y el envío del formulario.
  function onChange(field: keyof FormState, value: string | boolean) {
    // Función para manejar cambios en los campos del formulario. Actualiza el estado del formulario con el nuevo valor ingresado por el usuario para el campo correspondiente (correo electrónico, contraseña o la opción de recordar sesión).
    setForm((p) => ({ ...p, [field]: value }));
  }

  function onBlur(field: "email" | "password") {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Función para manejar el envío del formulario de inicio de sesión. Realiza la validación de los campos, muestra errores si es necesario, y si todo es correcto, envía una solicitud a la API para intentar iniciar sesión. Si el inicio de sesión es exitoso, almacena el token de autenticación y redirige al usuario al dashboard.
    e.preventDefault();
    setTouched({ email: true, password: true });
    setUiError(null);

    if (!canSubmit) return;

    setLoading(true);

    try {
      const res = await fetch(`${getApiBaseUrl()}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data: ApiLoginResponse = await res.json();

      if (!res.ok) throw new Error();

      const token = extractToken(data);
      if (!token) throw new Error();

      if (form.remember) {
        localStorage.setItem("auth_token", token);
      } else {
        sessionStorage.setItem("auth_token", token);
      }

      navigate("/dashboard", { replace: true });
    } catch {
      setUiError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoginForm
      email={form.email}
      password={form.password}
      remember={form.remember}
      loading={loading}
      canSubmit={canSubmit}
      errors={errors}
      touched={touched}
      uiError={uiError}
      onSubmit={onSubmit}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}