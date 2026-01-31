<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            StatusDefinitionSeeder::class,
            MasterSeeder::class,
            DemoSeeder::class,
        ]);
    }
}
