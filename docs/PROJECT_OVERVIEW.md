# プロジェクト概要

- フレームワーク: Next.js 15 (App Router)
- デザイン方針: 作品タイル + プロフィールオーバーレイ
- データソース: microCMS (`project`, `about`)

## データ取得

`src/lib/microcms.ts` に microCMS クライアントを定義しています。

- `getProjects()` … `project` エンドポイントから一覧を取得。
- `getProjectById(id)` … 単一プロジェクトを取得。
- `getAbout()` … `about` オブジェクトを取得。
- `thumbnail` フィールドを `mainVisual` にマッピングし、配列フィールドは空配列に正規化。

いずれも `MICROCMS_SERVICE_DOMAIN` と `APIKEY` を環境変数として参照します。

## UI 構成

- `src/app/page.tsx` … トップページ。作品カードをグリッドで表示。
- `src/app/projects/[id]/page.tsx` … 詳細ページ。
- `src/components/AboutOverlay.tsx` … 左上アイコンから開くプロフィールオーバーレイ。
- `src/components/ProjectCard.tsx` … 作品カード表示コンポーネント。
- `src/components/Header.tsx` / `Footer.tsx` … 共通レイアウト。

## デザイン上のポイント

- 作品タイルはホバーアニメーション付き。
- プロフィールオーバーレイはスクロールロックと ESC キーで閉じる操作に対応。
- 主要カラーは `globals.css` でカスタマイズし、ダークモードバリアントにも対応。

必要に応じて `scripts/` 配下にバッチや補助スクリプトを追加してください。
