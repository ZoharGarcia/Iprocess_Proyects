<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureCompanyIsActive
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if (!$user || !$user->company || !$user->company->isActive()) {
            return response()->json([
                'error' => 'Cuenta suspendida'
            ], 403);
        }

        return $next($request);
    }
}

