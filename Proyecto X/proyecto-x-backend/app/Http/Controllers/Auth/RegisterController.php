<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailMail;
use Carbon\Carbon;

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

        // Código de 6 dígitos con expiración de 10 minutos
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $user = User::create([
            'name'                       => $request->name,
            'email'                      => $request->email,
            'password'                   => Hash::make($request->password),
            'email_verified_at'          => null,
            'verification_code'          => $code,
            'verification_code_expires_at' => Carbon::now()->addMinutes(10),
        ]);

        // Enviar correo
        Mail::to($user->email)->send(new VerifyEmailMail($user->name, $code));

        // Opcional: token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario creado. Revisa tu correo para el código de verificación.',
            'token'   => $token,
            'user'    => $user->only(['id', 'name', 'email']),
        ], 201);
    }
}