const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Obtiene el token almacenado
 */
function getToken(): string | null {
  return (
    localStorage.getItem("auth_token") ||
    sessionStorage.getItem("auth_token")
  );
}

/**
 * Cliente base para llamadas API
 */
async function apiFetch(url: string, options: RequestInit = {}) {
  const token = getToken();

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    throw new Error(
      error.message || `Error ${res.status} al llamar ${url}`
    );
  }

  return res.json();
}

/**
 * Obtener dispositivos
 */
export async function getDevices() {
  const data = await apiFetch("/devices", {
    method: "GET",
  });

  return data.devices;
}

/**
 * Crear dispositivo
 */
export async function createDevice(data: {
  name: string;
  area?: string;
  vendor?: string;
  model?: string;
  serial?: string;
}) {
  return apiFetch("/devices", {
    method: "POST",
    body: JSON.stringify(data),
  });
}