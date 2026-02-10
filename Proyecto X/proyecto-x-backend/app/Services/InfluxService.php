<?php

namespace App\Services;

use InfluxDB2\Client;
use InfluxDB2\Point;
use InfluxDB2\Model\WritePrecision;

class InfluxService
{
    protected Client $client;

    public function __construct()
    {
        $this->client = new Client([
            "url" => config('influxdb.url'),
            "token" => config('influxdb.token'),
        ]);
    }

    public function write(string $bucket, array $data)
    {
        $writeApi = $this->client->createWriteApi();

        $point = Point::measurement($data['measurement'])
            ->addTag('user_id', $data['user_id'])
            ->addField('value', $data['value'])
            ->time(time(), WritePrecision::S);

        $writeApi->write($point, config('influxdb.org'), $bucket);
        $writeApi->close();
    }
}
