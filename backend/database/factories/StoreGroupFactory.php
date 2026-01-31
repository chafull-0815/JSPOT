<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreGroup>
 */
class StoreGroupFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company() . 'グループ',
            'slug' => $this->faker->unique()->slug(2),
        ];
    }
}
