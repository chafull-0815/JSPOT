# PostgreSQL rules

## Data types
- unsigned は使わない（PostgresにはUNSIGNED型がない）
  - unsignedInteger() → integer()
  - unsignedBigInteger() → bigInteger()
- JSON は jsonb を優先

## Constraints & indexes
- 制約/インデックス名は明示するか、生成名を把握して drop する
- Laravel の生成名規則:
  - unique: `{table}_{column}_unique` (e.g. `stations_slug_unique`)
  - index: `{table}_{column}_index`
  - foreign: `{table}_{column}_foreign`
- drop 時は名前を明示:
  ```php
  $table->dropUnique('stations_slug_unique');
  ```

## Geo search
- 大量データ前提の地理検索は当面 bbox + haversine
- 必要なら将来 PostGIS 検討
- index(latitude, longitude) で bbox 検索を高速化

## Performance
- 大量 INSERT/UPDATE は chunk 処理
- N+1 に注意（with() で eager load）
