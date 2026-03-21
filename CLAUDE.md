# Mochiki Studio

microCMS をデータソースとしたポートフォリオサイト。

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4
- **CMS**: microCMS (`project` リスト型 / `about` オブジェクト型)
- **画像最適化**: sharp
- **パッケージマネージャ**: npm

## 開発コマンド

```bash
npm run dev          # 開発サーバー (Turbopack)
npm run build        # プロダクションビルド
npm run lint         # ESLint
npm run lint:fix     # ESLint 自動修正
npm run format       # Prettier フォーマット
npm run format:check # Prettier チェック
```

## ディレクトリ構成

```
src/
  app/              # App Router ページ
    projects/[id]/  # プロジェクト詳細
  components/       # UIコンポーネント
  lib/              # ユーティリティ (microcms.ts, text.ts)
public/             # 静的ファイル
scripts/            # ビルド補助スクリプト
docs/               # ドキュメント
```

## 環境変数

`.env` に以下を設定（`.env.example` 参照）:

- `MICROCMS_SERVICE_DOMAIN` — microCMS サービスドメイン
- `APIKEY` — microCMS API キー

## コーディング規約

- ESLint flat config (`eslint.config.mjs`) + Prettier
- ダブルクォート、セミコロンあり、インデント 2 スペース
- コンポーネントは `src/components/` に PascalCase で配置
- microCMS 関連の型・関数は `src/lib/microcms.ts` に集約
- 画像は `next/image` の `Image` コンポーネントを使用
- リッチテキスト (HTML) は `html-react-parser` でパース
