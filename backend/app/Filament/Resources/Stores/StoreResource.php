<?php

namespace App\Filament\Resources\Stores;

use App\Filament\Resources\Stores\Pages;
use App\Models\Store;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Placeholder;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Filters\TrashedFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Support\Icons\Heroicon;
use BackedEnum;
use UnitEnum;

class StoreResource extends Resource
{
    protected static ?string $model = Store::class;

    // make:filament-resource で聞かれた title attribute
    protected static ?string $recordTitleAttribute = 'name';

    protected static string|UnitEnum|null $navigationGroup = '顧客管理'; // サイドメニューのグループ
    protected static ?string $navigationLabel = '店舗情報'; // サイドメニュー名
    protected static ?string $modelLabel = '店舗';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBuildingStorefront; // アイコン

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('基本情報')
                ->schema([
                  TextInput::make('public_id')
                      ->disabled()
                      ->label('共通ID')
                      ->dehydrated(false)
                      ->columnSpan(1),

                  TextInput::make('slug')
                      ->disabled()
                      ->label('スラッグ')
                      ->dehydrated(false)
                      ->helperText('name_en から自動生成（保存時にモデル側で作成）')
                      ->columnSpan(1),

                  Placeholder::make('spacer')
                      ->hiddenLabel()
                      ->content('')
                      ->dehydrated(false)
                      ->columnSpanFull()
                      ->extraAttributes(['class' => 'h-4']),
                      
                  TextInput::make('name')
                  ->label('店舗名')
                  ->required()
                  ->maxLength(255)
                  ->columnSpan(2),
                  
                  TextInput::make('name_en')    
                  ->label('英語名')
                  ->required()
                  ->maxLength(255)
                  ->columnSpan(2),

                  TextInput::make('tel')
                      ->label('TEL')
                      ->maxLength(50)
                      ->columnSpan(2),

                  Textarea::make('catchphrase')
                      ->label('キャッチフレーズ')
                      ->rows(3)
                      ->columnSpanFull(),
                ])
                ->columns([
                  'default' => 3,
                  'sm' => 4,
                ]),

                Section::make('メイン画像')
                    ->schema([
                        FileUpload::make('main_image_upload')
                            ->label('メイン画像（1枚）')
                            ->image()
                            ->directory('stores/images')
                            ->visibility('public')
                            ->columnSpanFull()
                            ->dehydrated(false)
                            ->afterStateHydrated(function ($component, $record) {
                                if ($record) {
                                    $mainImage = $record->images()->where('is_main', true)->first();
                                    if ($mainImage) {
                                        $component->state($mainImage->image_path);
                                    }
                                }
                            }),
                    ]),

                Section::make('サブ画像')
                    ->schema([
                        Repeater::make('sub_images')
                            ->label('サブ画像（最大20枚）')
                            ->relationship('images', fn ($query) => $query->where('is_main', false))
                            ->orderColumn('sort_order')
                            ->defaultItems(20)
                            ->minItems(20)
                            ->maxItems(20)
                            ->addable(false)
                            ->deletable(false)
                            ->reorderable(true)
                            ->schema([
                                FileUpload::make('image_path')
                                    ->label('画像')
                                    ->image()
                                    ->directory('stores/images')
                                    ->visibility('public'),
                            ])
                            ->grid(4)
                            ->columns(1),
                    ])
                    ->collapsible(),

            Section::make('公開情報')
                ->schema([
                    \Filament\Forms\Components\Select::make('visibility_status_id')
                        ->label('公開ステータス')
                        ->options(fn () => \App\Models\StatusDefinition::where('domain', 'visibility')->pluck('label_ja', 'id'))
                        ->default(fn () => \App\Models\StatusDefinition::where('domain', 'visibility')->where('slug', 'draft')->first()?->id)
                        ->columnSpan(1),
                ])
                ->columns([
                  'default' => 3,
                  'sm' => 4,
                ]),

