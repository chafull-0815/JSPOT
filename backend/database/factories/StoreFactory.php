<?php

namespace Database\Factories;

use App\Models\Area;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class StoreFactory extends Factory
{
    protected $model = Store::class;

    public function definition(): array
    {
        return [
            'owner_user_id' => User::factory()->shopOwner(), // 店舗オーナーを自動作成
            'area_id' => Area::factory(),

            'slug' => $this->faker->unique()->slug(),
            'name' => $this->faker->company().'（サンプル）',
            'catch_copy' => $this->faker->sentence(8),
            'description' => $this->faker->paragraph(4),

            'address' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'website_url' => $this->faker->optional()->url(),
            'instagram_url' => $this->faker->optional()->url(),

            'opening_hours' => '10:00〜22:00',
            'regular_holiday' => '不定休',

            'budget_min' => 800,
            'budget_max' => 3000,

            // バンコク近辺の適当な緯度経度（日本ならここ変える）
            'lat' => $this->faker->randomFloat(7, -90, 90),
            'lng' => $this->faker->randomFloat(7, -180, 180),

            'is_published' => true,
            'status' => 'published',

            'priority_score' => $this->faker->randomElement([1, 1, 3, 5]),

            'is_recommended' => $this->faker->boolean(20),

            'likes_count' => $this->faker->numberBetween(0, 200),
            'rating_avg' => $this->faker->randomFloat(2, 3, 5),
            'rating_count' => $this->faker->numberBetween(0, 50),
        ];
    }
}
