// src/pages/Profile.tsx
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const token =
    localStorage.getItem("auth_token") ||
    sessionStorage.getItem("auth_token");

  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ============================
  // Fetch profile
  // ============================
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (res.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
        setFormData({
          name: data.user.name || "",
          phone: data.user.phone || "",
        });
      } catch {
        setError("No se pudo cargar el perfil");
      }
    };

    fetchProfile();
  }, [token, logout, navigate]);

  // ============================
  // Update profile
  // ============================
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setUser(data.user);
      setSuccess("Perfil actualizado correctamente");
    } catch (err: any) {
      setError(err.message || "Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Change password
  // ============================
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/change-password", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccess("Contraseña actualizada. Cerrando sesión...");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Error al cambiar contraseña");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Delete account
  // ============================
  const handleDeleteAccount = async () => {
    if (!confirm("¿Seguro que deseas eliminar tu cuenta?")) return;

    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error();

      logout();
      navigate("/");
    } catch {
      setError("No se pudo eliminar la cuenta");
    }
  };

  // ============================
  // Manual logout button
  // ============================
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user)
    return <div className="p-8 text-center">Cargando perfil...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Encabezado interno */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <Button variant="outline" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      {/* Mensajes */}
      {success && (
        <div className="mb-6 p-4 rounded bg-green-50 text-green-800 border border-green-200">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded bg-red-50 text-red-800 border border-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {/* Información personal */}
        <Card>
          <CardHeader>
            <CardTitle>Información personal</CardTitle>
            <CardDescription>Actualiza tus datos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input value={user.email} disabled />
              </div>

              <div>
                <Label>Nombre</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Teléfono</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Cambiar contraseña */}
        <Card>
          <CardHeader>
            <CardTitle>Cambiar contraseña</CardTitle>
            <CardDescription>Usa una contraseña segura</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                type="password"
                placeholder="Contraseña actual"
                value={passwordData.current_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    current_password: e.target.value,
                  })
                }
              />
              <Input
                type="password"
                placeholder="Nueva contraseña"
                value={passwordData.password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    password: e.target.value,
                  })
                }
              />
              <Input
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={passwordData.password_confirmation}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    password_confirmation: e.target.value,
                  })
                }
              />

              <Button variant="destructive" type="submit" disabled={loading}>
                {loading ? "Procesando..." : "Cambiar contraseña"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Zona peligrosa */}
      <Card className="mt-8 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Zona de peligro</CardTitle>
          <CardDescription>Eliminar cuenta permanentemente</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Eliminar mi cuenta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
