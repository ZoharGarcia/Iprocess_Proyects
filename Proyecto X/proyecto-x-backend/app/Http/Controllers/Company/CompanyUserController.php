<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class CompanyUserController extends Controller
{
    // 🔹 Crear usuario dentro de mi empresa
    public function store(Request $request)
    {
        $authUser = Auth::user();
        $company = $authUser->company;

        // 1️⃣ Verificar que empresa esté activa o en trial
        if (!in_array($company->status, ['active', 'trial'])) {
            return response()->json([
                'error' => 'Cuenta suspendida. Contacte administración.'
            ], 403);
        }

        // 2️⃣ Solo owner o admin pueden crear usuarios
        if (!in_array($authUser->role, ['owner', 'admin'])) {
            return response()->json([
                'error' => 'No tiene permisos para crear usuarios.'
            ], 403);
        }

        // 3️⃣ Validar plan individual
        if ($company->type === 'individual') {
            return response()->json([
                'error' => 'El plan individual no permite múltiples usuarios.'
            ], 403);
        }

        // 4️⃣ Validar límite de usuarios del plan
        $currentUsers = User::where('company_id', $company->id)->count();

        if ($currentUsers >= $company->plan->max_users) {
            return response()->json([
                'error' => 'Límite de usuarios alcanzado para su plan.'
            ], 403);
        }

        // 5️⃣ Validación de datos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:user,admin',
        ]);

        // 6️⃣ Crear usuario
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'company_id' => $company->id,
        ]);

        return response()->json([
            'message' => 'Usuario creado correctamente.',
            'user' => $user
        ], 201);
    }

    // 🔹 Listar usuarios de mi empresa
    public function index()
    {
        $authUser = Auth::user();
        $company = $authUser->company;

        // Verificar empresa activa
        if (!in_array($company->status, ['active', 'trial'])) {
            return response()->json([
                'error' => 'Cuenta suspendida.'
            ], 403);
        }

        $users = User::where('company_id', $company->id)
                     ->select('id', 'name', 'email', 'role', 'created_at')
                     ->paginate(10);

        return response()->json($users);
    }
}
