<?php

namespace Database\Factories;

use App\Models\InfluencerProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InfluencerChangeRequest>
 */
class InfluencerChangeRequestFactory extends Factory
{
    public function definition(): array
    {
        return [
            'influencer_profile_id' => InfluencerProfile::factory(),
            'payload' => ['display_name' => $this->faker->name()],
            'message' => $this->faker->sentence(),
        ];
    }
}
