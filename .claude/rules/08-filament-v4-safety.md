# Filament v4 safety rules

## MUST: 破壊的変更は段階移行

UI/Resource 側が参照するカラム・リレーションの破壊的変更は即削除/即rename しない。

### 段階移行フロー
1. add new schema (nullable) + keep old
2. update Filament resources/forms/tables to support both (new preferred, old fallback)
3. backfill data via Artisan Command
4. enforce constraints (NOT NULL / unique)
5. remove old schema + remove fallback code

## Resource impact checklist (before merge)

### Filament Resource 確認項目
- Forms: 参照しているカラム名・リレーション・cast・enum
- Tables/Columns: 表示カラム・計算カラム
- Filters: フィルター条件で使うカラム・スコープ
- Actions: bulk/row actions が参照するカラム

### Authorization
- policies / gates / tenancy / scope が影響を受けないか

### Search / Sort
- ->searchable() で参照しているカラム
- ->sortable() で参照しているカラム

### Validation
- required / unique が schema と一致しているか

## Testing requirement

### Automated
- sail migrate:fresh --seed が成功
- sail test が成功

### Manual smoke check (変更に関連するページ)
- List page loads
- Edit/Create works
- Filters/Sorts work
- Bulk actions work (if applicable)
