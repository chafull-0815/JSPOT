<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Area;

class AreaSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['name' => '金沢市','slug' => 'kanazawa'],
            ['name' => '野々市市','slug' => 'nonoichi'],
            ['name' => '白山市','slug' => 'hakusan'],
        ] as $a) {
            Area::firstOrCreate(['slug' => $a['slug']], $a);
        }
    }
}
