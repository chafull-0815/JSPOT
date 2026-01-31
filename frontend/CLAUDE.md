# Frontend (Next.js)

## Non-negotiables (Frontend)
- lint は必ず通す（+ test があるなら test も）
- 既存構造を尊重し、無駄なファイル/フォルダを増やさない

## Commands
- package.json の scripts を参照して実行（lockfile に合わせて npm/pnpm/yarn を選ぶ）

## Done criteria
- lint（+ testがあるなら test）

## Commands
- Dev: npm run dev
- Lint: npm run lint
- Test: npm run test (if exists)

## Scope lock
- このセッションの主作業は frontend のみ。
- backend/ の変更（特に削除・リネーム・大量置換）は禁止。必要なら scope=both を宣言してから。
- 作業後、必ず `.claude/logs/dashbord.md` に追記。