import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../app/components/RegisterForm";
import "../styles/Register.css";

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type Touched = Record<keyof FormState, boolean>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return typeof baseUrl === "string" ? baseUrl.replace(/\/$/, "") : "";
}

export default function Register() {
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

  const errors = useMemo<Errors>(() => {
    const e: Errors = {};

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

  function onChange(field: keyof FormState, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function onBlur(field: keyof FormState) {
    setTouched((p) => ({ ...p, [field]: true }));
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

      const data = await res.json();

      if (!res.ok) {
        const errorMsg =
          data.message ||
          data.errors?.email?.[0] ||
          data.errors?.password?.[0] ||
          "No se pudo registrar";
        setUiError(errorMsg);
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
    <RegisterForm
      name={form.name}
      email={form.email}
      password={form.password}
      passwordConfirm={form.passwordConfirm}
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
