<?php

namespace App\Filament\Resources\Stores\Pages;

use App\Filament\Resources\Stores\StoreResource;
use App\Models\StoreImage;
use App\Models\StoreProfile;
use App\Models\StoreMembership;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Storage;

class CreateStore extends CreateRecord
{
    protected static string $resource = StoreResource::class;

    protected function afterCreate(): void
    {
        $this->syncImages();
        $this->syncMembers();
    }

    protected function syncImages(): void
    {
        $store = $this->record;

        // メイン画像
        $mainImagePath = $this->extractFilePath($this->data['main_image_path'] ?? null);
        if ($mainImagePath) {
            $newPath = $this->moveToFinalDirectory($mainImagePath, $store->slug, 'main');
            StoreImage::create([
                'store_id' => $store->id,
                'image_path' => $newPath,
                'is_main' => true,
                'sort_order' => 0,
            ]);
        }

        // サブ画像（20枠）
        for ($i = 1; $i <= 20; $i++) {
            $path = $this->extractFilePath($this->data["sub_image_{$i}"] ?? null);
            if ($path) {
                $newPath = $this->moveToFinalDirectory($path, $store->slug, "sub_{$i}");
                StoreImage::create([
                    'store_id' => $store->id,
                    'image_path' => $newPath,
                    'is_main' => false,
                    'sort_order' => $i,
                ]);
            }
        }
    }

    protected function extractFilePath(mixed $value): ?string
    {
        if (is_string($value)) {
            return $value;
        }
        if (is_array($value)) {
            return $value[0] ?? null;
        }
        return null;
    }

    protected function moveToFinalDirectory(string $path, string $slug, string $prefix): string
    {
        $disk = Storage::disk('public');
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        $newPath = "stores/{$slug}/{$prefix}.{$extension}";

        if ($disk->exists($path)) {
            $dir = dirname($newPath);
            if (!$disk->exists($dir)) {
                $disk->makeDirectory($dir);
            }
            $disk->move($path, $newPath);
        }

        return $newPath;
    }

    protected function syncMembers(): void
    {
        $store = $this->record;
        $members = $this->data['store_members'] ?? [];

        foreach ($members as $member) {
            if (empty($member['user_id'])) {
                continue;
            }

            $storeProfile = StoreProfile::firstOrCreate(
                ['user_id' => $member['user_id']],
                ['display_name' => null]
            );

            StoreMembership::create([
                'store_id' => $store->id,
                'store_profile_id' => $storeProfile->id,
                'role' => $member['role'] ?? 'staff',
                'status' => 'active',
            ]);
        }
    }
}
