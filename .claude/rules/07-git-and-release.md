# Git workflow

## Branch naming
- 作業開始: `feature/<topic>-<yyyymmdd>`
- 例: `feature/add-user-likes-20260129`

## Merge flow
1. feature ブランチで作業
2. 作業完了条件を満たす
3. PR 作成
4. GitHub Actions green を確認
5. squash merge で main 反映

## Completion requirements
- backend:
  - ./vendor/bin/sail artisan migrate:fresh --seed が成功
  - ./vendor/bin/sail test が成功
- frontend:
  - npm run lint が成功
  - test があれば npm run test 成功
- docs/ai/STATE.md を更新（Done / Next）

## Commit prefix
- feat: 新機能
- fix: バグ修正
- refactor: リファクタリング
- test: テスト追加・修正
- docs: ドキュメント
- chore: その他（CI, 依存更新等）
- db: migration / DB関連

## PR
- タイトル: prefix + 簡潔な説明
- 本文: 変更概要 + 確認手順
