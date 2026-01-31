<?php

namespace Database\Factories;

use App\Models\Station;
use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreStation>
 */
class StoreStationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'store_id' => Store::factory(),
            'station_id' => Station::factory(),
            'walking_minutes' => $this->faker->numberBetween(1, 15),
        ];
    }
}
