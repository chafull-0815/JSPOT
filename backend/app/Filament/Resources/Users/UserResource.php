<?php

namespace App\Filament\Resources\Users;

use App\Filament\Resources\Users\Pages;
use App\Models\Admin;
use App\Models\User;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $recordTitleAttribute = 'name';
    
    protected static string|UnitEnum|null $navigationGroup = '顧客管理'; // サイドメニューのグループ名
    protected static ?string $navigationLabel = 'ユーザー'; // サイドメニュー名
    protected static ?string $modelLabel = 'ユーザー'; // タイトル
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUsers; // アイコン

    /** super_admin / admin のみ閲覧（必要なら editor は閲覧のみ等に変更可） */
    public static function shouldRegisterNavigation(): bool
    {
        return self::canManageUsers();
    }

    public static function canViewAny(): bool
    {
        return self::canManageUsers();
    }

    public static function canCreate(): bool
    {
        return self::canManageUsers();
    }

    public static function canEdit($record): bool
    {
        return self::canManageUsers();
    }

    public static function canDelete($record): bool
    {
        return self::canManageUsers();
    }

    private static function canManageUsers(): bool
    {
        $admin = auth('admin')->user();

        return $admin instanceof Admin
            && in_array($admin->role, ['super_admin', 'admin'], true);
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('ログイン情報')->schema([
                TextInput::make('name')
                    ->label('名前')
                    ->required()
                    ->maxLength(255)
                    ->columnSpan(1),

                // 作成時は必須、編集時は入力があった時だけ更新
                TextInput::make('password')
                ->password()
                ->label('パスワード')
                ->required(fn (string $operation) => $operation === 'create')
                ->dehydrated(fn ($state) => filled($state))
                ->columnSpan(1),

            ])
            ->columns([
              'default' => 3,
              'sm' => 4,
            ]),

          Section::make('詳細情報')->schema([
                TextInput::make('email')
                    ->required()
                    ->label('メールアドレス')
                    ->email()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true)
                    ->columnSpan(2),

                TextInput::make('avatar_url')
                    ->label('アバターのURL')
                    ->url()
                    ->maxLength(2048)
                    ->nullable()
                    ->columnSpan(2),

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
                TextColumn::make('name')->label('名前')->searchable()->sortable(),
                TextColumn::make('email')->label('メールアドレス')->searchable()->sortable(),
                TextColumn::make('email_verified_at')->label('メール認証日')->dateTime('Y-m-d H:i')->sortable(),
                TextColumn::make('last_login_at')->label('最終ログイン日')->dateTime('Y-m-d H:i')->sortable(),
                TextColumn::make('created_at')->label('作成日')->dateTime('Y-m-d H:i')->sortable(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit'   => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
