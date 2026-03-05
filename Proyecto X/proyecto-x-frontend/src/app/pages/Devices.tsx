import { useEffect, useState } from "react";
import { getDevices, createDevice } from "@/services/deviceService";

type Device = {
  id: number;
  name: string;
  area?: string;
  vendor?: string;
  model?: string;
  serial?: string;
  status: string;
  created_at: string;
};

export default function Devices() {

  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    area: "",
    vendor: "",
    model: "",
    serial: "",
  });

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadDevices() {
    try {
      setLoading(true);
      const data = await getDevices();
      setDevices(data);
    } catch (err: any) {
      console.error(err);
      setError("No se pudieron cargar los dispositivos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDevices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setCreating(true);

    try {
      const res = await createDevice(form);

      setToken(res.ingest_token);

      setForm({
        name: "",
        area: "",
        vendor: "",
        model: "",
        serial: "",
      });

      await loadDevices();

    } catch (err: any) {

      console.error(err);

      setError(
        err.message ||
        "No se pudo crear el dispositivo. Verifica tu plan o datos."
      );

    } finally {
      setCreating(false);
    }
  };

  function copyToken() {
    if (!token) return;

    navigator.clipboard.writeText(token);
    alert("Token copiado al portapapeles");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10">

        <h1 className="text-2xl font-bold text-slate-900">
          Dispositivos
        </h1>

        {/* ERROR */}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        {/* FORM CREAR DISPOSITIVO */}

        <div className="mt-6 bg-white p-6 rounded-2xl border shadow-sm">

          <h2 className="font-semibold mb-4">
            Registrar IO-Link Master
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid gap-3 md:grid-cols-2"
          >

            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Nombre"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Área"
              value={form.area}
              onChange={(e) =>
                setForm({ ...form, area: e.target.value })
              }
            />

            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Vendor"
              value={form.vendor}
              onChange={(e) =>
                setForm({ ...form, vendor: e.target.value })
              }
            />

            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Modelo"
              value={form.model}
              onChange={(e) =>
                setForm({ ...form, model: e.target.value })
              }
            />

            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Serial"
              value={form.serial}
              onChange={(e) =>
                setForm({ ...form, serial: e.target.value })
              }
            />

            <button
              type="submit"
              disabled={creating}
              className="bg-slate-900 text-white rounded-lg px-4 py-2 hover:bg-slate-800 disabled:opacity-60"
            >
              {creating ? "Creando..." : "Crear dispositivo"}
            </button>

          </form>
        </div>

        {/* TOKEN INGESTION */}

        {token && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">

            <p className="text-sm text-green-800 font-semibold">
              Token de ingestión (guárdalo, solo se muestra una vez)
            </p>

            <div className="flex items-center gap-3 mt-2">

              <code className="text-xs break-all bg-white border px-2 py-1 rounded">
                {token}
              </code>

              <button
                onClick={copyToken}
                className="text-xs bg-green-600 text-white px-3 py-1 rounded"
              >
                Copiar
              </button>

            </div>

          </div>
        )}

        {/* LISTADO */}

        <div className="mt-6 bg-white rounded-2xl border shadow-sm">

          <div className="p-4 border-b font-semibold">
            Dispositivos registrados
          </div>

          {loading ? (
            <div className="p-6 text-sm text-slate-500">
              Cargando dispositivos...
            </div>
          ) : devices.length === 0 ? (
            <div className="p-6 text-sm text-slate-500">
              No hay dispositivos registrados
            </div>
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-slate-50 text-left text-xs">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Área</th>
                  <th className="px-4 py-3">Modelo</th>
                  <th className="px-4 py-3">Serial</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>

              <tbody>

                {devices.map((d) => (
                  <tr key={d.id} className="border-t">

                    <td className="px-4 py-3 font-medium">
                      {d.name}
                    </td>

                    <td className="px-4 py-3">
                      {d.area || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {d.model || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {d.serial || "-"}
                    </td>

                    <td className="px-4 py-3">

                      <span className="px-2 py-1 rounded text-xs bg-slate-100">
                        {d.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          )}

        </div>

      </div>
    </div>
  );
}