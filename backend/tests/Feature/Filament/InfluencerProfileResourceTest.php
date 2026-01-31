<?php

namespace Tests\Feature\Filament;

use App\Filament\Resources\InfluencerProfiles\InfluencerProfileResource;
use App\Filament\Resources\InfluencerProfiles\Pages\CreateInfluencerProfile;
use App\Filament\Resources\InfluencerProfiles\Pages\EditInfluencerProfile;
use App\Models\Admin;
use App\Models\InfluencerProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Tests\TestCase;

class InfluencerProfileResourceTest extends TestCase
{
    use RefreshDatabase;

    protected Admin $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = Admin::factory()->superAdmin()->create();
        $this->actingAs($this->admin, 'admin');

        Storage::fake('public');
    }

    public function test_can_render_index_page(): void
    {
        $this->get(InfluencerProfileResource::getUrl('index'))
            ->assertSuccessful();
    }

    public function test_can_render_create_page(): void
    {
        $this->get(InfluencerProfileResource::getUrl('create'))
            ->assertSuccessful();
    }

    public function test_can_render_edit_page(): void
    {
        $user = User::factory()->create();
        $influencer = InfluencerProfile::factory()->create(['user_id' => $user->id]);

        $this->get(InfluencerProfileResource::getUrl('edit', ['record' => $influencer]))
            ->assertSuccessful();
    }

    public function test_can_create_influencer_profile(): void
    {
        $user = User::factory()->create();

        Livewire::test(CreateInfluencerProfile::class)
            ->fillForm([
                'user_id' => $user->id,
                'display_name' => 'テストインフルエンサー',
                'name_en' => 'test-influencer',
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('influencer_profiles', [
            'user_id' => $user->id,
            'display_name' => 'テストインフルエンサー',
        ]);
    }

    public function test_can_update_influencer_profile(): void
    {
        $user = User::factory()->create();
        $influencer = InfluencerProfile::factory()->create([
            'user_id' => $user->id,
            'display_name' => '元の名前',
            'name_en' => 'original-name',
        ]);

        Livewire::test(EditInfluencerProfile::class, [
            'record' => $influencer->id,
        ])
            ->fillForm([
                'display_name' => '新しい名前',
                'name_en' => 'new-name',
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('influencer_profiles', [
            'id' => $influencer->id,
            'display_name' => '新しい名前',
        ]);
    }

    public function test_can_upload_profile_image(): void
    {
        $user = User::factory()->create();

        $file = UploadedFile::fake()->image('profile.jpg', 200, 200);

        Livewire::test(CreateInfluencerProfile::class)
            ->fillForm([
                'user_id' => $user->id,
                'display_name' => 'テストインフルエンサー',
                'name_en' => 'test-influencer',
                'profile_image' => $file,
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $influencer = InfluencerProfile::where('user_id', $user->id)->first();
        $this->assertNotNull($influencer->profile_image);
    }
}
