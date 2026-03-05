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
//use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\Company\CompanyUserController;
use App\Http\Controllers\Company\DeviceController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Models\Plan;
use App\Http\Controllers\SystemStatusController;
use App\Http\Controllers\Ingest\TelemetryIngestController;
use App\Http\Controllers\TelemetryQueryController;

/*
|--------------------------------------------------------------------------
| INGEST (Dispositivos)
|--------------------------------------------------------------------------
*/

Route::post('/ingest/telemetry', [TelemetryIngestController::class, 'store'])
    ->middleware(['device.key']);

/*
|--------------------------------------------------------------------------
| QUERY (Usuarios)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/telemetry/latest', [TelemetryQueryController::class, 'latest']);

    Route::get('/telemetry/readings', [TelemetryQueryController::class, 'readings']);

});
/*
|--------------------------------------------------------------------------
| RUTAS DE AUTENTICACIÓN (PÚBLICAS)
|--------------------------------------------------------------------------
*/

Route::post('/login', [LoginController::class, 'login']);

// ===============================
// REGISTRO Y VERIFICACIÓN DE CORREO
// ===============================
Route::post('/register', [RegisterController::class, 'register']);

// Verificar código de 6 dígitos
Route::post('/verify-email-code', [VerifyEmailController::class, 'verify']);

// Reenviar código de verificación (opcional pero recomendado)
Route::post('/resend-verification-code', [VerifyEmailController::class, 'resend']);
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
*/

Route::middleware(['auth:sanctum', 'super.admin'])
    ->prefix('admin')
    ->group(function () {

        /* ====================== GESTIÓN DE USUARIOS ====================== */

        Route::get('/users', [UserManagementController::class, 'index']);
        Route::get('/users/{id}', [UserManagementController::class, 'show']);
        Route::put('/users/{id}', [UserManagementController::class, 'update']);
        Route::delete('/users/{id}', [UserManagementController::class, 'destroy']);

        /* ====================== GESTIÓN DE EMPRESAS ====================== */

        Route::post('/companies', [CompanyController::class, 'store']);
        Route::get('/companies', [CompanyController::class, 'index']);
    });

/*
|--------------------------------------------------------------------------
| RUTAS DE EMPRESA
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')
    ->prefix('company')
    ->group(function () {

        Route::post('/assign-plan', [CompanyController::class, 'assignPlan'])
            ->middleware('no.company.assigned')
            ->name('company.assign-plan');

        Route::post('/activate-plan', [CompanyController::class, 'activatePlan'])
            ->name('company.activate-plan');

        Route::middleware(['company.active', 'sub.active'])->group(function () {

            Route::post('/users', [CompanyUserController::class, 'store'])
                ->middleware(['owner.only', 'plan.business', 'check.user.limit'])
                ->name('company.users.store');

            Route::get('/users', [CompanyUserController::class, 'index'])
                ->name('company.users.index');

            Route::post('/users/attach', [CompanyUserController::class, 'attachExisting'])
                ->middleware(['owner.only', 'plan.business', 'check.user.limit'])
                ->name('company.users.attach');
        });
    });

/*
|--------------------------------------------------------------------------
| RUTAS DE DISPOSITIVOS (requieren compañía asociada)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'has.company'])->group(function () {

    Route::get('/devices', [DeviceController::class, 'index']);
    Route::post('/devices', [DeviceController::class, 'store']);

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

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    $user = $request->user()->load('company');

    // Preferimos expiración desde company
    $expiresAtRaw = $user->company?->plan_expires_at ?? $user->plan_expires_at ?? null;
$currentPlanId = $user->company?->plan_id ?? null;
$currentPlanName = $user->company?->plan ?? null;
    $tz = config('app.timezone', 'America/Managua');

    // Parse seguro en TZ de la app (si ya viene como Carbon, Carbon lo maneja)
    $planExpiresAt = $expiresAtRaw ? Carbon::parse($expiresAtRaw)->timezone($tz) : null;

    // "Ahora" en TZ de la app
    $now = Carbon::now($tz);

    // Activo SOLO si no ha vencido por fecha+hora (estricto)
    // Si ahora >= expires_at -> vencido
    $isActive = $planExpiresAt ? $now->lt($planExpiresAt) : false;

    // Días restantes: calculado por días calendario (startOfDay), pero:
    // - si ya venció por hora exacta, devolvemos 0 para no confundir
    $daysLeft = null;
    if ($planExpiresAt) {
        if (! $isActive) {
            $daysLeft = 0;
        } else {
            $daysLeft = $now->copy()->startOfDay()
                ->diffInDays($planExpiresAt->copy()->startOfDay(), false);
        }
    }

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'role' => $user->role,

        // ✅ Plan para el menú
        // En ISO con TZ (evita corrimiento raro en frontend)
        'plan_expires_at' => $planExpiresAt?->toIso8601String(),
        'days_left' => $daysLeft,
        'is_subscription_active' => $isActive,

        // ✅ Debug útil (puedes quitar luego)
        'server_now' => $now->toIso8601String(),
        'app_timezone' => $tz,

        'company_id' => $user->company_id ?? null,
        'company' => $user->company,
          'current_plan_id' => $currentPlanId,
  'current_plan_name' => $currentPlanName,
    ]);
});

Route::get('/plans', function () {
    return Plan::select('id','name','type','price','max_users','max_devices')->get();
});


Route::middleware('auth:sanctum')->post('/telemetry', [\App\Http\Controllers\TelemetryController::class, 'store']);

Route::get('/system-status', [SystemStatusController::class, 'show']);