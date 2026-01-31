<?php

namespace App\Filament\Resources\InfluencerProfiles\Pages;

use App\Filament\Resources\InfluencerProfiles\InfluencerProfileResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Storage;

class CreateInfluencerProfile extends CreateRecord
{
    protected static string $resource = InfluencerProfileResource::class;

    protected function afterCreate(): void
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

        $extension = pathinfo($oldPath, PATHINFO_EXTENSION);
        $newPath = "influencers/{$record->slug}/profile.{$extension}";

        if ($disk->exists($oldPath)) {
            $dir = dirname($newPath);
            if (!$disk->exists($dir)) {
                $disk->makeDirectory($dir);
            }
            $disk->move($oldPath, $newPath);
            $record->updateQuietly(['profile_image' => $newPath]);
        }
    }
}