            Section::make('住所')
                ->schema([
                    \Filament\Forms\Components\Select::make('prefecture_id')
                        ->label('都道府県')
                        ->placeholder('---')
                        ->options(fn () => \App\Models\Prefecture::pluck('name', 'id'))
                        ->reactive()
                        ->afterStateUpdated(fn (callable $set) => $set('city_id', null))
                        ->columnSpan(1),
                    \Filament\Forms\Components\Select::make('city_id')
                        ->label('市区町村')
                        ->placeholder('---')
                        ->options(fn (callable $get) =>
                            $get('prefecture_id')
                                ? \App\Models\City::where('prefecture_id', $get('prefecture_id'))->pluck('name', 'id')
                                : []
                        )
                        ->columnSpan(1),
                    Textarea::make('address_details')->label('住所詳細')->rows(2)->columnSpan(4),

                    TextInput::make('latitude')->label('緯度')->numeric()->columnSpan(1),
                    TextInput::make('longitude')->label('軽度')->numeric()->columnSpan(1),
                ])
                ->columns([
                  'default' => 3,
                  'sm' => 4,
                ]),

            Section::make('料金')
                ->schema([
                    Toggle::make('has_morning')->label('朝料金')->inline(false)->columnStart(start: ['sm' => 1])->columnSpan(1),
                    TextInput::make('morning_min_price')->label('朝（最小額）')->numeric()->columnSpan(1),
                    TextInput::make('morning_max_price')->label('朝（最大額）')->numeric()->columnSpan(1),

                    Toggle::make('has_lunch')->label('昼料金')->inline(false)->columnStart(start: ['sm' => 1])->columnSpan(1),
                    TextInput::make('lunch_min_price')->label('昼（最小額）')->numeric()->columnSpan(1),
                    TextInput::make('lunch_max_price')->label('昼（最大額）')->numeric()->columnSpan(1),

                    Toggle::make('has_dinner')->label('夜料金')
                        ->inline(false)->columnStart(['sm' => 1])
                        ->columnSpan(1),
                    TextInput::make('dinner_min_price')->label('夜（最小額）')->numeric()->columnSpan(1),
                    TextInput::make('dinner_max_price')->label('夜（最大額）')->numeric()->columnSpan(1),
                ])
                ->columns([
                  'default' => 3,
                  'sm' => 5,
                ]),

            Section::make('いいね数')
                ->schema([
                    TextInput::make('likes_count')
                        ->label('ユーザーいいね数')
                        ->numeric()
                        ->disabled()
                        ->dehydrated(false)
                        ->columnSpan(1),
                    TextInput::make('admin_likes')
                        ->label('管理者いいね数（水増し用）')
                        ->numeric()
                        ->default(0)
                        ->columnSpan(1),
                ])
                ->columns(2),
        ])
        ->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //基本情報
                TextColumn::make('id')->sortable(),
                TextColumn::make('public_id')->copyable()->toggleable(),
                ImageColumn::make('mainImage.image_path')
                    ->label('メイン画像')
                    ->disk('public')
                    ->square()
                    ->toggleable(isToggledHiddenByDefault: false),
                TextColumn::make('name')->label('店舗名')->searchable()->sortable(),
                TextColumn::make('slug')->label('スラッグ')->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('tel')->label('TEL')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),

                // 住所
                TextColumn::make('prefecture_id')->label('県名')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('city_id')->label('市名')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('address_detail')->label('住所詳細')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),

                // 金額
                TextColumn::make('morning_min_price')->label('朝（Min)')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('lunch_min_price')->label('昼（Min)')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('dinner_min_price')->label('夕（Min)')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('morning_Max_price')->label('朝（Max）')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('lunch_Max_price')->label('昼（Max）')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('dinner_Max_price')->label('夕（Max）')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),
                
                // いいね
                TextColumn::make('likes_count')->label('ユーザーいいね')->numeric()->sortable()->toggleable(isToggledHiddenByDefault: false),
                TextColumn::make('admin_likes')->label('管理者いいね')->numeric()->sortable()->toggleable(isToggledHiddenByDefault: false),
                TextColumn::make('total_likes')
                    ->label('合計いいね')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false)
                    ->getStateUsing(fn ($record) => ($record->likes_count ?? 0) + ($record->admin_likes ?? 0)),

                // 日付
                TextColumn::make('updated_at')->label('作成日')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true)->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('published_at')->label('公開日')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true)->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('deleted_at')->label('削除日')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true)->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                EditAction::make(),

                // soft-deletes 対応（v4）
                DeleteAction::make(),
                ForceDeleteAction::make(),
                RestoreAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ])
            ->recordUrl(null);
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListStores::route('/'),
            'create' => Pages\CreateStore::route('/create'),
            'edit'   => Pages\EditStore::route('/{record}/edit'),
        ];
    }
}
