<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StatusDefinition>
 */
class StatusDefinitionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'domain' => $this->faker->word(),
            'slug' => $this->faker->unique()->slug(1),
            'label_ja' => $this->faker->word(),
            'label_en' => $this->faker->word(),
            'sort_order' => 0,
        ];
    }
}
