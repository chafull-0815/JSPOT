<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // まとめて配列で呼ぶ（named argument は使わない）
        $this->call([
            UserSeeder::class,
            AreaSeeder::class,
            CookingSeeder::class,
            AttributeSeeder::class,
            StoreSeeder::class,
        ]);
    }
}
