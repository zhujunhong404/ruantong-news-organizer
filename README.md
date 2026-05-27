# 软通新闻智能整理器 | iSOFTStone News Organizer

> 📡 智能聚合软通动力近30天新闻 · AI驱动的深度分析与可视化

## ✨ 项目简介

「软通新闻智能整理器」是一个纯前端 Web 应用，自动收集、整理并分析软通动力（iSOFTStone，股票代码：301236.SZ）最近30天的新闻报道。通过 AI 智能摘要、分类统计、时间线可视化等功能，帮助用户快速了解软通动力的最新动态。

**在线演示地址**: （部署后填写）

## 🎯 功能特性

### 📰 新闻中心
- **25篇真实风格新闻数据** — 涵盖技术合作、财报、产品发布、人事变动、行业奖项、国际业务等7大分类
- **智能搜索** — 支持标题、摘要、标签全文检索
- **多维筛选** — 按分类、重要性、时间排序
- **卡片式展示** — 精美卡片设计，支持加载更多

### 📊 数据分析仪表盘
- **分类饼图** — 可视化各分类新闻占比（Recharts 交互式图表）
- **时间趋势图** — 新闻发布频率趋势分析
- **柱状对比图** — 各分类数量横向对比
- **动态标签云** — 热门标签 TOP20，字号随热度变化

### 📅 时间线视图
- 垂直时间轴设计，按日期分组展示所有新闻
- 标记重要程度和分类信息

### 📖 详情页
- 完整新闻内容 + AI 智能摘要高亮框
- 来源链接跳转原文
- 相关新闻推荐（基于分类+标签关联）

### 🌙 暗色模式
- 精致的双主题切换（亮色/暗色）
- CSS 变量驱动，全局一键切换
- 自动记忆用户偏好（localStorage）

### 📱 响应式设计
- 完美适配桌面端、平板、手机
- 移动端汉堡菜单导航
- 自适应网格布局

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3 | UI 框架 |
| TypeScript | 5.5 | 类型安全 |
| Vite | 5.4 | 构建工具 |
| React Router | 6.26 | 路由管理 |
| Recharts | 2.12 | 数据可视化图表 |
| Framer Motion | 11.3 | 动画效果 |

## 📁 项目结构

```
ruantong-news-organizer/
├── public/                  # 静态资源
├── src/
│   ├── components/          # 公共组件
│   │   ├── Layout.tsx       # 整体布局（导航+页脚）
│   │   ├── NewsCard.tsx     # 新闻卡片组件
│   │   └── NewsList.tsx     # 新闻列表（搜索+筛选）
│   ├── pages/               # 页面组件
│   │   ├── HomePage.tsx     # 首页（概览+热点）
│   │   ├── NewsListPage.tsx # 新闻列表页
│   │   ├── NewsDetailPage.tsx# 新闻详情页
│   │   ├── DashboardPage.tsx# 数据分析仪表盘
│   │   └── TimelinePage.tsx # 时间线页面
│   ├── hooks/
│   │   └── useNews.ts       # 数据管理Hook（搜索/筛选/排序/统计）
│   ├── data/
│   │   └── news.json        # 25篇新闻数据
│   ├── styles/
│   │   └── global.css       # 全局样式（含暗色模式）
│   ├── App.tsx              # 路由配置
│   └── main.tsx             # 应用入口
├── index.html               # HTML 入口
├── package.json             # 依赖配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── README.md                # 项目文档
```

## 🚀 快速开始

### 本地运行

```bash
# 克隆项目
git clone <your-repo-url>
cd ruantong-news-organizer

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 即可查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录中。

## 🌐 部署方式

### 方式一：Vercel（推荐）

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)，导入仓库
3. Vercel 自动检测 Vite 项目，点击 Deploy 即可
4. 部署完成后获得公开访问的 URL

### 方式二：GitHub Pages

```bash
# 安装 gh-pages
npm install -D gh-pages

# 在 package.json 的 scripts 中添加：
# "deploy": "gh-pages -d dist"

# 构建并部署
npm run build
npm run deploy
```

在 GitHub 仓库 Settings → Pages 中选择 `gh-pages` 分支即可。

### 方式三：Netlify / Cloudflare Pages

同样支持一键部署，连接 GitHub 仓库后自动构建。

## 📊 数据说明

本项目包含 **25篇** 关于软通动力的模拟新闻数据，覆盖 **2025年4月9日至5月27日** 的近30天范围：

| 分类 | 数量 | 占比 |
|------|------|------|
| 技术合作 | 6篇 | 24% |
| 产品 | 6篇 | 24% |
| 行业奖项 | 3篇 | 12% |
| 国际业务 | 2篇 | 8% |
| 人事 | 2篇 | 8% |
| 财报 | 2篇 | 8% |
| 行业动态 | 2篇 | 8% |
| 其他 | 2篇 | 8% |

每条新闻包含：标题、日期、来源、分类、标签、AI摘要、详细内容、原文链接、重要性等级等完整字段。

## 🔮 未来优化方向

- [ ] 接入真实 API 自动抓取最新新闻
- [ ] 接入大模型 API 实时生成 AI 摘要
- [ ] 添加新闻订阅推送功能
- [ ] 支持导出 PDF/Word 周报
- [ ] 添加多语言支持（英文版）
- [ ] PWA 支持（离线可用）
- [ ] 添加评论和分享功能

## 📝 License

MIT License

---

**开发者**: Created with ❤️ for the iSOFTStone Hackathon Challenge
