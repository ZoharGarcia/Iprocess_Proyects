<?php

// Archivo de rutas para la API, donde se definen las rutas relacionadas con la autenticación de usuarios, incluyendo el inicio de sesión y el registro. Estas rutas apuntan a los métodos correspondientes en los controladores de autenticación.

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

// Define las rutas para el inicio de sesión y el registro de usuarios, utilizando los métodos 'login' y 'register' de los controladores LoginController y RegisterController respectivamente. Estas rutas aceptan solicitudes POST, lo que es común para operaciones que modifican datos o requieren envío de información sensible como credenciales.

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);