import { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [form, setForm] = useState<FormState>({
    email: (location.state?.email as string) || "", // prellenar si viene de verificación fallida
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
      const loginRes = await fetch(`${getApiBaseUrl()}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const loginData = await loginRes.json().catch(() => ({}));

      if (!loginRes.ok) {
        // ── Caso especial: email no verificado ────────────────────────────
        if (
          loginRes.status === 403 &&
          (loginData.error_code === "email_not_verified" ||
            loginData.message?.toLowerCase().includes("verificar") ||
            loginData.message?.toLowerCase().includes("verified"))
        ) {
          navigate("/verification", {
            replace: true,
            state: {
              email: loginData.email || form.email.trim(),
              message:
                loginData.message ||
                "Tu cuenta aún no está verificada. Por favor ingresa el código que te enviamos a tu correo.",
            },
          });
          return;
        }

        // Otros errores comunes
        const msg =
          loginData.message ||
          loginData.errors?.email?.[0] ||
          loginData.errors?.password?.[0] ||
          "No se pudo iniciar sesión. Verifica tus credenciales.";
        setUiError(msg);
        return;
      }

      // Login exitoso → guardar token
      const token = loginData.token || loginData.access_token || loginData.auth_token;
      if (!token) {
        setUiError("No se recibió token de autenticación");
        return;
      }

      const storage = form.remember ? localStorage : sessionStorage;
      storage.setItem("auth_token", token);

      // Verificar datos del usuario actual (/me)
      const meRes = await fetch(`${getApiBaseUrl()}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!meRes.ok) {
        storage.removeItem("auth_token");
        setUiError("Sesión inválida. Por favor intenta de nuevo.");
        return;
      }

      const user = await meRes.json();

      // Redirección según estado de la cuenta
      if (user.company_id) {
        navigate("/inicio", { replace: true });
      } else {
        navigate("/select-plan", { replace: true });
      }
    } catch (err) {
      console.error("Error en login o verificación:", err);
      setUiError("Error de conexión. Intenta nuevamente en unos momentos.");
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
              IPROCESSs
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

                {/* Botón de acción rápida si parece ser error de verificación */}
                {(uiError.toLowerCase().includes("verificar") ||
                  uiError.toLowerCase().includes("verified")) && (
                  <div style={{ marginTop: "16px", textAlign: "center" }}>
                    <button
                      type="button"
                      className="auth-button auth-button--secondary"
                      onClick={() =>
                        navigate("/verification", {
                          state: {
                            email: form.email.trim(),
                            message: "Ingresa el código de verificación que te enviamos.",
                          },
                        })
                      }
                      style={{ padding: "8px 16px" }}
                    >
                      Verificar mi correo ahora
                    </button>
                  </div>
                )}
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
            </div>

            <div className="auth-register">
              <Link className="auth-register__link" to="/forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}