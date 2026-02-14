<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Device;
use Illuminate\Support\Str;

class DeviceController extends Controller
{
    /**
     * Listar dispositivos de la empresa del usuario autenticado
     */
    public function index(Request $request)
    {
        $company = $request->user()->company;

        return response()->json([
            'devices' => $company->devices
        ]);
    }

    /**
     * Crear nuevo dispositivo
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $user = $request->user();
        $company = $user->company;
        $plan = $company->plan;

        // 🔒 Verificar límite de dispositivos según plan
        if ($company->devices()->count() >= $plan->max_devices) {
            return response()->json([
                'message' => 'Has alcanzado el límite de dispositivos de tu plan.'
            ], 403);
        }

        $device = Device::create([
            'company_id' => $company->id,
            'name'       => $request->name,
            'token'      => Str::uuid(), // Token único para el dispositivo
            'status'     => 'active'
        ]);

        return response()->json([
            'message' => 'Dispositivo creado correctamente',
            'device'  => $device
        ], 201);
    }
}
