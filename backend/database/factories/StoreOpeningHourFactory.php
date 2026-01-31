<?php

namespace Database\Factories;

use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreOpeningHour>
 */
class StoreOpeningHourFactory extends Factory
{
    public function definition(): array
    {
        return [
            'store_id' => Store::factory(),
            'day_of_week' => $this->faker->numberBetween(0, 6),
            'open_time' => '09:00',
            'close_time' => '21:00',
            'is_closed' => false,
        ];
    }
}
