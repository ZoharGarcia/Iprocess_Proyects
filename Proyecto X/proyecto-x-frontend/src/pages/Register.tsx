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

  const [step, setStep] = useState<"register" | "verify">("register");
  const [verificationCode, setVerificationCode] = useState("");
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);

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

    const trimmedName = form.name.trim();
    if (!trimmedName) e.name = "Ingresa tu nombre";
    else if (trimmedName.length < 2) e.name = "Mínimo 2 caracteres";

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

  // ===============================
  // REGISTRO
  // ===============================
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

      setStep("verify");
    } catch {
      setUiError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  // ===============================
  // REENVIAR CÓDIGO
  // ===============================
  async function resendCode() {
    setResendLoading(true);
    setResendMessage(null);
    setUiError(null);

    try {
      const res = await fetch(`${getApiBaseUrl()}/send-verification-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setUiError(data.message || "No se pudo reenviar el código");
        return;
      }

      setResendMessage("¡Código reenviado! Revisa tu correo.");
      setTimeout(() => setResendMessage(null), 5000);
    } catch {
      setUiError("Error de conexión al reenviar");
    } finally {
      setResendLoading(false);
    }
  }

  // ===============================
  // VERIFICAR CÓDIGO
  // ===============================
  async function verifyEmail() {
    const code = verificationCode.trim();
    if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
      setUiError("Ingresa un código válido de 6 dígitos");
      return;
    }

    setLoading(true);
    setUiError(null);

    try {
      const res = await fetch(`${getApiBaseUrl()}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setUiError(data.message || "Código inválido");
        return;
      }

      navigate("/login", { replace: true });
    } catch {
      setUiError("Error del servidor");
    } finally {
      setLoading(false);
    }
  }

  // ===============================
  // UI VERIFICACIÓN
  // ===============================
  if (step === "verify") {
    return (
      <div className="register">
        <div className="register__card">
          <h1>Verifica tu correo</h1>
          <p>
            Enviamos un código a <b>{form.email}</b>
          </p>

          {uiError && <div className="register__alert">{uiError}</div>}
          {resendMessage && <div className="register__success">{resendMessage}</div>}

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Código de 6 dígitos"
            value={verificationCode}
            onChange={(e) =>
              setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
          />

          <button onClick={verifyEmail} disabled={loading}>
            {loading ? "Verificando..." : "Verificar"}
          </button>

          <button
            onClick={resendCode}
            disabled={resendLoading}
            className="register__resend"
          >
            {resendLoading ? "Enviando..." : "Reenviar código"}
          </button>
        </div>
      </div>
    );
  }

  // ===============================
  // UI REGISTRO
  // ===============================
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