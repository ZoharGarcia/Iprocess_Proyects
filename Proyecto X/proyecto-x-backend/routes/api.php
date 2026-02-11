<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailMail;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Auth\RegisterController;
use Carbon\Carbon;

use App\Http\Controllers\Auth\LoginController;

Route::get('/test-mail', function () {
    Mail::raw('SMTP OK Proyecto X', function ($m) {
        $m->to('acevedobismar5@gmail.com')
          ->subject('PRUEBA SMTP');
    });

    return 'correo enviado';
});

Route::post('/login', [LoginController::class, 'login']);

// ===============================
// REGISTRO
// ===============================
/*
Route::post('/register', function (Request $request) {
    $request->validate([
        'name'     => 'required|string|min:2',
        'email'    => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
    ]);

    $user = User::create([
        'name'              => $request->name,
        'email'             => $request->email,
        'password'          => Hash::make($request->password),
        'email_verified_at' => null,
    ]);

    return response()->json([
        'message' => 'Usuario registrado correctamente'
    ], 201);
});
*/
Route::post('/register', [RegisterController::class, 'register']);
// ===============================
// ENVIAR CÓDIGO
// ===============================
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


// ===============================
// VERIFICAR CÓDIGO
// ===============================
Route::post('/verify-code', function (Request $request) {

    $request->validate([
        'email' => 'required|email',
        'code' => 'required|string|size:6',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || $user->verification_code !== $request->code) {
        return response()->json(['message' => 'Código inválido'], 422);
    }

    if (now()->gt($user->verification_code_expires_at)) {
        return response()->json(['message' => 'Código expirado'], 422);
    }

    $user->update([
        'email_verified_at' => now(),
        'verification_code' => null,
        'verification_code_expires_at' => null,
    ]);

    return response()->json(['message' => 'Correo verificado correctamente']);
});
