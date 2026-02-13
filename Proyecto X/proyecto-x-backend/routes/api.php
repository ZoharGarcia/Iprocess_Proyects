<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\ContactoController;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailMail;
use App\Http\Controllers\Admin\UserManagementController; 
use Illuminate\Support\Facades\Hash;
use App\Mail\ContactoMailable;
use App\Mail\PruebaCorreo;
use App\Mail\ResetPasswordCodeMail;
use App\Http\Controllers\Auth\RegisterController;
use Carbon\Carbon;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Company\CompanyUserController;

/*
|--------------------------------------------------------------------------
| RUTAS DE AUTENTICACIÓN (PÚBLICAS)
|--------------------------------------------------------------------------
*/

Route::post('/login', [LoginController::class, 'login']);

// ===============================
// REGISTRO
// ===============================
Route::post('/register', [RegisterController::class, 'register']);

/*
|--------------------------------------------------------------------------
| VERIFICACIÓN DE CORREO ELECTRÓNICO
|--------------------------------------------------------------------------
*/

// Envía código de verificación
Route::post('/send-verification-code', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    // Solo si no está ya verificado
    if ($user->email_verified_at) {
        return response()->json(['message' => 'El correo ya está verificado'], 422);
    }

    $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

    $user->verification_code = $code;
    $user->verification_code_expires_at = Carbon::now()->addMinutes(10);
    $user->save();

    // Usa el Mailable bonito en vez de raw
    Mail::to($user->email)->send(new VerifyEmailMail($user->name, $code));

    return response()->json(['message' => 'Código enviado al correo']);
});

