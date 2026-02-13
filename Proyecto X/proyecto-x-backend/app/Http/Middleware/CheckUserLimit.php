<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class CheckUserLimit
{
    public function handle(Request $request, Closure $next)
    {
        $company = Auth::user()->company;

        // 1️⃣ Verificar empresa activa
        if ($company->status !== 'active' && $company->status !== 'trial') {
            return response()->json([
                'error' => 'Cuenta suspendida'
            ], 403);
        }

        // 2️⃣ Verificar límite de usuarios
        $currentUsers = User::where('company_id', $company->id)->count();

        if ($currentUsers >= $company->plan->max_users) {
            return response()->json([
                'error' => 'Límite de usuarios alcanzado para su plan'
            ], 403);
        }

        return $next($request);
    }
}
