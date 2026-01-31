<?php

namespace Database\Seeders;

use App\Models\InfluencerProfile;
use App\Models\Store;
use App\Models\StoreMembership;
use App\Models\StoreProfile;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        // ========================================
        // サンプルユーザー作成（紐付け用）
        // ========================================

        // インフルエンサー用ユーザー
        $influencerUser1 = User::factory()->create([
            'email' => 'influencer1@example.com',
        ]);
        $influencerUser2 = User::factory()->create([
            'email' => 'influencer2@example.com',
        ]);

        // 店舗オーナー用ユーザー
        $storeOwner1 = User::factory()->create([
            'email' => 'store-owner1@example.com',
        ]);
        $storeOwner2 = User::factory()->create([
            'email' => 'store-owner2@example.com',
        ]);

        // 店舗スタッフ用ユーザー
        $storeStaff1 = User::factory()->create([
            'email' => 'store-staff1@example.com',
        ]);

        // ========================================
        // インフルエンサープロフィール作成（紐付け済み）
        // ========================================

        InfluencerProfile::factory()->create([
            'user_id' => $influencerUser1->id,
            'display_name' => 'テスト インフルエンサー1',
            'name_en' => 'test-influencer1',
            'bio' => 'これはテスト用のインフルエンサーです。ユーザーとの紐付けが正常に動作しているかの確認用。',
        ]);

        InfluencerProfile::factory()->create([
            'user_id' => $influencerUser2->id,
            'display_name' => 'テスト インフルエンサー2',
            'name_en' => 'test-influencer2',
            'bio' => '2人目のテストインフルエンサーです。',
        ]);

        // ========================================
        // 店舗作成（紐付け済み）
        // ========================================

        // 店舗プロフィールを作成
        $storeProfile1 = StoreProfile::create([
            'user_id' => $storeOwner1->id,
            'display_name' => 'オーナー1',
            'contact_name' => '山田 太郎',
            'contact_tel' => '03-1234-5678',
        ]);

        $storeProfile2 = StoreProfile::create([
            'user_id' => $storeOwner2->id,
            'display_name' => 'オーナー2',
            'contact_name' => '佐藤 花子',
            'contact_tel' => '03-8765-4321',
        ]);

        $storeProfileStaff = StoreProfile::create([
            'user_id' => $storeStaff1->id,
            'display_name' => 'スタッフ1',
        ]);

        // 紐付け済み店舗1（オーナー＋スタッフ）
        $store1 = Store::factory()->published()->create([
            'name' => 'テスト店舗1（紐付け済み）',
            'name_en' => 'test-store1',
        ]);

        StoreMembership::create([
            'store_id' => $store1->id,
            'store_profile_id' => $storeProfile1->id,
            'role' => 'owner',
            'status' => 'active',
        ]);

        StoreMembership::create([
            'store_id' => $store1->id,
            'store_profile_id' => $storeProfileStaff->id,
            'role' => 'staff',
            'status' => 'active',
        ]);

        // 紐付け済み店舗2（オーナーのみ）
        $store2 = Store::factory()->published()->create([
            'name' => 'テスト店舗2（紐付け済み）',
            'name_en' => 'test-store2',
        ]);

        StoreMembership::create([
            'store_id' => $store2->id,
            'store_profile_id' => $storeProfile2->id,
            'role' => 'owner',
            'status' => 'active',
        ]);

        // ========================================
        // 紐付けなしの店舗
        // ========================================

        // 下書き店舗 3件
        Store::factory()->count(3)->create();

        // 公開店舗 5件
        Store::factory()->count(5)->published()->create();

        // 非公開店舗 2件
        Store::factory()->count(2)->private()->create();
    }
}
