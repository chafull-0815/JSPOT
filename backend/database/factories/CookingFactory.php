<?php

namespace Database\Factories;

use App\Models\Cooking;
use Illuminate\Database\Eloquent\Factories\Factory;

class CookingFactory extends Factory
{
    protected $model = Cooking::class;

    public function definition(): array
    {
        return [
            'slug' => $this->faker->unique()->slug(),
            'name' => $this->faker->word(),  // ここはあとで手で差し替えてもOK
            'sort_order' => 0,
        ];
    }
}
