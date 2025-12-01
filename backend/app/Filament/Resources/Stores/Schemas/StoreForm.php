<?php

namespace App\Filament\Resources\Stores\Schemas;

use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;

class StoreForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([

                // ───────── 基本情報
                Section::make('基本情報')
                    ->columns(12)
                    ->schema([

                        TextInput::make('name')
                            ->label('店舗名')
                            ->required()
                            ->placeholder('例：新田リフォーム 金沢店')
                            ->columnSpan(['default' => 12, 'md' => 10]),

                        TextInput::make('catch_copy')
                            ->label('一言キャッチ')
                            ->placeholder('例：地域密着・丁寧施工')
                            ->columnSpan(['default' => 12, 'md' => 10]),

                        TextInput::make('phone_number')
                            ->label('電話番号')
                            ->tel()
                            ->placeholder('076-XXXX-XXXX / 090-XXXX-XXXX')
                            ->helperText('半角で入力してください')
                            ->columnSpan(['default' => 12, 'md' => 3]),

                        TextInput::make('official_url')
                            ->label('公式HP (URL)')
                            ->url()
                            ->placeholder('https://example.com')
                            ->columnSpan(['default' => 12, 'md' => 4]),

                        TextInput::make('instagram_url')
                            ->label('Instagram URL')
                            ->url()
                            ->placeholder('https://instagram.com/xxxx')
                            ->columnSpan(['default' => 12, 'md' => 4]),

                        TextInput::make('likes_count')
                            ->label('いいね')
                            ->numeric()           // 数値入力
                            ->minValue(0)         // 0未満禁止
                            ->step(1)             // 整数刻み
                            ->default(0),         // 既定値

                        // 住所（TextInput → Textarea に変更）
                        Textarea::make('address')
                            ->label('住所')
                            ->rows(3)  // ← 3行
                            ->placeholder("石川県金沢市…\n建物名・部屋番号まで")
                            ->columnSpan(['default' => 12, 'md' => 6]),

                        Textarea::make('opening_hours')
                            ->label('営業時間')
                            ->rows(3)
                            ->placeholder("例：11:00〜22:00（L.O.21:30）\n定休日：水曜")
                            ->columnSpan(['default' => 12, 'md' => 6]),

                        TextInput::make('lat')
                            ->label('緯度 (lat)')
                            ->numeric()
                            ->rules(['between:-90,90'])
                            ->step('0.000001')
                            ->placeholder('例: 36.561234')
                            ->columnSpan(['default' => 12, 'md' => 2]),

                        TextInput::make('lng')
                            ->label('経度 (lng)')
                            ->numeric()
                            ->rules(['between:-180,180'])
                            ->step('0.000001')
                            ->placeholder('例: 136.656789')
                            ->columnSpan(['default' => 12, 'md' => 2]),

                    ])
                    ->maxWidth('7xl'),

                // ───────── タクソノミー（3カラム）
                Section::make('タクソノミー')
                    ->columns(12)
                    ->schema([
                        Select::make('area_id')
                            ->label('エリア')
                            ->relationship('area', 'name')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->createOptionForm([
                                TextInput::make('name')->label('エリア名')->required(),
                                TextInput::make('slug')->label('スラッグ')->required(),
                            ])
                            ->columnSpan(['default' => 12, 'md' => 4]),

                        // 料理ジャンル（固定高さ + スクロール）
                        // 料理ジャンル（固定高さ + 内側だけスクロール）
                        CheckboxList::make('cookings')
                            ->label('料理ジャンル')
                            ->relationship('cookings', 'name')
                            ->searchable()
                            ->bulkToggleable()
                            ->columnSpan(['default' => 12, 'md' => 4]),

                        CheckboxList::make('attributes')
                            ->label('店舗の属性')
                            ->relationship('attributes', 'name')
                            ->searchable()
                            ->bulkToggleable()
                            ->columnSpan(['default' => 12, 'md' => 4]),

                    ])
                    ->maxWidth('7xl'),

                // ───────── 画像（メイン=5 / サブ=7）
                Section::make('画像')
                    ->columns(12)
                    ->schema([
                        // メイン（左）
                        FileUpload::make('main_image')
                            ->label('メイン画像')
                            ->disk('public')
                            ->image()
                            ->directory('stores/main')
                            ->imagePreviewHeight('260')
                            ->panelAspectRatio('16:9')
                            ->openable()
                            ->downloadable()
                            ->visibility('public')
                            ->deleteUploadedFileUsing(fn ($p) => $p ? Storage::disk('public')->delete($p) : false)
                            ->columnSpan(['default' => 12, 'lg' => 5]),   // ← 5

                        // サブ（右）
                        Grid::make(12)                                    // ← 12カラム格子
                            ->schema(function () {
                                $fields = [];
                                for ($i = 1; $i <= 20; $i++) {
                                    $fields[] = FileUpload::make("sub_image_{$i}")
                                        ->label("サブ画像 {$i}")
                                        ->disk('public')
                                        ->image()
                                        ->directory('stores/sub')
                                        ->imagePreviewHeight('120')       // ← 少し大きめ
                                        ->panelAspectRatio('1:1')         // 正方形
                                        ->panelLayout('compact')          // 余白少なめ
                                        ->openable()
                                        ->downloadable()
                                        ->visibility('public')
                                        ->deleteUploadedFileUsing(fn ($p) => $p ? Storage::disk('public')->delete($p) : false)
                                        ->columnSpan(3);                  // ← 12/3 = 4列
                                }

                                return $fields;
                            })
                            ->columnSpan(['default' => 12, 'lg' => 7]),    // ← 7（5+7=12で外側もピッタリ）
                    ])
                    ->maxWidth('7xl'),
            ]);
    }
}
