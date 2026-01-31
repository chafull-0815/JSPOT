<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\StatusDefinition;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    public function definition(): array
    {
        $city = City::inRandomOrder()->first();
        $draftStatus = StatusDefinition::where('domain', 'visibility')->where('slug', 'draft')->first();

        $hasMorning = $this->faker->boolean(30);
        $hasLunch = $this->faker->boolean(70);
        $hasDinner = $this->faker->boolean(80);

        return [
            'name' => $this->faker->company() . ' ' . $this->faker->randomElement(['本店', '支店', '店']),
            'name_en' => $this->faker->slug(2),
            'catchphrase' => $this->faker->realText(50),
            'tel' => $this->faker->phoneNumber(),
            'visibility_status_id' => $draftStatus?->id,
            'prefecture_id' => $city?->prefecture_id,
            'city_id' => $city?->id,
            'address_details' => $this->faker->streetAddress(),
            'latitude' => $this->faker->latitude(35.6, 35.8),
            'longitude' => $this->faker->longitude(139.6, 139.8),
            'has_morning' => $hasMorning,
            'morning_min_price' => $hasMorning ? $this->faker->numberBetween(3, 10) * 100 : null,
            'morning_max_price' => $hasMorning ? $this->faker->numberBetween(10, 20) * 100 : null,
            'has_lunch' => $hasLunch,
            'lunch_min_price' => $hasLunch ? $this->faker->numberBetween(8, 15) * 100 : null,
            'lunch_max_price' => $hasLunch ? $this->faker->numberBetween(15, 30) * 100 : null,
            'has_dinner' => $hasDinner,
            'dinner_min_price' => $hasDinner ? $this->faker->numberBetween(20, 50) * 100 : null,
            'dinner_max_price' => $hasDinner ? $this->faker->numberBetween(50, 100) * 100 : null,
            'likes_count' => 0,
            'admin_likes' => 0,
        ];
    }

    public function published(): static
    {
        return $this->state(function (array $attributes) {
            $publishedStatus = StatusDefinition::where('domain', 'visibility')->where('slug', 'published')->first();
            return [
                'visibility_status_id' => $publishedStatus?->id,
                'published_at' => now(),
            ];
        });
    }

    public function private(): static
    {
        return $this->state(function (array $attributes) {
            $privateStatus = StatusDefinition::where('domain', 'visibility')->where('slug', 'private')->first();
            return [
                'visibility_status_id' => $privateStatus?->id,
            ];
        });
    }
}
