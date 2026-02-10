<?php

// Controlador para manejar el proceso de registro de nuevos usuarios, utilizando Laravel Sanctum para la autenticación basada en tokens.

namespace App\Http\Controllers\Auth; // Define el espacio de nombres del controlador, indicando que pertenece al módulo de autenticación (Auth) dentro de la aplicación.

use App\Http\Controllers\Controller; // Importa el controlador base de Laravel, que proporciona funcionalidades comunes para todos los controladores.
use App\Models\User; // Importa el modelo User, que representa a los usuarios en la base de datos y proporciona métodos para interactuar con la tabla de usuarios.
use Illuminate\Http\Request; // Importa la clase Request, que se utiliza para manejar las solicitudes HTTP entrantes y acceder a los datos enviados por el cliente.
use Illuminate\Support\Facades\Hash; // Importa la fachada Hash, que proporciona métodos para encriptar contraseñas de forma segura antes de almacenarlas en la base de datos.
use Illuminate\Support\Facades\Validator; // Importa la fachada Validator, que proporciona métodos para validar los datos de entrada según reglas definidas, asegurando que los datos sean correctos antes de procesarlos.
use Illuminate\Http\JsonResponse; // Importa la clase JsonResponse, que se utiliza para devolver respuestas JSON al cliente, facilitando la comunicación entre el backend y el frontend en aplicaciones API.

// Define el controlador RegisterController, que extiende el controlador base y contiene el método para manejar el registro de nuevos usuarios.

class RegisterController extends Controller
{
    public function register(Request $request): JsonResponse // Método para manejar el proceso de registro de nuevos usuarios. Recibe una instancia de Request que contiene los datos enviados por el cliente y devuelve una respuesta JSON.
    {

        $validator = Validator::make($request->all(), [
            'name'     => ['required', 'string', 'min:2', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos inválidos',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name'              => $request->name,
            'email'             => $request->email,
            'password'          => Hash::make($request->password),
            'email_verified_at' => null,
        ]);

        if (method_exists($user, 'createToken')) { // Verifica si el modelo User tiene el método createToken, lo que indica que Laravel Sanctum está configurado para la autenticación basada en tokens.
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Usuario creado correctamente',
                'token'   => $token,
                'user'    => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                ],
            ], 201);
        }

        return response()->json([
            'message' => 'Usuario creado correctamente',
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ],
        ], 201);
    }
}
