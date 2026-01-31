<?php

namespace Database\Seeders;

use App\Models\Store;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        // 下書き店舗 5件
        Store::factory()->count(5)->create();

        // 公開店舗 10件
        Store::factory()->count(10)->published()->create();

        // 非公開店舗 3件
        Store::factory()->count(3)->private()->create();
    }
}
