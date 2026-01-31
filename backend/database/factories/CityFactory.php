<?php

namespace Database\Factories;

use App\Models\Prefecture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\City>
 */
class CityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'prefecture_id' => Prefecture::factory(),
            'name' => $this->faker->city(),
            'slug' => $this->faker->unique()->slug(1),
        ];
    }
}
