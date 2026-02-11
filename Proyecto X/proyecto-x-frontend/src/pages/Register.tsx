import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

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

  async function onSubmit(e: React.FormEvent) {
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

      // 🔥 Redirigir a login después de registrar
      navigate("/login", { replace: true });

    } catch {
      setUiError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register">
      <form className="register__card" onSubmit={onSubmit}>
        <h1>Crear cuenta</h1>

        {uiError && <div className="register__alert">{uiError}</div>}

        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
        />

        <input
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setField("password", e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={form.passwordConfirm}
          onChange={(e) => setField("passwordConfirm", e.target.value)}
        />

        <button disabled={!canSubmit}>
          {loading ? "Creando..." : "Crear cuenta"}
        </button>

        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}
