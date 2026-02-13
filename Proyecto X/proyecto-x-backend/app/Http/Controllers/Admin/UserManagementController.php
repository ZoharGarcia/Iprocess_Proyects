<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserManagementController extends Controller
{
    /**
     * GET /api/admin/users
     * Lista usuarios con filtros, búsqueda y paginación
     */
    public function index(Request $request)
    {
        $query = User::query();

        // 🔎 Búsqueda por nombre o email
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
            });
        }

        // 🎭 Filtro por rol
        if ($request->role) {
            $query->where('role', $request->role);
        }

        // 📄 Paginación
        $users = $query->paginate($request->per_page ?? 10);

        return response()->json($users);
    }

    /**
     * GET /api/admin/users/{id}
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json($user);
    }

    /**
     * PUT /api/admin/users/{id}
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'role' => 'sometimes|in:user,admin,super_admin',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Usuario actualizado correctamente.',
            'user' => $user
        ]);
    }

    /**
     * DELETE /api/admin/users/{id}
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->role === 'super_admin') {
            return response()->json([
                'message' => 'No puedes eliminar un super admin.'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente.'
        ]);
    }
}
