<?php

namespace App\Filament\Resources\Stores\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class StoreForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('public_id')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('name_en'),
                TextInput::make('slug'),
                Textarea::make('catchphrase')
                    ->columnSpanFull(),
                TextInput::make('tel')
                    ->tel(),
                TextInput::make('store_group_id')
                    ->numeric(),
                TextInput::make('visibility_status_id')
                    ->numeric(),
                DateTimePicker::make('published_at'),
                TextInput::make('prefecture_id')
                    ->numeric(),
                TextInput::make('city_id')
                    ->numeric(),
                Textarea::make('address_details')
                    ->columnSpanFull(),
                TextInput::make('latitude')
                    ->numeric(),
                TextInput::make('longitude')
                    ->numeric(),
                Toggle::make('has_morning')
                    ->required(),
                TextInput::make('morning_min_price')
                    ->numeric()
                    ->prefix('$'),
                TextInput::make('morning_max_price')
                    ->numeric()
                    ->prefix('$'),
                Toggle::make('has_lunch')
                    ->required(),
                TextInput::make('lunch_min_price')
                    ->numeric()
                    ->prefix('$'),
                TextInput::make('lunch_max_price')
                    ->numeric()
                    ->prefix('$'),
                Toggle::make('has_dinner')
                    ->required(),
                TextInput::make('dinner_min_price')
                    ->numeric()
                    ->prefix('$'),
                TextInput::make('dinner_max_price')
                    ->numeric()
                    ->prefix('$'),
                TextInput::make('likes_count')
                    ->numeric()
                    ->default(0)
                    ->disabled()
                    ->label('ユーザーいいね数'),
                TextInput::make('admin_likes')
                    ->numeric()
                    ->default(0)
                    ->label('管理者いいね数（水増し用）'),
                TextInput::make('created_by_admin_id')
                    ->numeric(),
                TextInput::make('updated_by_admin_id')
                    ->numeric(),
            ]);
    }
}
