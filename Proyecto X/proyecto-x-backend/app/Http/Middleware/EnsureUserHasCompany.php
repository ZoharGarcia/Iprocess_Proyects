<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserHasCompany
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user || !$user->company_id) {
            return response()->json([
                'message' => 'Debe seleccionar un plan primero.'
            ], 403);
        }

        return $next($request);
    }
}
