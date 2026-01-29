# RUNBOOK (JSPOT)

## Prerequisites
- Docker Desktop 起動済み

## Directory structure
```
/Users/shogo/Desktop/JSPOT/
├── backend/    # Laravel 12 + Sail
└── frontend/   # Next.js
```

## Backend (Laravel 12 + Sail)

All backend commands MUST be executed via ./vendor/bin/sail.

### From project root
```bash
cd backend

# Docker
./vendor/bin/sail up -d
./vendor/bin/sail down

# Composer
./vendor/bin/sail composer install
./vendor/bin/sail composer update

# Artisan
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan migrate:fresh --seed
./vendor/bin/sail artisan migrate:status
./vendor/bin/sail artisan make:migration create_xxx_table
./vendor/bin/sail artisan make:model Xxx -m
./vendor/bin/sail artisan make:command XxxCommand

# Tests
./vendor/bin/sail test
./vendor/bin/sail test --filter=SomeTest

# Tinker
./vendor/bin/sail artisan tinker
```

## Frontend (Next.js)

### Package manager detection
- package-lock.json → npm

### From project root
```bash
cd frontend

# Install
npm install

# Development
npm run dev

# Lint (required for merge)
npm run lint

# Build
npm run build

# Test (if available)
npm run test
```

## Typical workflow

### New feature
1. git checkout -b feature/xxx-yyyymmdd
2. 実装
3. cd backend && ./vendor/bin/sail artisan migrate:fresh --seed && ./vendor/bin/sail test
4. cd frontend && npm run lint
5. git add / commit
6. Push → PR → Actions green → squash merge

### Migration only
1. git checkout -b feature/db-xxx-yyyymmdd
2. cd backend && ./vendor/bin/sail artisan make:migration xxx
3. Migration ファイル編集
4. ./vendor/bin/sail artisan migrate:fresh --seed
5. ./vendor/bin/sail test
6. git add / commit → PR
