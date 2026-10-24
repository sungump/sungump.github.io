# sungump.github.io

孙志翔的个人主页 + 技术博客，线上地址：<https://sungump.github.io>

基于 [Astro](https://astro.build) 构建的纯静态站点（页面不包含任何客户端 JavaScript），通过 GitHub Actions 自动部署到 GitHub Pages。

## 目录结构

```text
.
├── .github/workflows/deploy.yml   # 推送到 main 后自动构建并部署
├── public/                        # 原样拷贝到站点根目录的静态文件（favicon、简历 PDF、图片等）
├── src/
│   ├── content/blog/              # ← 博客文章（Markdown），放进来就会自动发布
│   ├── data/profile.ts            # ← 个人信息：简介、经历、项目、技能、简历链接
│   ├── pages/                     # 路由页面（首页、博客列表/详情、标签、RSS、404）
│   ├── components/  layouts/      # 公共组件与页面布局
│   ├── lib/posts.ts               # 文章排序、标签统计、阅读时长等工具函数
│   └── styles/global.css          # 全局样式（深色主题配色都在 :root 变量里）
└── astro.config.mjs
```

## 本地开发

需要 Node.js 22（版本见 `.nvmrc`，要求 ≥ 22.23.4）。

```bash
npm install
npm run dev       # 本地预览：http://localhost:4321，修改后自动刷新
npm run check     # 类型检查
npm run build     # 构建到 dist/
npm run preview   # 预览构建结果
```

## 修改个人信息

几乎所有个人内容都集中在 **`src/data/profile.ts`**：

| 字段 | 说明 |
| --- | --- |
| `profile` | 姓名、一句话介绍、求职方向、GitHub、邮箱、简历链接 |
| `experiences` | 实习经历（公司、岗位、时间、工作要点、标签） |
| `projects` | 项目卡片；`placeholder: true` 的是占位示例，替换后删掉该字段即可去掉“占位示例”标记 |
| `skills` | 技能分组；值为 `'TODO'` 的条目会显示为黄色 TODO 标记 |

全站搜索 `TODO` 可以找到所有需要补充的占位内容：

```bash
grep -rn "TODO" src/
```

### 上传简历

1. 把简历 PDF 放到 `public/resume.pdf`；
2. 在 `src/data/profile.ts` 中设置 `resumeUrl: '/resume.pdf'`。

未设置时，首页会显示“简历 待上传”的占位按钮。

### 设置邮箱

把 `profile.email` 从 `TODO@example.com` 改成真实邮箱，首页会自动变成可点击的 `mailto:` 链接。

## 写博客

**在 `src/content/blog/` 下新建一个 `.md` 文件即可**，文件名就是文章网址：

`src/content/blog/my-first-post.md` → `https://sungump.github.io/blog/my-first-post/`

文件开头写上 frontmatter：

```markdown
---
title: '文章标题'
description: '一句话摘要，显示在列表页和搜索引擎中'
date: 2026-11-01
tags: ['ros2', 'cpp']
---

正文从这里开始，支持标准 Markdown：标题、列表、表格、引用、代码块（自动高亮）等。
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，格式 `YYYY-MM-DD`，列表按它倒序排列 |
| `description` | 否 | 摘要 |
| `tags` | 否 | 标签数组，会自动生成 `/tags/<标签>/` 页面。建议用小写英文或中文，避免空格和 `+` 等符号 |
| `updated` | 否 | 更新日期 |
| `draft` | 否 | 设为 `true` 时只在本地 `npm run dev` 中可见，不会发布 |
| `sample` | 否 | 设为 `true` 时显示“示例”标记（仅示例文章使用） |

小贴士：

- 文件名建议用小写英文和连字符（如 `ros2-qos-notes.md`），这样网址更干净。
- 文章里的图片可以放在 `public/images/` 下，用 `![说明](/images/xxx.png)` 引用。
- 也可以用子目录归类（如 `src/content/blog/ros2/qos.md`），网址会变成 `/blog/ros2/qos/`。
- 当前两篇文章（`ros2-node-basics.md`、`cpp-smart-pointers.md`）是**示例文章**，可以直接删除。
- 文章会自动出现在博客列表、首页“最新文章”、标签页和 RSS（`/rss.xml`）中。

## 部署

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动执行 `npm ci → npm run check → npm run build`，并把 `dist/` 发布到 GitHub Pages。针对 `main` 的 Pull Request 只做构建检查，不会部署。

**首次部署前需要做一次设置**：仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

也可以在 Actions 页面手动触发 “Deploy to GitHub Pages” 工作流重新部署。
