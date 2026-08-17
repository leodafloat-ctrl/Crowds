# Crowds

Crowds 是一款手機優先的社群帳號觀察遊戲。玩家會查看虛構貼文、留言、互動數字與個人頁面，再判斷帳號屬於真人、協同行動帳號或行銷帳號。

> 遊戲中的人物、帳號、政黨、貼文與事件皆為虛構；相似之處純屬巧合。

## 本機執行

需要 Node.js 22.13.0 以上版本。

```bash
npm install
npm run dev
```

若要單獨預覽 GitHub Pages 的純靜態版本：

```bash
npm run dev:pages
npm run build:pages
```

`npm run build` 仍會驗證原本的 Sites/Vinext 版本；兩種部署方式可以並存。

## 發布到 GitHub Pages

專案已包含 `.github/workflows/deploy-pages.yml`。把專案推送至 GitHub 後：

1. 進入 repository 的 **Settings → Pages**。
2. 在 **Build and deployment** 的 **Source** 選擇 **GitHub Actions**。
3. 推送到 `main`，或在 **Actions** 頁面手動執行部署流程。

一般 repository 的網址會是：

```text
https://你的帳號.github.io/你的-repository名稱/
```

建置流程會自動讀取 repository 名稱，因此放在子路徑時，圖片與程式檔案仍能正確載入。

## 在同一個 repository 增加頁面

如果新內容仍屬於 Crowds，例如「玩法說明」、「製作名單」或「題庫介紹」，建議放在同一個網站，網址可做成 `/about/`、`/credits/` 等路徑。這個專案使用 Vite 靜態入口；新增頁面時可建立：

```text
github-pages/about/index.html
github-pages/about/main.tsx
```

再把該 HTML 加入 `vite.pages.config.ts` 的 `build.rollupOptions.input`，Vite 就會一起產生多頁網站。

如果要放的是另一個完全獨立的遊戲或產品，建議另開 repository。每個 project repository 都可以有自己的 Pages 網址，例如：

```text
https://你的帳號.github.io/crowds/
https://你的帳號.github.io/另一個遊戲/
```

也可以另外建立 `你的帳號.github.io` repository，當成所有作品的入口首頁，再連到各個遊戲。
