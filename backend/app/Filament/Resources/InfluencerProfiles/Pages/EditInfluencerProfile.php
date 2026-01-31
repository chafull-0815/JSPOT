<?php

namespace App\Filament\Resources\InfluencerProfiles\Pages;

use App\Filament\Resources\InfluencerProfiles\InfluencerProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditInfluencerProfile extends EditRecord
{
    protected static string $resource = InfluencerProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        $this->moveImageToFinalDirectory();
    }

    protected function moveImageToFinalDirectory(): void
    {
        $record = $this->record;
        $disk = Storage::disk('public');

        if (!$record->profile_image || !$record->slug) {
            return;
        }

        $oldPath = $record->profile_image;

        // 既に正式ディレクトリにある場合はスキップ
        if (str_starts_with($oldPath, "influencers/{$record->slug}/")) {
            return;
        }

        // 古い画像があれば削除
        $existingDir = "influencers/{$record->slug}";
        if ($disk->exists($existingDir)) {
            foreach ($disk->files($existingDir) as $file) {
                if ($file !== $oldPath) {
                    $disk->delete($file);
                }
            }
        }

        $extension = pathinfo($oldPath, PATHINFO_EXTENSION);
        $newPath = "influencers/{$record->slug}/profile.{$extension}";

        if ($disk->exists($oldPath)) {
            if (!$disk->exists($existingDir)) {
                $disk->makeDirectory($existingDir);
            }
            $disk->move($oldPath, $newPath);
            $record->updateQuietly(['profile_image' => $newPath]);
        }
    }
}
