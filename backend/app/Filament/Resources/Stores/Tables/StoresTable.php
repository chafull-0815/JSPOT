<?php

namespace App\Filament\Resources\Stores\Tables;

use Filament\Tables\Columns\TextColumn;

class StoresTable
{
    public static function getColumns(): array
    {
        return [
            TextColumn::make('name')
                ->label('店舗名')
                ->searchable()
                ->sortable(),

            TextColumn::make('area.name')
                ->label('エリア')
                ->sortable()
                ->toggleable(),

            // いいね数
            TextColumn::make('likes_count')
                ->label('いいね')
                ->sortable()
                ->alignEnd(),

            // ▼ ここは“単一ジャンル”か“複数ジャンル”で分岐
            // 単一ジャンル（Store に cooking_id がある）の場合：
            // TextColumn::make('cooking.name')->label('料理ジャンル')->badge()->toggleable(),

            // 複数ジャンル（belongsToMany）の場合：
            TextColumn::make('cookings.name')
                ->label('料理ジャンル')
                ->badge()
                ->separator(', ')
                ->toggleable(),

            TextColumn::make('attributes.name')
                ->label('属性')
                ->badge()
                ->color('warning')
                ->separator(', ')
                ->toggleable(),

            TextColumn::make('opening_hours')
                ->label('営業時間')
                ->limit(20)
                ->toggleable(),

            TextColumn::make('price_daytime')
                ->label('昼料金')
                ->toggleable(),

            TextColumn::make('price_night')
                ->label('夜料金')
                ->toggleable(),

            TextColumn::make('updated_at')
                ->label('更新日')
                ->dateTime('Y-m-d H:i'),
        ];
    }

    public static function getFilters(): array
    {
        return [
            // 例：
            // \Filament\Tables\Filters\SelectFilter::make('area_id')->relationship('area', 'name'),
        ];
    }
}
