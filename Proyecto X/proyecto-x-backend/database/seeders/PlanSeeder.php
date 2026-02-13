<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        Plan::create([
            'name' => 'Individual Básico',
            'type' => 'individual',
            'price' => 9.99,
            'max_users' => 1,
            'max_devices' => 3,
        ]);

        Plan::create([
            'name' => 'Empresa Pro',
            'type' => 'business',
            'price' => 49.99,
            'max_users' => 10,
            'max_devices' => 50,
        ]);
    }
}
