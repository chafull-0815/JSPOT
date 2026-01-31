<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserIdentity>
 */
class UserIdentityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'provider' => $this->faker->randomElement(['google', 'line', 'apple']),
            'provider_user_id' => $this->faker->unique()->uuid(),
            'provider_email' => $this->faker->safeEmail(),
        ];
    }
}
