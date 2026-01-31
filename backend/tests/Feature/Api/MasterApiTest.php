<?php

namespace Tests\Feature\Api;

use App\Models\Category;
use App\Models\City;
use App\Models\Line;
use App\Models\PaymentMethod;
use App\Models\Prefecture;
use App\Models\Scene;
use App\Models\Station;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MasterApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_master_data(): void
    {
        // テストデータを作成
        $prefecture = Prefecture::factory()->create(['name' => '東京都']);
        City::factory()->create(['prefecture_id' => $prefecture->id, 'name' => '渋谷区']);

        Category::factory()->create(['name' => 'ラーメン']);
        Tag::factory()->create(['name' => '人気']);
        Scene::factory()->create(['name' => 'デート']);
        PaymentMethod::factory()->create(['name' => 'クレジットカード']);

        $line = Line::factory()->create(['name' => '山手線']);
        Station::factory()->create(['line_id' => $line->id, 'name' => '渋谷']);

        $response = $this->getJson('/api/v1/masters');

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'prefectures',
                    'cities',
                    'categories',
                    'tags',
                    'scenes',
                    'payment_methods',
                    'lines',
                    'stations',
                ],
            ]);

        $data = $response->json('data');

        $this->assertCount(1, $data['prefectures']);
        $this->assertEquals('東京都', $data['prefectures'][0]['name']);

        $this->assertCount(1, $data['categories']);
        $this->assertEquals('ラーメン', $data['categories'][0]['name']);
    }

    public function test_cities_are_grouped_by_prefecture(): void
    {
        $tokyo = Prefecture::factory()->create(['name' => '東京都']);
        $osaka = Prefecture::factory()->create(['name' => '大阪府']);

        City::factory()->create(['prefecture_id' => $tokyo->id, 'name' => '渋谷区']);
        City::factory()->create(['prefecture_id' => $tokyo->id, 'name' => '新宿区']);
        City::factory()->create(['prefecture_id' => $osaka->id, 'name' => '大阪市']);

        $response = $this->getJson('/api/v1/masters');

        $response->assertOk();

        $cities = $response->json('data.cities');

        $this->assertArrayHasKey($tokyo->id, $cities);
        $this->assertCount(2, $cities[$tokyo->id]);

        $this->assertArrayHasKey($osaka->id, $cities);
        $this->assertCount(1, $cities[$osaka->id]);
    }
}
