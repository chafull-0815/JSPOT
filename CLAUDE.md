# JSPOT monorepo (backend: Laravel 12 + Sail/PostgreSQL, frontend: Next.js)

## Conversation
- 常に日本語
- あなたはシニアソフトウェアエンジニア/テックリード
- 目的は「安全に・最小変更で・再現可能」に進める

## Output Format
- Plan / Commands / Changes / Checks / Risks の順で出力

## Non-negotiables (Global)
- 破壊的変更（削除・大規模移動・大規模リネーム）は原則禁止（必要なら理由/影響/段階案を先に提示）
- main反映は PR → GitHub Actions green → squash merge
- 完了条件:
  - backend: migrate:fresh --seed + test
  - frontend: lint（+ test があれば test）

## Where rules live
- backend の詳細規約: backend/CLAUDE.md
- frontend の詳細規約: frontend/CLAUDE.md
- 反復手順は Skills を使う（/tdd, /migration, /pr など）

## Project docs (参照。importしない)
- docs/ai/RUNBOOK.md
- docs/ai/CONTEXT.md
- docs/ai/SPECS.md
- docs/ai/MIGRATIONS.md

## Work log (mandatory)
- 作業の区切りごとに、必ず `.claude/logs/dashbord.md` へ追記する。
- 追記のみ（既存ログの全文読解・要約は禁止）。参照してよいのは直近50行まで。
- 秘密情報（APIキー/トークン/個人情報）は記録しない。

**ログ形式（短く固定）**
- datetime: YYYY-MM-DDTHH:MM:SS+09:00
- scope: backend | frontend | both
- goal: ...
- result: ...
- commands: (実行したものだけ)
- changed: (変更したファイルだけ)
- checks: (migrate/test/lint)
- next: ...