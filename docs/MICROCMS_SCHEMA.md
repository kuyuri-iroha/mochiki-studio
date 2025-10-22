# microCMS スキーマ把握メモ

microCMS の Delivery API (`https://mochiki-studio.microcms.io/api/v1`) から `about` と `project` を取得し、現状のフィールド構成を確認しました。

## about (オブジェクト型)

| フィールド | 型 | 備考 |
|------------|----|------|
| `name` | string | スタジオ名。|
| `icon` | image | プロフィールアイコン。`url`, `width`, `height` を保持。|
| `description` | rich text (HTML string) | スタジオ紹介文。複数段落。|
| `work-content` | string | 取り扱い領域が「・」区切りで記載。|
| `work-description` | rich text | 業務内容詳細。|
| `overview` | string | 屋号・代表者などの概要。|
| `overview-desc` | rich text | 住所や連絡先など。|
| `createdAt` ほか | ISO string | microCMS 共通メタデータ。|

## project (リスト型)

| フィールド | 型 | 備考 |
|------------|----|------|
| `id` | string | コンテンツID。|
| `title` | string | 作品タイトル。|
| `thumbnail` | image | 一覧表示用のメイン画像。|
| `description` | rich text | 作品の説明文。空のエントリもあり。|
| `date` | ISO string | 制作年月。|
| `genre` | string[] | ジャンル。|
| `images` | image[] | ギャラリー画像。|
| `createdAt` ほか | ISO string | microCMS 共通メタデータ。|

> ※ `skill`, `url`, `github` フィールドは現在のコンテンツでは未使用ですが、スキーマ上は追加されている可能性があるため型定義では optional のまま確保しています。
