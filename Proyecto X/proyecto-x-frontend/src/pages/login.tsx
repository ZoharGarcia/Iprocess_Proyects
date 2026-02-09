import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom" // si vas a redirigir

type FormState = {
  email: string
  password: string
  remember: boolean
}

type TouchedState = {
  email: boolean
  password: boolean
}

type LaravelErrorResponse = {
  message?: string
  errors?: Record<string, string[]>
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const API_URL = import.meta.env.VITE_API_URL as string

function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    remember: true,
  })

  const [touched, setTouched] = useState<TouchedState>({
    email: false,
    password: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const errors = useMemo(() => {
    const nextErrors: Partial<Record<"email" | "password", string>> = {}

    const email = form.email.trim()

    if (!email) nextErrors.email = "Ingresa tu correo."
    else if (!emailRegex.test(email)) nextErrors.email = "Correo no válido."

    if (!form.password) nextErrors.password = "Ingresa tu clave."
    else if (form.password.length < 6) nextErrors.password = "Mínimo 6 caracteres."

    return nextErrors
  }, [form.email, form.password])

  const hasErrors = Object.keys(errors).length > 0

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const readLaravelError = async (response: Response) => {
    
    try {
      const data = (await response.json()) as LaravelErrorResponse
      if (data?.errors) {
        // Agarra el primer error disponible
        const firstKey = Object.keys(data.errors)[0]
        const firstMsg = data.errors[firstKey]?.[0]
        if (firstMsg) return firstMsg
      }
      if (data?.message) return data.message
    } catch {
      // si no es JSON, cae aquí
    }
    return "No se pudo iniciar sesión."
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setServerError(null)

    if (hasErrors) {
      setTouched({ email: true, password: true })
      return
    }

    setLoading(true)
    try {
      
      const csrfRes = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
      })
      if (!csrfRes.ok) {
        throw new Error("No se pudo obtener CSRF. Revisa CORS/Sanctum.")
      }

      // Login (Laravel /login)
      const loginRes = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include", // para sesión/cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
          remember: form.remember,
        }),
      })

      if (!loginRes.ok) {
        const msg = await readLaravelError(loginRes)
        throw new Error(msg)
      }

      // 3) Opcional: pedir usuario autenticado
      // (depende si tu backend expone /api/user)
      // const meRes = await fetch(`${API_URL}/api/user`, { credentials: "include" })
      // const me = await meRes.json()

      // 4) Redirigir (si usas router)
    navigate("/dashboard")
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="login__glow" aria-hidden="true" />

      <section className="login__panel login__panel--info">
        <div className="login__brand">Proyecto X</div>
        <h1>Accede a tu espacio operativo</h1>
        <p>
          Centraliza procesos, operaciones y reportes. Este login define el punto de entrada
          para equipos de operaciones, logística y administración.
		</p>
	  </section>
	  <section className="login__panel login__panel--form">
	

