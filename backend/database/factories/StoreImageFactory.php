<?php

namespace Database\Factories;

use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreImage>
 */
class StoreImageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'store_id' => Store::factory(),
            'disk' => 'public',
            'image_path' => 'stores/images/' . $this->faker->uuid() . '.jpg',
            'alt_text' => $this->faker->sentence(),
            'is_main' => false,
            'sort_order' => 0,
        ];
    }

    public function main(): static
    {
        return $this->state(fn (array $attributes) => ['is_main' => true]);
    }
}
