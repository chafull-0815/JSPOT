# JSPOT (Laravel 12 + Sail / PostgreSQL + Next.js)

## Non-negotiables
- backend の実行は必ず Sail 経由（artisan / composer / test）
- DBは PostgreSQL。unsigned 型は避ける
- migration: after() 禁止、破壊的変更は段階移行、data移行は Artisan Command
- Filament v4: 破壊的変更は段階移行を強制
- 完了条件: backend migrate:fresh --seed + test / frontend lint（+ testがあれば）を通す
- main 反映は原則 PR → GitHub Actions green → squash merge

## How to run
@docs/ai/RUNBOOK.md

## Project context & specs
@docs/ai/CONTEXT.md
@docs/ai/SPECS.md

## Migration policy
@docs/ai/MIGRATIONS.md

## Rules
@.claude/rules/01-style.md
@.claude/rules/02-testing.md
@.claude/rules/05-migrations.md
@.claude/rules/06-db-postgres.md
@.claude/rules/07-git-and-release.md
@.claude/rules/08-filament-v4-safety.md
