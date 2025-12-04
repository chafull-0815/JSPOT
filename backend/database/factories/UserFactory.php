<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt('password'), // 開発用
            'role' => 'user',                 // デフォルトは一般ユーザー
            'status' => 'active',
            'last_login_at' => null,
            'remember_token' => Str::random(10),
        ];
    }

    // 役割ごとの state 便利関数
    public function superAdmin(): static
    {
        return $this->state(fn () => [
            'role' => 'super_admin',
        ]);
    }

    public function admin(): static
    {
        return $this->state(fn () => [
            'role' => 'admin',
        ]);
    }

    public function shopOwner(): static
    {
        return $this->state(fn () => [
            'role' => 'shop_owner',
        ]);
    }

    public function influencer(): static
    {
        return $this->state(fn () => [
            'role' => 'influencer',
        ]);
    }
}
