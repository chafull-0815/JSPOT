<?php

namespace App\Filament\Resources\Stores;

use App\Filament\Resources\Stores\Pages;
use App\Filament\Resources\Stores\Schemas\StoreForm;
use App\Models\Store;

use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

// PHPのBackedEnum型はグローバルにあるので use は不要だけど、
// 子クラス側のプロパティ型は親と同じにしないといけない。

class StoreResource extends Resource
{
    protected static ?string $model = Store::class;

    // これ、Filament\Resource 側の宣言と同じ型じゃないとエラーになるのでこのままでOK
    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-building-storefront';

    protected static ?string $navigationLabel = '店舗';
    protected static ?string $pluralLabel = '店舗';
    protected static ?string $modelLabel = '店舗';

    public static function getNavigationGroup(): ?string
    {
        return 'お店管理';
    }

    /**
     * CREATE / EDIT フォーム
     */
    public static function form(Schema $schema): Schema
    {
        // ここで StoreForm 側の定義を適用
        return StoreForm::configure($schema);
    }

    /**
     * 一覧テーブル
     * /admin/stores のリストページのカラムここで定義しとく
     */
    public static function table(Table $table): Table
    {
        return $table
            // 一覧で N+1 を避ける（パフォーマンス）
            ->modifyQueryUsing(fn ($query) => $query->with(['area', 'cookings', 'attributes']))
            ->columns([
                TextColumn::make('name')
                    ->label('店舗名')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('area.name')
                    ->label('エリア')
                    ->sortable()
                    ->toggleable(), // 表示ON/OFF可

                // いいね数（新規）
                TextColumn::make('likes_count')
                    ->label('いいね')
                    ->badge()
                    ->sortable()
                    ->alignEnd(),

                // 料理ジャンル（多対多を想定）※単一なら 'cooking.name'
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

                TextColumn::make('price_daytime')
                    ->label('昼料金')
                    ->toggleable(),

                TextColumn::make('price_night')
                    ->label('夜料金')
                    ->toggleable(),

                TextColumn::make('updated_at')
                    ->label('更新日')
                    ->dateTime('Y-m-d H:i')
                    ->sortable()
                    ->toggleable(),
            ])
            // 便利フィルタ（必要なら）
            ->filters([
                // \Filament\Tables\Filters\SelectFilter::make('area_id')->relationship('area', 'name'),
            ])
            ->defaultSort('id', 'desc');
    }


    /**
     * /admin/stores 以下のページ
     */
    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListStores::route('/'),
            'create' => Pages\CreateStore::route('/create'),
            'edit'   => Pages\EditStore::route('/{record}/edit'),
        ];
    }
}
