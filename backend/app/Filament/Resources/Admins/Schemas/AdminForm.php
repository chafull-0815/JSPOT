<?php

namespace App\Filament\Resources\Admins\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class AdminForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('password')
                    ->password()
                    ->required(),
                TextInput::make('name'),
                TextInput::make('role')
                    ->required()
                    ->default('admin'),
                DateTimePicker::make('last_login_at'),
            ]);
    }
}
