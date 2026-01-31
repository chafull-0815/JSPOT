<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InfluencerProfile>
 */
class InfluencerProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'public_id' => Str::ulid(),
            'display_name' => $this->faker->name(),
            'slug' => $this->faker->unique()->slug(2),
            'bio' => $this->faker->paragraph(),
        ];
    }
}
