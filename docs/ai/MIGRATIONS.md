# MIGRATIONS (Operational policy)

## MUST
- Schema changes only in migrations
- Data backfill must be done via Artisan Command (chunk, idempotent)
- No column order operations (after() is forbidden)
- All migrations must pass:
  ```bash
  cd backend
  ./vendor/bin/sail artisan migrate:fresh --seed
  ./vendor/bin/sail test
  ```

## Breaking changes staging (段階移行)

Breaking changes = drop / rename / NOT NULL / unique

### Flow
1. add nullable column (keep old)
2. update Filament resources to support both (new preferred, old fallback)
3. backfill data via Artisan Command
4. enforce constraint (NOT NULL / unique)
5. remove old column + fallback code

### Example: rename column
```php
// Step 1: Add new column
$table->string('new_name')->nullable();

// Step 2: Command to backfill
// php artisan backfill:new-name

// Step 3: Make NOT NULL
$table->string('new_name')->nullable(false)->change();

// Step 4: Drop old
$table->dropColumn('old_name');
```

## PostgreSQL notes

### Avoid unsigned types
```php
// NG
$table->unsignedInteger('count');

// OK
$table->integer('count');
```

### Constraint naming
- Drop unique/index by explicit name
- Laravel naming convention:
  - unique: `{table}_{column}_unique`
  - index: `{table}_{column}_index`
  - foreign: `{table}_{column}_foreign`

```php
// Drop unique
$table->dropUnique('stations_slug_unique');

// Add composite unique
$table->unique(['line_id', 'slug']);
```

## Migration file checklist
- [ ] No after()
- [ ] No unsigned types (use integer/bigInteger)
- [ ] No data manipulation (use Command)
- [ ] down() implemented (for dev rollback)
- [ ] Constraint names explicit when dropping
