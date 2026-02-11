import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendCode() {
    setLoading(true);
    try {
      const res = await fetch("/api/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage("Error al enviar código.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode() {
    setLoading(true);
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        navigate("/login");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Error al verificar el código.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="verify-email">
      <h1>Verifica tu correo</h1>

      <div>
        <label>Correo:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={sendCode} disabled={loading}>Enviar código</button>
      </div>

      <div>
        <label>Código de verificación:</label>
        <input type="text" value={code} onChange={e => setCode(e.target.value)} />
        <button onClick={verifyCode} disabled={loading}>Verificar</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}
