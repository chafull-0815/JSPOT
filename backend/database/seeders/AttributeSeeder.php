<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attribute;
use Illuminate\Support\Str;

class AttributeSeeder extends Seeder
{
    public function run(): void
    {
        $names = ['個室あり','貸切可','喫煙可','駐車場あり','カード可','テイクアウト'];

        foreach ($names as $name) {
            $slug = Str::slug($name);
            $slug = $slug !== '' ? $slug : null; // ← フォールバック

            Attribute::firstOrCreate(
                ['name' => $name],
                ['slug' => $slug]
            );
        }
    }
}
