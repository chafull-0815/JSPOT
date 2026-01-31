<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreProfile>
 */
class StoreProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'display_name' => $this->faker->company(),
            'contact_name' => $this->faker->name(),
            'contact_tel' => $this->faker->phoneNumber(),
        ];
    }
}
