<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cooking;
use Illuminate\Support\Str;

class CookingSeeder extends Seeder
{
    public function run(): void
    {
        $names = ['和食','寿司','焼肉','イタリアン','中華','フレンチ','カフェ','居酒屋'];

        foreach ($names as $name) {
            $slug = Str::slug($name);
            $slug = $slug !== '' ? $slug : null; // ← フォールバック

            Cooking::firstOrCreate(
                ['name' => $name],
                ['slug' => $slug]
            );
        }
    }
}
