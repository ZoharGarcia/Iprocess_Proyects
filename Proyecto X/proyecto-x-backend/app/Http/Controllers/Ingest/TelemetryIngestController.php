<?php

namespace App\Http\Controllers\Ingest;

use App\Http\Controllers\Controller;
use App\Services\InfluxService;
use Illuminate\Http\Request;

class TelemetryIngestController extends Controller
{
    public function store(Request $request, InfluxService $influx)
    {
        /** @var \App\Models\Device $device */
        $device = $request->attributes->get('device');

        $data = $request->validate([
            'samples' => 'required|array|min:1|max:2000',
            'samples.*.sensor' => 'required|string|max:80',
            'samples.*.value' => 'required|numeric',
            'samples.*.unit' => 'nullable|string|max:12',
            'samples.*.quality' => 'nullable|integer|min:0|max:3',
            'samples.*.ts' => 'nullable|date',
        ]);

        $points = [];

        foreach ($data['samples'] as $s) {
            $tags = [
                'company_id' => (string) $device->company_id,
                'device_id'  => (string) $device->id,
                'sensor'     => (string) $s['sensor'],
                'area'       => (string) ($device->area ?? 'N/A'),
            ];

            if (!empty($s['unit'])) $tags['unit'] = (string) $s['unit'];

            $fields = [
                'value' => (float) $s['value'],
            ];
            if (isset($s['quality'])) $fields['quality'] = (int) $s['quality'];

            $points[] = [
                'measurement' => 'telemetry',
                'tags' => $tags,
                'fields' => $fields,
                'time' => !empty($s['ts']) ? strtotime($s['ts']) : null, // seconds
            ];
        }

        $influx->writeMany($points);

        // Actualizar estado del device en Postgres
        $device->forceFill([
            'last_seen_at' => now(),
            'status' => 'ok',
        ])->save();

        return response()->json([
            'ok' => true,
            'written' => count($points),
        ], 201);
    }
}