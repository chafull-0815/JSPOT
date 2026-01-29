<?php

namespace App\Filament\Resources\InfluencerProfiles\Pages;

use App\Filament\Resources\InfluencerProfiles\InfluencerProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

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
}
