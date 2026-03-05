<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\InfluxService;

class TelemetryQueryController extends Controller
{
    public function readings(Request $request, InfluxService $influx)
    {
        $request->validate([
            'company_id' => 'required|integer',
            'device_id'  => 'required',
            'range'      => 'nullable|string'
        ]);

        $companyId = (int) $request->query('company_id');
        $deviceId  = $request->query('device_id');
        $range     = $request->query('range', '-1h'); // default última hora

        /*
        Ejemplo range:
        -15m
        -1h
        -24h
        -7d
        */

        $flux = '
        from(bucket:"industrial")
        |> range(start: '.$range.')
        |> filter(fn:(r) => r._measurement == "telemetry")
        |> filter(fn:(r) => r.company_id == "'.$companyId.'")
        |> filter(fn:(r) => r.device_id == "'.$deviceId.'")
        |> sort(columns: ["_time"])
        ';

        $rows = $influx->query($flux);

        /*
        Transformamos para frontend
        */

        $result = [];

        foreach ($rows as $row) {

            $sensor = $row['_field'] ?? $row['sensor'] ?? 'unknown';

            $result[$sensor][] = [
                'time'  => $row['_time'],
                'value' => $row['_value']
            ];
        }

        return response()->json([
            'device_id'  => $deviceId,
            'company_id' => $companyId,
            'range'      => $range,
            'series'     => $result
        ]);
    }
    public function latest(Request $request, InfluxService $influx)
{
    $request->validate([
        'company_id' => 'required|integer',
        'device_id'  => 'required'
    ]);

    $companyId = (int) $request->query('company_id');
    $deviceId  = $request->query('device_id');

    $flux = '
    from(bucket:"industrial")
    |> range(start: -1h)
    |> filter(fn:(r) => r._measurement == "telemetry")
    |> filter(fn:(r) => r.company_id == "'.$companyId.'")
    |> filter(fn:(r) => r.device_id == "'.$deviceId.'")
    |> last()
    ';

    $rows = $influx->query($flux);

    $result = [];
    foreach ($rows as $row) {
        $sensor = $row['_field'] ?? $row['sensor'] ?? 'unknown';
        $result[$sensor] = [
            'time' => $row['_time'],
            'value' => $row['_value']
        ];
    }

    return response()->json([
        'device_id'  => $deviceId,
        'company_id' => $companyId,
        'latest'     => $result
    ]);
}
}