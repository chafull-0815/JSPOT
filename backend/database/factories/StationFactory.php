<?php

namespace Database\Factories;

use App\Models\Line;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Station>
 */
class StationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'line_id' => Line::factory(),
            'name' => $this->faker->unique()->word() . '駅',
            'slug' => $this->faker->unique()->slug(1),
        ];
    }
}
