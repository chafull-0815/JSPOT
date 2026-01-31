<?php

namespace Tests\Feature\Api;

use App\Models\InfluencerProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InfluencerApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_can_get_influencer_list(): void
    {
        InfluencerProfile::factory()->create([
            'display_name' => 'テストインフルエンサー1',
        ]);
        InfluencerProfile::factory()->create([
            'display_name' => 'テストインフルエンサー2',
        ]);

        $response = $this->getJson('/api/v1/influencers');

        $response->assertOk()
            ->assertJsonCount(2, 'data');
    }

    public function test_can_get_influencer_detail(): void
    {
        $influencer = InfluencerProfile::factory()->create([
            'display_name' => 'テストインフルエンサー',
            'name_en' => 'test-influencer',
            'bio' => 'テスト自己紹介',
            'youtube_url' => 'https://youtube.com/test',
        ]);

        $response = $this->getJson('/api/v1/influencers/' . $influencer->slug);

        $response->assertOk()
            ->assertJsonPath('data.display_name', 'テストインフルエンサー')
            ->assertJsonPath('data.bio', 'テスト自己紹介')
            ->assertJsonPath('data.social_links.youtube', 'https://youtube.com/test')
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'slug',
                    'display_name',
                    'name_en',
                    'bio',
                    'profile_image_url',
                    'social_links' => [
                        'youtube',
                        'tiktok',
                        'facebook',
                        'instagram',
                    ],
                ],
            ]);
    }

    public function test_influencer_detail_returns_404_for_unknown_slug(): void
    {
        $response = $this->getJson('/api/v1/influencers/unknown-slug');

        $response->assertNotFound();
    }

    public function test_can_search_influencers_by_keyword(): void
    {
        InfluencerProfile::factory()->create([
            'display_name' => '料理系インフルエンサー',
        ]);

        InfluencerProfile::factory()->create([
            'display_name' => '旅行系インフルエンサー',
        ]);

        $response = $this->getJson('/api/v1/influencers?keyword=料理');

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.display_name', '料理系インフルエンサー');
    }
}
