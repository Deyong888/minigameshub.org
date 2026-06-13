# AdSense 发布商审核报告 — MiniGamesHub.org

审核日期: 2026-06-13

---

## [Risk Rating]: **高拒绝风险**

主要瓶颈：隐私政策声明"just a Demo"会被 Google 直接拒绝；联系表单无提交后端，且文案完全复制自模板，不是游戏站点的真实内容。以下任一单项即可导致审核不通过。

---

## [Critical Fixes] — 修复后才有资格提交审核

### 1. 隐私政策（`/privacy`）— 最高优先级

- **"This Privacy Policy is just a Demo"（第 10 行）必须删除。** 这是一行致命文本，Google 审核员看到就会直接拒绝。
- **必须添加以下 AdSense 强制性条款：**
  - 明确声明使用第三方广告商（Google AdSense）投放广告
  - 明确声明 Google 使用 Cookie 投放基于兴趣的广告（DART Cookie）
  - 提供用户如何选择退出个性化广告的说明（如 https://optout.networkadvertising.org/）
  - 引用 Google 的《广告 Cookie 隐私政策》：https://policies.google.com/technologies/ads
  - 提供 CCPA 相关的数据出售选择退出机制说明
  - 提供 GDPR 相关的用户数据权利说明
- **统一联系邮箱**：文末 `contact@minigameshub.org` 与正文 `support@synthflowdigital.com` 不一致，取其一即可。

### 2. 联系页面（`/contact`）— 必须重写

- **表单无提交后端：** 当前 `<form>` 没有 `action` 或 `method`，提交后无任何效果。必须接入可用的表单后端（如 Formspree、Netlify Forms、或自建 API）。
- **文案完全复制自 AstroWind 模板：** 以下描述完全不适用于游戏门户，必须替换：
  - "payment issues, accessing purchased templates or general questions about the website's functionality"
  - "questions about purchases, customization options, licensing for commercial use, inquiries about specific template"
  - "template installation, problems editing difficulties, compatibility issues with software or download errors"
  
  改为游戏站点真实场景：游戏无法加载、分类建议、反馈报告、广告合作咨询等。

### 3. 关于我们（`/about`）— 完善 E-E-A-T

- 当前内容过于笼统，无个人身份标识。建议添加：
  - 运营团队介绍或编辑身份标识
  - 内容审核流程（如何筛选和归类游戏）
  - 网站运营时间 / 里程碑
- 删除或替换 Unsplash 通用配图，使用本站真实截图或品牌素材

### 4. 印地语（hi）区域页面严重缺失

- `en` 和 `es`、`zh` 各有 17 个路由页面，`hi` 仅有 2 个（首页和 mini-games 目录）。
- Header/Footer 导航链接指向的 `/hi/relax-games`、`/hi/bored-games` 等页面不存在，用户点击会 404。
- 修复方案：补齐缺失页面，或暂时禁用印地语导航链接，直到页面就绪。

---

## [Value Enhancement Plan] — 提升内容质量以降低 Low Value 标签风险

### 5. 分类页面增加深度内容

当前大部分分类页面的描述仅 1–2 句话（如 "Play the best free online **{category} games**. Browser-based, no download, instant fun."）。Google 倾向于将这类薄内容页面标记为 Low Value。

为以下类型的页面各增加 300–500 字原创内容（H2 + 段落 + 列表）：

- 主分类首页（`/mini-games`, `/bored-games`, `/arcade-games` 等）— 建议 500+ 字
- 子分类页面（`/mini-games/arcade`, `/bored-games/bored-at-work` 等）— 建议 300+ 字

内容方向示例（以 `bored-at-work` 为例）：
- 什么样的游戏适合上班摸鱼（无声、可快速切换、不需要持续注意力）
- Boss Key 功能的使用场景
- 推荐前 5 款游戏及为什么

### 6. 游戏详情页增加个性化内容

当前 "How to Play" 板块对所有游戏都输出相同的通用文案：

> "Use keyboard arrows or WASD to control. Space to jump/action."

建议根据游戏 `category` 或 `tags` 做差异化：
- 益智/棋牌类：操作指南 + 规则简介
- 动作/射击类：控制键位 + 得分技巧
- 赛车/体育类：操控说明 + 模式介绍

也可对热门游戏单独编写个性化玩法和攻略。

### 7. 增加独立内容页

当前站点的原创文字内容主要集中在首页 FAQ 和分类页面的薄描述。建议增加：

- 游戏榜单（"2026 年最佳 10 款摸鱼游戏"、"最受欢迎的街机游戏 Top 20"）
- 游戏指南 / 分类导航文章
- 这些可以放在博客模块（已在配置中开启 `isEnabled: true`）

---

## [Layout Adjustment Recommendations] — 预防意外点击违规

### 8. 广告位与互动元素安全间距

当前游戏卡片（GameCard）的点击区域是整张卡片。如果未来将 AdSense 广告单元置于：

- 网格之间（如 `GameGrid` 中穿插广告位）
- 卡片行之间
- 侧边栏

必须确保：
- 广告与可点击元素（游戏卡片、按钮）之间的间距 ≥ 150px
- 广告与游戏 iframe 之间有明显分隔线或留白
- 不要在游戏 iframe 上方或内部叠加广告单元
- 移动端广告与触摸目标保持足够间距

### 9. 广告单元布局检查清单

- 不放置于导航菜单下方 150px 以内
- 不放置于"Play Now"按钮周边 150px 以内
- 不放置于游戏 iframe 全屏状态下可见的区域
- 广告标签与网站内容清晰区分（标注"广告"或"Sponsored"）

### 10. 移动端适配检查

虽然基于 Tailwind 响应式框架，仍需确认：
- 窄屏下广告不重叠文字内容
- 菜单展开后不遮挡广告标签
- 游戏卡片在移动端的点击热区合理（44x44px 最低标准）

---

## [Indexation Readiness] — 审核通过

- **robots.txt** ✅ 存在且允许全部爬虫，指向 sitemap-index.xml
- **sitemap.xml** ✅ Astro sitemap 集成自动生成（`@astrojs/sitemap`）
- **页面数量** ✅ 5000+ 游戏详情页 + 20+ 分类/子分类页 + About/Contact/Policy 等
- **Schema.org 结构化数据** ✅ 分类页用 `CollectionPage` / `ItemList`，详情页用 `VideoGame` + `AggregateRating`

---

## 修复优先级排序

| 优先级 | 事项 | 影响 |
|---|---|---|
| 🔴 P0 | 隐私政策删除"Demo"字样 + 补充 AdSense 条款 | 致命 — 不修直接拒 |
| 🔴 P0 | 联系表单接入可用后端 + 重写文案 | 致命 — 必须可用 |
| 🔴 P0 | 印地语区域补充缺失页面或禁用导航 | 致命 — 导航 404 |
| 🟡 P1 | 分类页面增加深度内容（300–500 字） | 重要 — 降低 Low Value 风险 |
| 🟡 P1 | 关于我们补充 E-E-A-T 信息 | 重要 — 建立信任 |
| 🟢 P2 | 游戏详情页个性化 How to Play | 加分 |
| 🟢 P2 | 广告位布局预留安全间距 | 预防性 |
