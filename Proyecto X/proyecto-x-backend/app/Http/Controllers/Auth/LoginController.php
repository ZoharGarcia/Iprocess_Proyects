<?php

// Controlador para manejar el proceso de inicio de sesión de los usuarios, utilizando Laravel Sanctum para la autenticación basada en tokens.


namespace App\Http\Controllers\Auth; // Define el espacio de nombres del controlador, indicando que pertenece al módulo de autenticación (Auth) dentro de la aplicación.

// Importaciones necesarias para el controlador, incluyendo el controlador base, la clase Request para manejar las solicitudes HTTP y la fachada Auth para la autenticación.

use App\Http\Controllers\Controller; // Importa el controlador base de Laravel, que proporciona funcionalidades comunes para todos los controladores.
use Illuminate\Http\Request; // Importa la clase Request, que se utiliza para manejar las solicitudes HTTP entrantes y acceder a los datos enviados por el cliente.
use Illuminate\Support\Facades\Auth; // Importa la fachada Auth, que proporciona métodos para manejar la autenticación de usuarios, como verificar credenciales y gestionar sesiones.

// Define el controlador LoginController, que extiende el controlador base y contiene el método para manejar el inicio de sesión de los usuarios.

class LoginController extends Controller 
{
    public function login(Request $request) // Método para manejar el proceso de inicio de sesión. Recibe una instancia de Request que contiene los datos enviados por el cliente.
    {
        $request->validate([ // Valida los datos de entrada, asegurándose de que el campo 'email' sea obligatorio y tenga un formato de correo electrónico válido, y que el campo 'password' sea obligatorio y sea una cadena de texto.
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

// Intenta autenticar al usuario utilizando las credenciales proporcionadas (email y password). Si la autenticación falla, devuelve una respuesta JSON con un mensaje de error y un código de estado 401 (No autorizado).
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        $user = $request->user(); // Si la autenticación es exitosa, obtiene el usuario autenticado a través del método user() del objeto Request.

        // Elimina tokens previos si quieres (opcional)
        $user->tokens()->delete();

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ],
        ]);
    }
}
