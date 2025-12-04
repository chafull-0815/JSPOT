<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 明示的に各ロール 1 人ずつ
        User::factory()->superAdmin()->create([
            'name' => 'システムスーパー管理者',
            'email' => 'info@chafull.jp',
        ]);

        User::factory()->admin()->create([
            'name' => '運営管理者A',
            'email' => 'admin@example.com',
        ]);

        User::factory()->shopOwner()->create([
            'name' => '店舗オーナーA',
            'email' => 'shop-owner@example.com',
        ]);

        User::factory()->influencer()->create([
            'name' => 'インフルエンサーA',
            'email' => 'influencer@example.com',
        ]);

        User::factory()->create([
            'name' => '一般ユーザーA',
            'email' => 'user@example.com',
        ]);

        // 追加で普通のユーザーを何人か
        User::factory(10)->create();
    }
}
