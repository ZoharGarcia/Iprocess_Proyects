<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::middleware('auth:sanctum')->get('/email/verify', function () {
    return response()->json(['message' => 'Email verificado']);
})->middleware('verified');
Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return response()->json(['ok' => true]);
});
