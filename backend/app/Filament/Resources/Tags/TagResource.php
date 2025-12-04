<?php

namespace App\Filament\Resources\Tags;

use App\Filament\Resources\Tags\Pages\CreateTag;
use App\Filament\Resources\Tags\Pages\EditTag;
use App\Filament\Resources\Tags\Pages\ListTags;
use App\Models\Tag;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class TagResource extends Resource
{
    protected static ?string $model = Tag::class;

    // ナビゲーションのアイコン（シンプルに文字列で指定）
    protected static ?string $navigationIcon = 'heroicon-o-tag';

    // 一覧やタイトルに使うカラム
    protected static ?string $recordTitleAttribute = 'name';

    /**
     * フォーム定義（Filament v4: Schema ベース）
     */
    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('name')
                ->label('ラベル')
                ->required()
                ->maxLength(255),

            TextInput::make('slug')
                ->label('スラッグ')
                ->required()
                ->maxLength(255)
                ->unique('tags', 'slug', ignoreRecord: true),

            TextInput::make('sort_order')
                ->label('並び順')
                ->numeric()
                ->default(0),
        ]);
    }

    /**
     * 一覧テーブル定義
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),

                Tables\Columns\TextColumn::make('name')
                    ->label('ラベル')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('slug')
                    ->label('スラッグ')
                    ->searchable(),

                Tables\Columns\TextColumn::make('sort_order')
                    ->label('並び順')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('作成日時')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => ListTags::route('/'),
            'create' => CreateTag::route('/create'),
            'edit'   => EditTag::route('/{record}/edit'),
        ];
    }
}
