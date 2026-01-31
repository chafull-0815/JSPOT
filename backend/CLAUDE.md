# Backend (Laravel 12 + Sail + PostgreSQL + Filament v4)

## Non-negotiables (Backend)
- backend の実行は必ず Sail 経由（artisan / composer / test）
- DBは PostgreSQL。unsigned型は避ける
- migration: after() 禁止、破壊的変更は段階移行、data移行は Artisan Command
- Filament v4: 破壊的変更は段階移行を強制

## Commands (examples)
- vendor/bin/sail artisan ...
- vendor/bin/sail composer ...
- vendor/bin/sail test

## Done criteria
- vendor/bin/sail artisan migrate:fresh --seed
- vendor/bin/sail test

## Heavy workflows
- TDD: /tdd
- 段階移行テンプレ: /migration

## Scope lock
- このセッションの主作業は backend のみ。
- frontend/ の変更（特に削除・リネーム・大量置換）は禁止。必要なら scope=both を宣言してから。
- 作業後、必ず `.claude/logs/dashbord.md` に追記。