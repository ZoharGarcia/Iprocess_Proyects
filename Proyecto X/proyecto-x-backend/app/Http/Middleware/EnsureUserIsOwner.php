<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsOwner
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if (!$user || !$user->isOwner()) {
            return response()->json([
                'error' => 'No autorizado'
            ], 403);
        }

        return $next($request);
    }
}
