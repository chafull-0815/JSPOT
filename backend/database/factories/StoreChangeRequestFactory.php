<?php

namespace Database\Factories;

use App\Models\Store;
use App\Models\StoreProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreChangeRequest>
 */
class StoreChangeRequestFactory extends Factory
{
    public function definition(): array
    {
        return [
            'store_id' => Store::factory(),
            'store_profile_id' => StoreProfile::factory(),
            'payload' => ['name' => $this->faker->company()],
            'message' => $this->faker->sentence(),
        ];
    }
}
