<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureBusinessPlan
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if (!$user || !$user->company || !$user->company->isBusiness()) {
            return response()->json([
                'error' => 'Tu plan no permite múltiples usuarios'
            ], 403);
        }

        return $next($request);
    }
}
