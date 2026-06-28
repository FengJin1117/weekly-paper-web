# 每周论文推荐

`weekly-paper-web` 是一个用于整理和展示每周论文推荐的 GitHub Pages 静态网页。论文来源放在 `markdowns/`，站点会自动解析每周 Markdown，生成首页卡片、每周详情页、论文统计和全局阅读进度。

## 功能

- 首页显示自动统计的已阅读论文数、推荐论文总数和每周推荐入口。
- 每周推荐以长方块卡片展示，包含关键词、推荐论文数和阅读进程。
- 支持按时间正序或倒序浏览，默认最新一期在上。
- 每篇论文可以点击“标记已读 / 已阅读”切换状态，已读为绿色，未读为灰色。
- 阅读状态保存在仓库文件 `data/read-status.json`，适合单人维护并通过 GitHub 同步。

## 本地使用

生成或刷新站点数据：

```bash
node scripts/generate-site.js
```

启动可写入阅读状态的本地网页：

```bash
node scripts/serve-local.js
```

然后打开：

```text
http://127.0.0.1:8000/
```

在每周详情页点击论文左侧的“标记已读”即可写入 `data/read-status.json`；再次点击“已阅读”可以撤销。

也可以用命令行维护阅读状态：

```bash
node scripts/mark-read.js list
node scripts/mark-read.js read <paper-id>
node scripts/mark-read.js unread <paper-id>
node scripts/mark-read.js toggle <paper-id>
```

更新阅读状态后提交并推送：

```bash
git add data/read-status.json data/papers.json
git commit -m "Update paper reading status"
git push
```

## 添加每周推荐

1. 在 `markdowns/` 中添加新的 Markdown 文件，文件名中包含日期即可，例如 `weekly_paper_recommendation_2026-06-25.md`。
2. 每篇论文使用 `## Top N. Paper Title` 作为标题。
3. 推荐填写 `链接`、`关键词`、`推荐优先级`、`建议` 等字段。
4. 运行 `node scripts/generate-site.js` 重新生成数据。

## 目录结构

```text
.
├── index.html
├── week.html
├── app.js
├── styles.css
├── markdowns/
├── data/
│   ├── papers.json
│   └── read-status.json
├── scripts/
│   ├── generate-site.js
│   ├── mark-read.js
│   └── serve-local.js
└── .github/workflows/pages.yml
```

## 发布 GitHub Pages

本项目使用 GitHub Actions 发布。推送到 `main` 后，`.github/workflows/pages.yml` 会自动生成数据并部署站点。

首次使用时，需要在 GitHub 仓库的 `Settings -> Pages` 中将发布来源设置为 `GitHub Actions`。发布后访问：

```text
https://fengjin1117.github.io/weekly-paper-web/
```
