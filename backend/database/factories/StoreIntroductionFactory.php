<?php

namespace Database\Factories;

use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreIntroduction>
 */
class StoreIntroductionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'store_id' => Store::factory(),
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraph(),
            'sort_order' => 0,
        ];
    }
}
