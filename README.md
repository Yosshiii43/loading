# loading

## ローディングアニメーション（three-dots）


### 1. 目的
初回アクセス時のみローディングアニメーションを表示し、  
同一タブで 2 回目以降はスキップします。  
アニメーションの種類は [three-dots](https://github.com/nzbin/three-dots)（MIT） を使用し、  
`dot-pulse`, `dot-elastic` など 1 行切り替えで変更できます。

---

### 2. 構成ファイル
.
├─ scss/
│  ├─ vendor/
│  │   └─ three-dots/          
│  │       ├─ three-dots.scss  # three-dots 入口（バナー + @use 群）
│  │       ├─ _dot-bricks.scss # three-dots の表示パターンのバリエーション
│  │       └─ LICENSE          
│  │
│  └─ object/
│      └─ component/
│          ├─ _loader.scss       # ローディングアニメ配置
│          ├─ _loaderWrap.scss   # ローディング画面全体
│          └─ _wrapper.scss  　　 # コンテンツ全体をラップ
│      └─ project/
│          └─ _skip-loader.scss   # 2 回目以降スキップ用
│
├─ css/                           # ビルド後の CSS 出力先
│  ├─ three-dots.css              # three-dots 専用
│  └─ style.css                   # その他のスタイル
│
├─ js/
│  └─ main.js                     # sessionStorage 制御
│
└─ index.html

---

### 3. ビルド手順（例：npm scripts）

```jsonc
{
  "scripts": {
    "build:lib":   "sass scss/vendor/three-dots/three-dots.scss css/three-dots.css --style=compressed",
    "build:style": "sass scss/style.scss css/style.css --load-path=scss --style=compressed",
    "build":       "npm run build:lib && npm run build:style"
  }
}
```

---

### 4. HTMLでの読み込み
#### heade内に
```html
  <script>
    if (sessionStorage.getItem('isFirstLoad')) {
      document.documentElement.classList.add('p-skipLoader');
    }
  </script>
  <link rel="stylesheet" href="css/three-dots.css">
  <link rel="stylesheet" href="css/style.css">
```

#### body内に

```html
<div class="c-loadingWrap js-loadingWrap">
  <div class="c-loading">
    <div class="dot-pulse"></div> <!-- ← ここのクラス名を変える -->
  </div>
</div>

<!-- メインコンテンツ -->
<div class="c-wrapper is-hidden">
  …
</div>
```

| アニメーション名 | 対応SCSSファイル |
|---------------|----------------|
| dot-pulse | three-dots/dot-pulse.scss |
| dot-elastic | three-dots/dot-elastic.scss |
| その他 | 上記と同じ命名規則 |

#### 切り替え手順
1.	上表を見て <div class="dot-◯◯"></div> のクラス名を変更
2.	追加アニメを使う場合は three-dots.scss で対象モジュールを @use する

---

### 4. 動作フロー（JS）
1.	ページ読み込み → main.js が sessionStorage.isFirstLoad をチェック
2.	値が無ければローディング表示 + フェードアウト（CSS is-fadeout）完了後にフラグを true へ保存
3.	2 回目以降は <html class="p-skipLoader"> が付与され .c-loadingWrap { display:none !important; } で完全スキップ

---

### 5. カスタマイズ
| 項目  | 方法   |
|------|-------|
| フェード時間 | _loader.scss の @keyframes fade と .is-fadeout { animation: … 3s; } を同じ値にする|
| 背景色      | .c-loadingWrap { background:#fff; } を変更
| ローディング非表示条件変更  | main.js 内の sessionStorage 処理を書き換える（例: localStorage に変更）|


---

### 6. ライセンス
•	three-dots: MIT（third_party/three-dots/LICENSE）
•	本プロジェクト: © 2025 Yosshiii, MIT

---

### 7. サードパーティライブラリ

| ライブラリ | ライセンス | 備考 |
|------------|-----------|------|
| three-dots (v0.3.2) | MIT | © 2018 nzbin / `third_party/three-dots/LICENSE` 参照 |