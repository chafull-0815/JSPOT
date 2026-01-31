<?php

namespace Tests\Feature\Api;

use App\Models\City;
use App\Models\Prefecture;
use App\Models\StatusDefinition;
use App\Models\Store;
use App\Models\StoreImage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class StoreApiTest extends TestCase
{
    use RefreshDatabase;

    protected StatusDefinition $publishedStatus;
    protected StatusDefinition $draftStatus;
    protected Prefecture $prefecture;
    protected City $city;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');

        $this->publishedStatus = StatusDefinition::factory()->create([
            'domain' => 'visibility',
            'slug' => 'published',
            'label_ja' => '公開',
        ]);

        $this->draftStatus = StatusDefinition::factory()->create([
            'domain' => 'visibility',
            'slug' => 'draft',
            'label_ja' => '下書き',
        ]);

        $this->prefecture = Prefecture::factory()->create();
        $this->city = City::factory()->create(['prefecture_id' => $this->prefecture->id]);
    }

    public function test_can_get_store_list(): void
    {
        // 公開店舗を作成
        $publishedStore = Store::factory()->create([
            'name' => '公開店舗',
            'visibility_status_id' => $this->publishedStatus->id,
            'published_at' => now(),
            'prefecture_id' => $this->prefecture->id,
            'city_id' => $this->city->id,
        ]);

        // 下書き店舗を作成（表示されないはず）
        Store::factory()->create([
            'name' => '下書き店舗',
            'visibility_status_id' => $this->draftStatus->id,
            'published_at' => null,
        ]);

        $response = $this->getJson('/api/v1/stores');

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', '公開店舗');
    }

    public function test_can_get_store_detail(): void
    {
        $store = Store::factory()->create([
            'name' => 'テスト店舗',
            'name_en' => 'test-store',
            'visibility_status_id' => $this->publishedStatus->id,
            'published_at' => now(),
        ]);

        // メイン画像を作成
        StoreImage::factory()->create([
            'store_id' => $store->id,
            'is_main' => true,
            'image_path' => 'stores/test-store/main.jpg',
        ]);

        $response = $this->getJson('/api/v1/stores/' . $store->slug);

        $response->assertOk()
            ->assertJsonPath('data.name', 'テスト店舗')
            ->assertJsonPath('data.slug', 'test-store')
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'slug',
                    'name',
                    'images' => [
                        'main',
                        'sub',
                    ],
                    'location',
                    'price',
                    'total_likes',
                ],
            ]);
    }

    public function test_store_detail_returns_404_for_draft(): void
    {
        $store = Store::factory()->create([
            'visibility_status_id' => $this->draftStatus->id,
            'published_at' => null,
        ]);

        $response = $this->getJson('/api/v1/stores/' . $store->slug);

        $response->assertNotFound();
    }

    public function test_can_filter_stores_by_prefecture(): void
    {
        $otherPrefecture = Prefecture::factory()->create();

        Store::factory()->create([
            'name' => '東京店舗',
            'visibility_status_id' => $this->publishedStatus->id,
            'published_at' => now(),
            'prefecture_id' => $this->prefecture->id,
        ]);

        Store::factory()->create([
            'name' => '大阪店舗',
            'visibility_status_id' => $this->publishedStatus->id,
            'published_at' => now(),
            'prefecture_id' => $otherPrefecture->id,
        ]);

        $response = $this->getJson('/api/v1/stores?prefecture_id=' . $this->prefecture->id);

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', '東京店舗');
    }

    public function test_can_search_stores_by_keyword(): void
    {
        Store::factory()->create([
            'name' => 'ラーメン太郎',
            'visibility_status_id' => $this->publishedStatus->id,
            'published_at' => now(),
        ]);

        Store::factory()->create([
            'name' => '寿司次郎',
            'visibility_status_id' => $this->publishedStatus->id,
            'published_at' => now(),
        ]);

        $response = $this->getJson('/api/v1/stores?keyword=ラーメン');

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'ラーメン太郎');
    }
}
