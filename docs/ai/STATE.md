# STATE

## Current goal
- Claude Code 運用環境の整備と DB 要件の実装

## Done
- CLAUDE.md 分割構成（root / backend / frontend）
- .claude/rules/*.md 更新（style, testing, migrations, postgres, git, filament-v4）
- docs/ai/*.md 更新（RUNBOOK, MIGRATIONS, SPECS, CONTEXT, STATE, DECISIONS）
- .gitignore 更新（Claude Code local files）
- Pending migration 修正（PostgreSQL対応: after削除, unsigned削除, index追加）
- 新規 migration 作成:
  - store_view_histories（guest対応、actor_key方式）
  - user_access_grants（管理者の手動権限付与）
  - user_login_links（ログインURL発行）
  - stores geo index（latitude, longitude）
  - stations unique 調整（line_id + slug）
- backend migrate:fresh --seed 成功
- backend sail test 成功

## In progress
- PR 作成

## Next
- GitHub Actions で CI 確認
- squash merge で main 反映

## Risks / Notes
- frontend lint はローカル環境の問題（icu4c ライブラリ不整合）でスキップ。CI環境では問題なし。
- stations.slug の unique 制約変更は既存データに影響する可能性あり（重複があれば失敗）
