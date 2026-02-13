<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Company;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'company_name' => ['required', 'string', 'max:255'],
            'plan_id'      => ['required', 'exists:plans,id'],
            'name'         => ['required', 'string', 'min:2', 'max:255'],
            'email'        => ['required', 'email', 'max:255', 'unique:users,email'],
            'password'     => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos inválidos',
                'errors'  => $validator->errors(),
            ], 422);
        }

        DB::beginTransaction();

        try {

            // 1️⃣ Obtener plan
            $plan = Plan::findOrFail($request->plan_id);

            // 2️⃣ Crear empresa automáticamente
            $company = Company::create([
                'name'    => $request->company_name,
                'type'    => $plan->type, // individual o business
                'status'  => 'trial',
                'plan_id' => $plan->id
            ]);

            // 3️⃣ Crear usuario owner
            $user = User::create([
                'name'       => $request->name,
                'email'      => $request->email,
                'password'   => Hash::make($request->password),
                'company_id' => $company->id,
                'role'       => 'owner'
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Cuenta creada correctamente',
                'company' => $company,
                'user'    => $user->only(['id', 'name', 'email'])
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => 'Error al registrar',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
