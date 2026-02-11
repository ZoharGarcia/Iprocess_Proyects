import logoProyectoX from "@/assets/img/LOGO-IPROCESS-NARANJA-300x53.png";
import React from "react";

type Errors = {
  email?: string;
  password?: string;
};

type Touched = {
  email: boolean;
  password: boolean;
};

type LoginFormProps = {
  email: string;
  password: string;
  remember: boolean;
  loading: boolean;
  canSubmit: boolean;
  errors: Errors;
  touched: Touched;
  uiError: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    field: "email" | "password" | "remember",
    value: string | boolean
  ) => void;
  onBlur: (field: "email" | "password") => void;
};

export default function LoginForm({
  email,
  password,
  remember,
  loading,
  canSubmit,
  errors,
  touched,
  uiError,
  onSubmit,
  onChange,
  onBlur,
}: LoginFormProps) {
  return (
    <div className="auth-shell">
      <div className="auth-split">
        
        {/* LADO IZQUIERDO */}
        <aside className="auth-brand">
          <div className="auth-brand__logoWrap">
            <img
              src={logoProyectoX}
              alt="iProcess"
              className="auth-brand__logo"
            />
          </div>

          <div className="auth-brand__divider" />

          <h2 className="auth-brand__title">iProcess</h2>
          <p className="auth-brand__subtitle">
            Plataforma de acceso a Proyecto X
          </p>
        </aside>

        {/* LADO DERECHO */}
        <main className="auth-panel">
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="auth-header">
              <h1>Iniciar sesión</h1>
              <p>Ingresa tus credenciales para continuar.</p>
            </div>

            {uiError && (
              <div className="auth-error" role="alert">
                {uiError}
              </div>
            )}

            <label htmlFor="email" className="auth-label">
              Correo
              <input
                id="email"
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => onChange("email", e.target.value)}
                onBlur={() => onBlur("email")}
                autoComplete="email"
              />
              {touched.email && errors.email && (
                <div className="auth-field-error">{errors.email}</div>
              )}
            </label>

            <label htmlFor="password" className="auth-label">
              Contraseña
              <input
                id="password"
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => onChange("password", e.target.value)}
                onBlur={() => onBlur("password")}
                autoComplete="current-password"
              />
              {touched.password && errors.password && (
                <div className="auth-field-error">{errors.password}</div>
              )}
            </label>

            <label className="auth-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => onChange("remember", e.target.checked)}
              />
              <span>Recordarme</span>
            </label>

            <button
              className="auth-button"
              type="submit"
              disabled={!canSubmit}
            >
              {loading ? "Ingresando..." : "Entrar"}
            </button>

            <div className="auth-register">
              <span>¿No tienes una cuenta?</span>{" "}
              <a className="auth-register__link" href="/register">
                Regístrate
              </a>
            </div>


          </form>
        </main>
      </div>
    </div>
  );
}
