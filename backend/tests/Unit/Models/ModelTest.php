<?php

namespace Tests\Unit\Models;

use App\Models\Admin;
use App\Models\Category;
use App\Models\City;
use App\Models\InfluencerChangeRequest;
use App\Models\InfluencerProfile;
use App\Models\Line;
use App\Models\PaymentMethod;
use App\Models\Prefecture;
use App\Models\Scene;
use App\Models\Station;
use App\Models\StatusDefinition;
use App\Models\Store;
use App\Models\StoreChangeRequest;
use App\Models\StoreGroup;
use App\Models\StoreImage;
use App\Models\StoreIntroduction;
use App\Models\StoreMembership;
use App\Models\StoreOpeningHour;
use App\Models\StoreProfile;
use App\Models\StoreStation;
use App\Models\Tag;
use App\Models\User;
use App\Models\UserIdentity;
use App\Models\UserLike;
use App\Models\UserProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_be_created(): void
    {
        $user = User::factory()->create();
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }

    public function test_admin_can_be_created(): void
    {
        $admin = Admin::factory()->create();
        $this->assertDatabaseHas('admins', ['id' => $admin->id]);
    }

    public function test_admin_roles(): void
    {
        $superAdmin = Admin::factory()->superAdmin()->create();
        $admin = Admin::factory()->admin()->create();
        $editor = Admin::factory()->create();

        $this->assertEquals('super_admin', $superAdmin->role);
        $this->assertEquals('admin', $admin->role);
        $this->assertEquals('editor', $editor->role);
    }

    public function test_prefecture_has_cities(): void
    {
        $prefecture = Prefecture::factory()->create();
        $city = City::factory()->create(['prefecture_id' => $prefecture->id]);

        $this->assertTrue($prefecture->cities->contains($city));
        $this->assertEquals($prefecture->id, $city->prefecture->id);
    }

    public function test_line_has_stations(): void
    {
        $line = Line::factory()->create();
        $station = Station::factory()->create(['line_id' => $line->id]);

        $this->assertTrue($line->stations->contains($station));
        $this->assertEquals($line->id, $station->line->id);
    }

    public function test_store_can_be_created_with_factory(): void
    {
        // マスターデータを準備
        StatusDefinition::factory()->create([
            'domain' => 'visibility',
            'slug' => 'draft',
        ]);
        City::factory()->create();

        $store = Store::factory()->create();
        $this->assertDatabaseHas('stores', ['id' => $store->id]);
        $this->assertNotNull($store->public_id);
    }

    public function test_store_published_state(): void
    {
        StatusDefinition::factory()->create([
            'domain' => 'visibility',
            'slug' => 'draft',
        ]);
        $publishedStatus = StatusDefinition::factory()->create([
            'domain' => 'visibility',
            'slug' => 'published',
        ]);
        City::factory()->create();

        $store = Store::factory()->published()->create();
        $this->assertEquals($publishedStatus->id, $store->visibility_status_id);
        $this->assertNotNull($store->published_at);
    }

    public function test_store_relationships(): void
    {
        $prefecture = Prefecture::factory()->create();
        $city = City::factory()->create(['prefecture_id' => $prefecture->id]);
        $draftStatus = StatusDefinition::factory()->create([
            'domain' => 'visibility',
            'slug' => 'draft',
        ]);
        $storeGroup = StoreGroup::factory()->create();

        $store = Store::factory()->create([
            'prefecture_id' => $prefecture->id,
            'city_id' => $city->id,
            'visibility_status_id' => $draftStatus->id,
            'store_group_id' => $storeGroup->id,
        ]);

        $this->assertEquals($prefecture->id, $store->prefecture->id);
        $this->assertEquals($city->id, $store->city->id);
        $this->assertEquals($draftStatus->id, $store->visibilityStatus->id);
        $this->assertEquals($storeGroup->id, $store->storeGroup->id);
    }

    public function test_store_images(): void
    {
        StatusDefinition::factory()->create(['domain' => 'visibility', 'slug' => 'draft']);
        City::factory()->create();

        $store = Store::factory()->create();
        $mainImage = StoreImage::factory()->main()->create(['store_id' => $store->id]);
        $subImage = StoreImage::factory()->create(['store_id' => $store->id]);

        $this->assertEquals(2, $store->images->count());
        $this->assertEquals($mainImage->id, $store->mainImage->id);
    }

    public function test_store_total_likes(): void
    {
        StatusDefinition::factory()->create(['domain' => 'visibility', 'slug' => 'draft']);
        City::factory()->create();

        $store = Store::factory()->create([
            'likes_count' => 10,
            'admin_likes' => 5,
        ]);

        $this->assertEquals(15, $store->total_likes);
    }

    public function test_user_like_relationship(): void
    {
        StatusDefinition::factory()->create(['domain' => 'visibility', 'slug' => 'draft']);
        City::factory()->create();

        $user = User::factory()->create();
        $store = Store::factory()->create();

        $like = UserLike::create([
            'user_id' => $user->id,
            'store_id' => $store->id,
        ]);

        $this->assertEquals($user->id, $like->user->id);
        $this->assertEquals($store->id, $like->store->id);
        $this->assertTrue($store->userLikes->contains($like));
    }

    public function test_influencer_profile(): void
    {
        $user = User::factory()->create();
        $influencer = InfluencerProfile::factory()->create(['user_id' => $user->id]);

        $this->assertEquals($user->id, $influencer->user->id);
        $this->assertNotNull($influencer->public_id);
        $this->assertNotNull($influencer->slug);
    }

    public function test_user_profile(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(['user_id' => $user->id]);

        $this->assertEquals($user->id, $profile->user->id);
    }

    public function test_store_profile(): void
    {
        $user = User::factory()->create();
        $profile = StoreProfile::factory()->create(['user_id' => $user->id]);

        $this->assertEquals($user->id, $profile->user->id);
    }

    public function test_store_membership(): void
    {
        StatusDefinition::factory()->create(['domain' => 'visibility', 'slug' => 'draft']);
        City::factory()->create();

        $store = Store::factory()->create();
        $storeProfile = StoreProfile::factory()->create();
        $membership = StoreMembership::factory()->create([
            'store_id' => $store->id,
            'store_profile_id' => $storeProfile->id,
        ]);

        $this->assertEquals($store->id, $membership->store->id);
        $this->assertEquals($storeProfile->id, $membership->storeProfile->id);
    }

    public function test_store_station(): void
    {
        StatusDefinition::factory()->create(['domain' => 'visibility', 'slug' => 'draft']);
        City::factory()->create();

        $store = Store::factory()->create();
        $station = Station::factory()->create();
        $storeStation = StoreStation::factory()->create([
            'store_id' => $store->id,
            'station_id' => $station->id,
        ]);

        $this->assertEquals($store->id, $storeStation->store->id);
        $this->assertEquals($station->id, $storeStation->station->id);
    }

    public function test_store_opening_hour(): void
    {
        StatusDefinition::factory()->create(['domain' => 'visibility', 'slug' => 'draft']);
        City::factory()->create();

        $store = Store::factory()->create();
        $hour = StoreOpeningHour::factory()->create(['store_id' => $store->id]);

        $this->assertEquals($store->id, $hour->store->id);
    }

    public function test_store_introduction(): void
    {
        StatusDefinition::factory()->create(['domain' => 'visibility', 'slug' => 'draft']);
        City::factory()->create();

        $store = Store::factory()->create();
        $intro = StoreIntroduction::factory()->create(['store_id' => $store->id]);

        $this->assertEquals($store->id, $intro->store->id);
    }

    public function test_user_identity(): void
    {
        $user = User::factory()->create();
        $identity = UserIdentity::factory()->create(['user_id' => $user->id]);

        $this->assertEquals($user->id, $identity->user->id);
    }

    public function test_store_change_request(): void
    {
        StatusDefinition::factory()->create(['domain' => 'visibility', 'slug' => 'draft']);
        City::factory()->create();

        $store = Store::factory()->create();
        $storeProfile = StoreProfile::factory()->create();
        $request = StoreChangeRequest::factory()->create([
            'store_id' => $store->id,
            'store_profile_id' => $storeProfile->id,
        ]);

        $this->assertEquals($store->id, $request->store->id);
        $this->assertEquals($storeProfile->id, $request->storeProfile->id);
        $this->assertIsArray($request->payload);
    }

    public function test_influencer_change_request(): void
    {
        $influencer = InfluencerProfile::factory()->create();
        $request = InfluencerChangeRequest::factory()->create([
            'influencer_profile_id' => $influencer->id,
        ]);

        $this->assertEquals($influencer->id, $request->influencerProfile->id);
        $this->assertIsArray($request->payload);
    }

    public function test_master_data_factories(): void
    {
        $category = Category::factory()->create();
        $tag = Tag::factory()->create();
        $scene = Scene::factory()->create();
        $paymentMethod = PaymentMethod::factory()->create();
        $statusDef = StatusDefinition::factory()->create();

        $this->assertDatabaseHas('categories', ['id' => $category->id]);
        $this->assertDatabaseHas('tags', ['id' => $tag->id]);
        $this->assertDatabaseHas('scenes', ['id' => $scene->id]);
        $this->assertDatabaseHas('payment_methods', ['id' => $paymentMethod->id]);
        $this->assertDatabaseHas('status_definitions', ['id' => $statusDef->id]);
    }
}
