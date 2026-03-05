<?php

namespace App\Http\Middleware;

use App\Models\DeviceApiKey;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DeviceKeyMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $auth = (string) $request->header('Authorization', '');

        // Formato esperado: Authorization: DeviceKey prefix.plain
        if (!str_starts_with($auth, 'DeviceKey ')) {
            return response()->json(['message' => 'Missing DeviceKey token'], 401);
        }

        $token = trim(substr($auth, strlen('DeviceKey ')));

        // token: prefix.plain
        if (!str_contains($token, '.')) {
            return response()->json(['message' => 'Invalid DeviceKey token format'], 401);
        }

        [$prefix, $plain] = explode('.', $token, 2);

        $row = DeviceApiKey::where('prefix', $prefix)
            ->whereNull('revoked_at')
            ->first();

        if (!$row) {
            return response()->json(['message' => 'Invalid DeviceKey token'], 401);
        }

        if (!hash_equals($row->hash, hash('sha256', $plain))) {
            return response()->json(['message' => 'Invalid DeviceKey token'], 401);
        }

        // Adjuntamos el device al request
        $device = $row->device()->first();

        if (!$device) {
            return response()->json(['message' => 'Device not found'], 401);
        }

        $request->attributes->set('device', $device);

        return $next($request);
    }
}