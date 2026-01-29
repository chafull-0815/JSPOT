# Coding style

## General
- 変更は最小差分。既存の命名/層/責務に寄せる
- コントローラは薄く（既存設計に従い、必要ならService/Actionへ）
- 例外や失敗を握りつぶさない。ログ・HTTPステータス・戻り値を整合させる
- 追加/修正した仕様は「確認手順」か「テスト」のどちらかを必ず残す

## Laravel
- FormRequest でバリデーション
- Model に cast / fillable / relations を集約
- Query は Eloquent 優先。生SQL は最小限に

## TypeScript / Next.js
- strict mode
- any 禁止（unknown + type guard）
- コンポーネントは関数コンポーネント + hooks
