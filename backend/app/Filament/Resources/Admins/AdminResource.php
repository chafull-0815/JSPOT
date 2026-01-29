<?php

namespace App\Filament\Resources\Admins;

use App\Filament\Resources\Admins\Pages;
use App\Models\Admin;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Hash;
use UnitEnum;

class AdminResource extends Resource
{
    protected static ?string $model = Admin::class;

    protected static ?string $recordTitleAttribute = 'name';

    protected static string|UnitEnum|null $navigationGroup = 'システム管理';
    protected static ?string $navigationLabel = '管理者';
    protected static ?string $modelLabel = '管理者';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUsers;

    /** super_admin だけ見える（URL直打ちも防ぐなら canViewAny も必要） */
    public static function shouldRegisterNavigation(): bool
    {
        return self::isSuperAdmin();
    }

    public static function canViewAny(): bool
    {
        return self::isSuperAdmin();
    }

    public static function canCreate(): bool
    {
        return self::isSuperAdmin();
    }

    public static function canEdit($record): bool
    {
        return self::isSuperAdmin();
    }

    public static function canDelete($record): bool
    {
        // super_admin同士で消し合う事故を避けたい場合はここで制限してもOK
        return self::isSuperAdmin();
    }

    protected static function isSuperAdmin(): bool
    {
        $user = auth('admin')->user();

        return $user instanceof Admin && $user->role === 'super_admin';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Basic')
                ->schema([
                    TextInput::make('name')
                        ->label('名前')
                        ->required()
                        ->maxLength(255),

                    TextInput::make('email')
                        ->label('メールアドレス')
                        ->required()
                        ->email()
                        ->maxLength(255)
                        ->unique(ignoreRecord: true),

                    Select::make('role')
                        ->label('権限')
                        ->options(self::getRoleOptions()) 
                        ->required(),

                    // パスワード：作成時は必須、編集時は入力時だけ更新
                    TextInput::make('password')
                        ->label('パスワード')
                        ->password()
                        ->required(fn (string $operation) => $operation === 'create')
                        ->dehydrated(fn ($state) => filled($state))
                        ->dehydrateStateUsing(fn ($state) => filled($state) ? Hash::make($state) : null),
                      ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->label('名前')->searchable()->sortable(),
                TextColumn::make('email')->label('メールアドレス')->searchable()->sortable(),
                TextColumn::make('role')
                    ->label('権限')
                    ->badge()
                    ->sortable()
                    // options() の代わりに formatStateUsing() を使用して日本語名を表示
                    ->formatStateUsing(fn (string $state): string => self::getRoleOptions()[$state] ?? $state)
                    // 色の指定
                    ->color(fn (string $state): string => self::getRoleColors()[$state] ?? 'gray'),
                TextColumn::make('last_login_at')->label('最終ログイン')->dateTime('Y-m-d H:i')->sortable(),
                TextColumn::make('created_at')->label('作成日')->dateTime('Y-m-d H:i')->sortable(),
            ])
            ->actions([
                EditAction::make()
                ->button()
                ->color('primary'),
                DeleteAction::make()
                ->button()
                ->color('danger'),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->recordUrl(null);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListAdmins::route('/'),
            'create' => Pages\CreateAdmin::route('/create'),
            'edit'   => Pages\EditAdmin::route('/{record}/edit'),
        ];
    }

    public static function getRoleOptions(): array
    {
        return [
            'super_admin' => 'スーパー管理者',
            'admin'       => '管理者',
            'editor'      => '編集者',
            'author'      => '投稿者',
        ];
    }

    // 2. 色の定義も集約
    public static function getRoleColors(): array
    {
        return [
            'super_admin' => 'danger',
            'admin'       => 'warning',
            'editor'      => 'success',
            'author'      => 'info',
        ];
    }
}
