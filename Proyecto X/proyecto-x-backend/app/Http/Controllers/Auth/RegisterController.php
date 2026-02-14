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
        'name'     => ['required', 'string', 'min:2', 'max:255'],
        'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
        'password' => ['required', 'string', 'min:6', 'confirmed'],
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Datos inválidos',
            'errors'  => $validator->errors(),
        ], 422);
    }

    $user = User::create([
        'name'       => $request->name,
        'email'      => $request->email,
        'password'   => Hash::make($request->password),
        'role'       => null,
        'company_id' => null,
    ]);

    return response()->json([
        'message' => 'Usuario registrado. Debe seleccionar un plan.',
        'user'    => $user->only(['id', 'name', 'email']),
    ], 201);
}

}
