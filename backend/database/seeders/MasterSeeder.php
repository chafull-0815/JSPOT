<?php

namespace Database\Seeders;

use App\Models\Prefecture;
use App\Models\City;
use Illuminate\Database\Seeder;

class MasterSeeder extends Seeder
{
    public function run(): void
    {
        $prefectures = [
            ['name' => '東京都', 'slug' => 'tokyo', 'cities' => [
                ['name' => '渋谷区', 'slug' => 'shibuya'],
                ['name' => '新宿区', 'slug' => 'shinjuku'],
                ['name' => '港区', 'slug' => 'minato'],
                ['name' => '中央区', 'slug' => 'chuo'],
                ['name' => '千代田区', 'slug' => 'chiyoda'],
            ]],
            ['name' => '大阪府', 'slug' => 'osaka', 'cities' => [
                ['name' => '大阪市北区', 'slug' => 'osaka-kita'],
                ['name' => '大阪市中央区', 'slug' => 'osaka-chuo'],
                ['name' => '大阪市西区', 'slug' => 'osaka-nishi'],
            ]],
            ['name' => '神奈川県', 'slug' => 'kanagawa', 'cities' => [
                ['name' => '横浜市中区', 'slug' => 'yokohama-naka'],
                ['name' => '横浜市西区', 'slug' => 'yokohama-nishi'],
                ['name' => '川崎市川崎区', 'slug' => 'kawasaki'],
            ]],
            ['name' => '愛知県', 'slug' => 'aichi', 'cities' => [
                ['name' => '名古屋市中区', 'slug' => 'nagoya-naka'],
                ['name' => '名古屋市中村区', 'slug' => 'nagoya-nakamura'],
            ]],
            ['name' => '福岡県', 'slug' => 'fukuoka', 'cities' => [
                ['name' => '福岡市中央区', 'slug' => 'fukuoka-chuo'],
                ['name' => '福岡市博多区', 'slug' => 'fukuoka-hakata'],
            ]],
        ];

        foreach ($prefectures as $prefData) {
            $cities = $prefData['cities'];
            unset($prefData['cities']);

            $prefecture = Prefecture::updateOrCreate(
                ['slug' => $prefData['slug']],
                $prefData
            );

            foreach ($cities as $cityData) {
                City::updateOrCreate(
                    ['prefecture_id' => $prefecture->id, 'slug' => $cityData['slug']],
                    array_merge($cityData, ['prefecture_id' => $prefecture->id])
                );
            }
        }
    }
}
