# Migration rules

## MUST
- after() 禁止（DB間で非互換、Postgresでは無意味）
- 1 migration = 1目的（schema変更とデータ移行を混ぜない）
- データ移行は migration に書かない → Artisan Command へ
  - Command は chunk 処理 + idempotent（再実行可能）
- down() は書くが、本番運用はロールフォワード前提

## Breaking changes staging（段階移行）
破壊的変更（drop / rename / NOT NULL / unique）は以下の段階で:
1. add new schema (nullable) + keep old
2. update Filament resources to support both (new preferred, old fallback)
3. backfill data via Artisan Command
4. enforce constraints (NOT NULL / unique)
5. remove old schema + remove fallback code

## Verification
- CI/ローカルで必ず migrate:fresh --seed が通ること
- sail test が通ること

## Examples (forbidden)
```php
// NG: after() は Postgres で無視される
$table->integer('admin_likes')->default(0)->after('likes_count');

// OK
$table->integer('admin_likes')->default(0);
```
