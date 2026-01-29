<?php

namespace App\Filament\Resources\InfluencerProfiles\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class InfluencerProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('public_id')
                    ->required(),
                TextInput::make('name_en'),
                TextInput::make('slug'),
                TextInput::make('youtube_url')
                    ->url(),
                TextInput::make('tiktok_url')
                    ->url(),
                TextInput::make('facebook_url')
                    ->url(),
                TextInput::make('instagram_url')
                    ->url(),
                Textarea::make('bio')
                    ->columnSpanFull(),
                TextInput::make('created_by_admin_id')
                    ->required()
                    ->numeric(),
            ]);
    }
}