// Verifica el código de verificación
Route::post('/verify-code', function (Request $request) {

    $request->validate([
        'email' => 'required|email',
        'code'  => 'required|string|size:6',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || $user->verification_code !== $request->code) {
        return response()->json(['message' => 'Código inválido'], 422);
    }

    if (now()->gt($user->verification_code_expires_at)) {
        return response()->json(['message' => 'Código expirado'], 422);
    }

    $user->update([
        'email_verified_at'          => now(),
        'verification_code'          => null,
        'verification_code_expires_at' => null,
    ]);

    return response()->json(['message' => 'Correo verificado correctamente']);
});

/*
|--------------------------------------------------------------------------
| RECUPERACIÓN DE CONTRASEÑA
|--------------------------------------------------------------------------
*/

// Envía código para restablecer contraseña
Route::post('/forgot-password', function (Request $request) {

    $validated = $request->validate([
        'email' => 'required|email'
    ]);

    $user = User::where('email', $validated['email'])->first();

    if (!$user) {
        return response()->json([
            'message' => 'Si el correo existe, se enviará un código.'
        ]);
    }

    $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

    $user->forceFill([
        'password_reset_code'     => $code,
        'password_reset_expires_at' => now()->addMinutes(10),
    ])->save();

    Mail::to($user->email)
        ->send(new ResetPasswordCodeMail($user->name, $code));

    return response()->json([
        'message' => 'Código enviado al correo.'
    ]);
});

// Verifica el código de restablecimiento
Route::post('/verify-reset-code', function (Request $request) {

    $validated = $request->validate([
        'email' => 'required|email',
        'code'  => 'required|string|size:6',
    ]);

    $user = User::where('email', $validated['email'])->first();

    if (!$user ||
        $user->password_reset_code !== $validated['code'] ||
        !$user->password_reset_expires_at ||
        now()->greaterThan($user->password_reset_expires_at)
    ) {
        return response()->json([
            'message' => 'Código inválido o expirado.'
        ], 422);
    }

    return response()->json([
        'message'    => 'Código válido.',
        'reset_token' => base64_encode($user->email . '|' . $user->password_reset_code)
    ]);
});

// Cambia la contraseña usando el código (flujo de recuperación)
Route::post('/change-password', function (Request $request) {

    $validated = $request->validate([
        'email'     => 'required|email',
        'code'      => 'required|string|size:6',
        'password'  => 'required|string|min:6|confirmed',
    ]);

    $user = User::where('email', $validated['email'])->first();

    if (!$user ||
        $user->password_reset_code !== $validated['code'] ||
        !$user->password_reset_expires_at ||
        now()->greaterThan($user->password_reset_expires_at)
    ) {
        return response()->json([
            'message' => 'Código inválido o expirado.'
        ], 422);
    }

    $user->forceFill([
        'password'                => Hash::make($validated['password']),
        'password_reset_code'     => null,
        'password_reset_expires_at' => null,
    ])->save();

    $user->tokens()->delete();

    return response()->json([
        'message' => 'Contraseña actualizada correctamente.'
    ]);
});

/*
|--------------------------------------------------------------------------
| RUTAS PROTEGIDAS (requieren auth:sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Sesión cerrada correctamente'
    ]);
});

Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return response()->json([
        'user' => $request->user()
    ]);
});

Route::middleware('auth:sanctum')->put('/profile', function (Request $request) {

    $user = $request->user();

    $validated = $request->validate([
        'name'  => 'sometimes|string|max:255',
        'phone' => 'sometimes|string|max:20',
    ]);

    $user->update($validated);

    return response()->json([
        'message' => 'Perfil actualizado correctamente.',
        'user'    => $user
    ]);
});

// Cambiar contraseña estando logueado (contraseña actual + nueva)
Route::middleware('auth:sanctum')->put('/change-password', function (Request $request) {

    $user = $request->user();

    $validated = $request->validate([
        'current_password' => 'required|string',
        'password'         => 'required|string|min:6|confirmed',
    ]);

    if (!Hash::check($validated['current_password'], $user->password)) {
        return response()->json([
            'message' => 'La contraseña actual es incorrecta.'
        ], 422);
    }

    $user->update([
        'password' => Hash::make($validated['password'])
    ]);

    // Opcional: cerrar todas las sesiones
    $user->tokens()->delete();

    return response()->json([
        'message' => 'Contraseña actualizada correctamente.'
    ]);
});

Route::middleware('auth:sanctum')->delete('/account', function (Request $request) {

    $user = $request->user();

    // Eliminar tokens primero
    $user->tokens()->delete();

    // Eliminar usuario
    $user->delete();

    return response()->json([
        'message' => 'Cuenta eliminada correctamente.'
    ]);
});

/*
|--------------------------------------------------------------------------
| RUTAS DE ADMINISTRACIÓN (Solo Super Admin)
|--------------------------------------------------------------------------
|
| Estas rutas están protegidas por:
|   • auth:sanctum     → usuario debe estar autenticado con Sanctum
|   • super.admin      → solo usuarios con rol de super administrador
|
| Prefijo: /admin
|
*/

Route::middleware(['auth:sanctum', 'super.admin'])
    ->prefix('admin')
    ->group(function () {

        /* ====================== GESTIÓN DE USUARIOS ====================== */

        // Listar todos los usuarios
        Route::get('/users', [UserManagementController::class, 'index']);

        // Mostrar un usuario específico
        Route::get('/users/{id}', [UserManagementController::class, 'show']);

        // Actualizar datos de un usuario
        Route::put('/users/{id}', [UserManagementController::class, 'update']);

        // Eliminar un usuario
        Route::delete('/users/{id}', [UserManagementController::class, 'destroy']);

        /* ====================== GESTIÓN DE EMPRESAS ====================== */

        // Crear una nueva empresa
        Route::post('/companies', [CompanyController::class, 'store']);

        // Listar todas las empresas
        Route::get('/companies', [CompanyController::class, 'index']);

    });

/*
|--------------------------------------------------------------------------
| RUTAS DE GESTIÓN DE USUARIOS POR EMPRESA
|--------------------------------------------------------------------------
|
| Estas rutas están protegidas por:
|   • auth:sanctum        → usuario debe estar autenticado
|   • company.active      → la empresa del usuario debe estar activa
|
| Prefijo: /company
|
*/

Route::middleware(['auth:sanctum', 'company.active'])
    ->prefix('company')
    ->group(function () {

        Route::post('/users', [CompanyUserController::class, 'store'])
            ->middleware([
                'owner.only',
                'plan.business',
                'check.user.limit'
            ]);

        Route::get('/users', [CompanyUserController::class, 'index']);
    });

/*
|--------------------------------------------------------------------------
| RUTAS DE PRUEBA / DESARROLLO
|--------------------------------------------------------------------------
*/

Route::get('/test-mail', function () {
    try {
        Mail::raw('Correo de prueba', function ($message) {
            $message->to('acevedobismar5@gmail.com')
                    ->subject('Test');
        });

        return 'Correo enviado';
    } catch (\Exception $e) {
        return $e->getMessage();
    }
});

Route::get('/enviar', function () {
    Mail::to('destino@gmail.com')->send(
        new PruebaCorreo(
            'Bismar',
            'Este correo fue enviado usando Gmail SMTP y Laravel.'
        )
    );

    return 'Correo enviado correctamente';
});

Route::post('/company/users', [CompanyUserController::class, 'store'])
    ->middleware(['auth:sanctum', 'check.user.limit']);
