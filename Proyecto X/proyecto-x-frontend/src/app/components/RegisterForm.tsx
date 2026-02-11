import React from "react";
import { Link } from "react-router-dom";
import logoProyectoX from "@/assets/img/LOGO-IPROCESS-NARANJA-300x53.png";

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type Errors = Partial<Record<keyof FormState, string>>;
type Touched = Record<keyof FormState, boolean>;

type RegisterFormProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  loading: boolean;
  canSubmit: boolean;
  errors: Errors;
  touched: Touched;
  uiError: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof FormState, value: string) => void;
  onBlur: (field: keyof FormState) => void;
};

export default function RegisterForm({
  name,
  email,
  password,
  passwordConfirm,
  loading,
  canSubmit,
  errors,
  touched,
  uiError,
  onSubmit,
  onChange,
  onBlur,
}: RegisterFormProps) {
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
            Crea tu cuenta para acceder a Proyecto X
          </p>
        </aside>

        {/* LADO DERECHO */}
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
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => onChange("name", e.target.value)}
                onBlur={() => onBlur("name")}
                autoComplete="name"
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
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => onChange("email", e.target.value)}
                onBlur={() => onBlur("email")}
                autoComplete="email"
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
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => onChange("password", e.target.value)}
                onBlur={() => onBlur("password")}
                autoComplete="new-password"
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
                placeholder="Repite tu contraseña"
                value={passwordConfirm}
                onChange={(e) => onChange("passwordConfirm", e.target.value)}
                onBlur={() => onBlur("passwordConfirm")}
                autoComplete="new-password"
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
