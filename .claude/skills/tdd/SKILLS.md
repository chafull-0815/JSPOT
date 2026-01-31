---
name: tdd
description: TDD手順（手動で呼ぶ）
disable-model-invocation: true
---
次の流れでTDDを実施する:

1) 期待入出力を整理し、まずテストのみ作成
2) テストを実行し失敗を確認
3) ここでコミット（テストのみ）
4) 実装でテストを通す（テストは原則変更しない）
5) 全テスト通過まで繰り返す
6) 完了時に backend: migrate:fresh --seed + test を通す
