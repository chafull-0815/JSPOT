<?php

namespace App\Filament\Resources\InfluencerProfiles;

use App\Filament\Resources\InfluencerProfiles\Pages;
use App\Models\InfluencerProfile;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use UnitEnum;

class InfluencerProfileResource extends Resource
{
    protected static ?string $model = InfluencerProfile::class;

    // DBに存在するカラムに合わせる（name は無い）
    protected static ?string $recordTitleAttribute = 'name_en';

    
    protected static string|UnitEnum|null $navigationGroup = '顧客管理'; // サイドメニューのグループ名
    protected static ?string $navigationLabel = 'インフルエンサー'; // サイドメニュー名
    protected static ?string $modelLabel = 'インフルエンサー'; // タイトル
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUser; // アイコン

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('基本情報')
                ->schema([
                    Select::make('user_id')
                        ->label('紐づけユーザー')
                        ->relationship('user', 'email')
                        ->searchable()
                        ->preload()
                        ->required()
                        ->helperText('メールアドレスで検索')
                        ->columnSpan(2),

                    TextInput::make('public_id')
                        ->disabled()
                        ->dehydrated(false)
                        ->columnSpan(1),

                    TextInput::make('slug')
                        ->disabled()
                        ->dehydrated(false)
                        ->helperText('name_en から自動生成（保存時にモデル側で作成）')
                        ->columnSpan(1),

                    TextInput::make('display_name')
                        ->label('名前')
                        ->required()
                        ->maxLength(255)
                        ->columnSpan([
                          'default' => 2,
                          'sm' => 2,
                        ]),

                    TextInput::make('name_en')
                        ->label('英語名')
                        ->required()
                        ->maxLength(255)
                        ->columnSpan([
                          'default' => 2,
                          'sm' => 2,
                        ]),

                    FileUpload::make('profile_image')
                        ->label('自分の写真')
                        ->image()
                        ->disk('public')
                        ->directory('influencers/temp')
                        ->visibility('public')
                        ->maxSize(10240)
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
                        ->imagePreviewHeight('200')
                        ->columnSpanFull(),
                ])
                ->columns([
                  'default' => 3,
                  'sm' => 4,
                ]),

            Section::make('詳細の情報')
                ->schema([
                    TextInput::make('youtube_url')->label('YoutubeのURL')->maxLength(255)->columnSpan(1),
                    TextInput::make('tiktok_url')->label('TikTokのURL')->maxLength(255)->columnSpan(1),
                    TextInput::make('facebook_url')->label('FacebookのURL')->maxLength(255)->columnSpan(1),
                    TextInput::make('instagram_url')->label('InstagramのURL')->maxLength(255)->columnSpan(1),
                    Textarea::make('bio')->label('コメント')->rows(5)->columnSpanFull(),
                ])
                ->columns([
                  'default' => 3,
                  'sm' => 4,
                ]),
        ])
        ->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                ImageColumn::make('profile_image')
                    ->label('写真')
                    ->disk('public')
                    ->circular(),
                TextColumn::make('user_id')->label('user_id')->sortable(),
                TextColumn::make('display_name')->label('インフルエンサー名')->searchable()->sortable(),
                TextColumn::make('youtube_url')->label('YouTubeのURL')->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('instagram_url')->label('instagramのURL')->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('facebook_url')->label('FacebookのURL')->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('tiktok_url')->label('TicTokのURL')->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')->label('作成日')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                EditAction::make(),
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
            ]);
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([SoftDeletingScope::class]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListInfluencerProfiles::route('/'),
            'create' => Pages\CreateInfluencerProfile::route('/create'),
            'edit'   => Pages\EditInfluencerProfile::route('/{record}/edit'),
        ];
    }
}
