# Mochiki Studio Portfolio

Mochiki Studio の作品を microCMS から取得して表示する Next.js 製のポートフォリオサイトです。トップページでは作品サムネイルをタイル状に並べ、クリックすると詳細ページに遷移します。左上のプロフィールアイコンをクリックするとプロフィールオーバーレイが表示されます。

## セットアップ

1. 依存関係のインストール
   ```bash
   npm install
   ```
2. 環境変数の設定
   - `.env`（ローカル開発用）に以下を設定してください。
     ```bash
     APIKEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     MICROCMS_SERVICE_DOMAIN=your-service-domain
     ```
   - `APIKEY` は microCMS の **APIキー**、`MICROCMS_SERVICE_DOMAIN` はサービスドメインです。
3. microCMS で以下のエンドポイントを用意してください。
   - `about` (オブジェクト型) … プロフィール情報。`name`, `description` (リッチテキスト), `work-content`, `work-description` (リッチテキスト), `overview`, `overview-desc` (リッチテキスト), `icon` など。
   - `project` (リスト型) … 作品情報。`title`, `description` (リッチテキスト), `thumbnail` (画像), `date`, `genre[]`, `images[]`, `url`, `github` など。

### アイコンの生成

左上プロフィールアイコンとサイトのファビコン／アプリアイコンは `ffmpeg` を利用して生成できます。

```bash
npm run icons
```

`public/` 配下に `icon-512.png`・`icon-192.png`・`favicon.ico` が出力され、メタデータに自動で読み込まれます。

## 開発コマンド

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバーを起動します。|
| `npm run build` | 本番ビルドを作成します。|
| `npm run start` | 本番ビルドを起動します。|
| `npm run lint` | ESLint でコードをチェックします。|

## デプロイ

Vercel を想定しています。Vercel プロジェクトに以下の環境変数を登録してください。

- `APIKEY`
- `MICROCMS_SERVICE_DOMAIN`

デプロイ後、microCMS 上でデータを更新すると自動的にサイトに反映されます（ISR/再検証ロジックは必要に応じて追加してください）。

## ディレクトリ構成

```
.
├── docs/
├── public/
├── scripts/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── package.json
└── tsconfig.json
```

参考プロジェクト（`kuyuri-iroha`）と同様に Next.js App Router 構成を採用しています。
