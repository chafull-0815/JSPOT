<?php

namespace Tests\Feature\Filament;

use App\Filament\Resources\Stores\StoreResource;
use App\Filament\Resources\Stores\Pages\CreateStore;
use App\Filament\Resources\Stores\Pages\EditStore;
use App\Models\Admin;
use App\Models\City;
use App\Models\StatusDefinition;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Tests\TestCase;

class StoreResourceTest extends TestCase
{
    use RefreshDatabase;

    protected Admin $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = Admin::factory()->superAdmin()->create();
        $this->actingAs($this->admin, 'admin');

        StatusDefinition::factory()->create([
            'domain' => 'visibility',
            'slug' => 'draft',
            'label_ja' => '下書き',
        ]);
        City::factory()->create();

        Storage::fake('public');
    }

    public function test_can_render_index_page(): void
    {
        $this->get(StoreResource::getUrl('index'))
            ->assertSuccessful();
    }

    public function test_can_render_create_page(): void
    {
        $this->get(StoreResource::getUrl('create'))
            ->assertSuccessful();
    }

    public function test_can_render_edit_page(): void
    {
        $store = Store::factory()->create();

        $this->get(StoreResource::getUrl('edit', ['record' => $store]))
            ->assertSuccessful();
    }

    public function test_can_create_store(): void
    {
        $file = UploadedFile::fake()->image('main.jpg', 200, 200);

        Livewire::test(CreateStore::class)
            ->fillForm([
                'name' => 'テスト店舗',
                'name_en' => 'test-store',
                'main_image_path' => $file,
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('stores', [
            'name' => 'テスト店舗',
        ]);
    }

    public function test_can_update_store(): void
    {
        $store = Store::factory()->create([
            'name' => '元の店舗名',
            'name_en' => 'original-store',
        ]);

        $file = UploadedFile::fake()->image('main.jpg', 200, 200);

        Livewire::test(EditStore::class, [
            'record' => $store->id,
        ])
            ->fillForm([
                'name' => '新しい店舗名',
                'name_en' => 'new-store',
                'main_image_path' => $file,
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('stores', [
            'id' => $store->id,
            'name' => '新しい店舗名',
        ]);
    }

    public function test_can_add_store_member(): void
    {
        $user = User::factory()->create(['email' => 'owner@example.com']);
        $store = Store::factory()->create();

        $file = UploadedFile::fake()->image('main.jpg', 200, 200);

        Livewire::test(EditStore::class, [
            'record' => $store->id,
        ])
            ->fillForm([
                'name' => $store->name,
                'name_en' => $store->name_en,
                'main_image_path' => $file,
                'store_members' => [
                    [
                        'user_id' => $user->id,
                        'role' => 'owner',
                    ],
                ],
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('store_memberships', [
            'store_id' => $store->id,
            'role' => 'owner',
        ]);
    }
}
