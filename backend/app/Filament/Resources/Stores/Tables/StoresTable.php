<?php

namespace App\Filament\Resources\Stores\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class StoresTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('public_id')
                    ->searchable(),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('name_en')
                    ->searchable(),
                TextColumn::make('slug')
                    ->searchable(),
                TextColumn::make('tel')
                    ->searchable(),
                TextColumn::make('store_group_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('visibility_status_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('prefecture_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('city_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('latitude')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('longitude')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('has_morning')
                    ->boolean(),
                TextColumn::make('morning_min_price')
                    ->money()
                    ->sortable(),
                TextColumn::make('morning_max_price')
                    ->money()
                    ->sortable(),
                IconColumn::make('has_lunch')
                    ->boolean(),
                TextColumn::make('lunch_min_price')
                    ->money()
                    ->sortable(),
                TextColumn::make('lunch_max_price')
                    ->money()
                    ->sortable(),
                IconColumn::make('has_dinner')
                    ->boolean(),
                TextColumn::make('dinner_min_price')
                    ->money()
                    ->sortable(),
                TextColumn::make('dinner_max_price')
                    ->money()
                    ->sortable(),
                TextColumn::make('likes_count')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_by_admin_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('updated_by_admin_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ]);
    }
}
