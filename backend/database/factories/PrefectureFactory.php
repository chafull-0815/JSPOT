<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prefecture>
 */
class PrefectureFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->prefecture(),
            'slug' => $this->faker->unique()->slug(1),
        ];
    }
}
