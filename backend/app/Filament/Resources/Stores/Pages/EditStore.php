<?php

namespace App\Filament\Resources\Stores\Pages;

use App\Filament\Resources\Stores\StoreResource;
use App\Models\StoreImage;
use App\Models\StoreProfile;
use App\Models\StoreMembership;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditStore extends EditRecord
{
    protected static string $resource = StoreResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $store = $this->record;

        // メイン画像を読み込み
        $mainImage = $store->images()->where('is_main', true)->first();
        $data['main_image_path'] = $mainImage?->image_path;

        // サブ画像を読み込み（20枠分）
        $subImages = $store->images()->where('is_main', false)->orderBy('sort_order')->get()->keyBy('sort_order');
        for ($i = 1; $i <= 20; $i++) {
            $data["sub_image_{$i}"] = $subImages->get($i)?->image_path;
        }

        return $data;
    }

    protected function afterSave(): void
    {
        // DEBUG: データ構造を確認
        \Log::info('EditStore afterSave', [
            'main_image_path' => $this->data['main_image_path'] ?? 'NOT SET',
            'sub_image_1' => $this->data['sub_image_1'] ?? 'NOT SET',
            'data_keys' => array_keys($this->data),
        ]);

        $this->syncImages();
        $this->syncMembers();
    }

    protected function syncImages(): void
    {
        $store = $this->record;
        $disk = Storage::disk('public');

        // メイン画像の処理
        $mainImagePath = $this->extractFilePath($this->data['main_image_path'] ?? null);
        $existingMain = $store->images()->where('is_main', true)->first();

        if ($mainImagePath) {
            $finalPath = $this->moveToFinalDirectory($mainImagePath, $store->slug, 'main');

            if ($existingMain) {
                if ($existingMain->image_path !== $finalPath) {
                    $disk->delete($existingMain->image_path);
                    $existingMain->update(['image_path' => $finalPath]);
                }
            } else {
                StoreImage::create([
                    'store_id' => $store->id,
                    'image_path' => $finalPath,
                    'is_main' => true,
                    'sort_order' => 0,
                ]);
            }
        } elseif ($existingMain) {
            $disk->delete($existingMain->image_path);
            $existingMain->delete();
        }

        // サブ画像の処理
        $existingSubs = $store->images()->where('is_main', false)->orderBy('sort_order')->get()->keyBy('sort_order');

        for ($i = 1; $i <= 20; $i++) {
            $path = $this->extractFilePath($this->data["sub_image_{$i}"] ?? null);
            $existing = $existingSubs->get($i);

            if ($path) {
                $finalPath = $this->moveToFinalDirectory($path, $store->slug, "sub_{$i}");

                if ($existing) {
                    if ($existing->image_path !== $finalPath) {
                        $disk->delete($existing->image_path);
                        $existing->update(['image_path' => $finalPath]);
                    }
                } else {
                    StoreImage::create([
                        'store_id' => $store->id,
                        'image_path' => $finalPath,
                        'is_main' => false,
                        'sort_order' => $i,
                    ]);
                }
            } elseif ($existing) {
                $disk->delete($existing->image_path);
                $existing->delete();
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

        // 既に正式ディレクトリにある場合はそのまま
        if (str_starts_with($path, "stores/{$slug}/")) {
            return $path;
        }

        $extension = pathinfo($path, PATHINFO_EXTENSION);
        $newPath = "stores/{$slug}/{$prefix}.{$extension}";

        if ($disk->exists($path)) {
            // ディレクトリ作成
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

        $keepIds = [];

        foreach ($members as $member) {
            if (empty($member['user_id'])) {
                continue;
            }

            $storeProfile = StoreProfile::firstOrCreate(
                ['user_id' => $member['user_id']],
                ['display_name' => null]
            );

            $membership = StoreMembership::updateOrCreate(
                [
                    'store_id' => $store->id,
                    'store_profile_id' => $storeProfile->id,
                ],
                [
                    'role' => $member['role'] ?? 'staff',
                    'status' => 'active',
                ]
            );

            $keepIds[] = $membership->id;
        }

        $store->memberships()->whereNotIn('id', $keepIds)->delete();
    }
}
