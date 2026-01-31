<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Line>
 */
class LineFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word() . '線',
            'slug' => $this->faker->unique()->slug(1),
        ];
    }
}
