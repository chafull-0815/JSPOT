<?php

namespace App\Filament\Resources\InfluencerProfiles\Pages;

use App\Filament\Resources\InfluencerProfiles\InfluencerProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListInfluencerProfiles extends ListRecords
{
    protected static string $resource = InfluencerProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
