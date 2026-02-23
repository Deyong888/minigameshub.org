## MiniGamesHub 多语言实现 SOP

> 目标：在现有 en / es / zh 架构基础上，高效扩展印地语（hi）、日语（ja）以及更多语言。

---

### 一、总体架构概览

- 技术栈：Astro 5 + Astrowind 模板 + Tailwind
- 多语言核心位置：
  - 站点级语言配置：[`astro.config.ts`](./astro.config.ts)
  - UI 文案与语言工具：[`src/utils/i18n.ts`](./src/utils/i18n.ts)
  - 语言切换组件：[`src/components/common/LanguagePicker.astro`](./src/components/common/LanguagePicker.astro)
  - 导航链接生成：[`src/navigation.ts`](./src/navigation.ts)
  - 各语言页面目录：`src/pages/` 下的 `es/`、`zh/` 目录（英文为默认根目录）
  - 搜索、博客等使用 `getLangFromUrl` / `useTranslations` 的功能页

多语言的本质思路：
1. **路由层**：URL 前缀代表语言（`/es/...`、`/zh/...`，默认英文无前缀）。
2. **文案层**：所有导航/按钮/搜索/博客等通用 UI 文案集中在 `i18n.ts` 内，通过 key 访问。
3. **内容层**：SEO 重要页面采用“每种语言一套页面文件”的方式维护（例如 `/bored-games` + `/es/bored-games` + `/zh/bored-games`）。
4. **工具层**：`getLangFromUrl`、`useTranslations`、`LanguagePicker` 与导航封装，保证新增语言只需少量集中改动即可接入全站。

---

### 二、增加新语言的最小必需改动

下面以新增印地语（hi）和日语（ja）为例，所有其它语言完全类比执行。

#### 步骤 1：在 Astro 全局配置中注册语言

文件：[`astro.config.ts`](./astro.config.ts)

1. 找到 `i18n` 配置：
   ```ts
   i18n: {
     defaultLocale: 'en',
     locales: ['en', 'es', 'zh'],
     routing: {
       prefixDefaultLocale: false,
     },
   },
   ```
2. 将新语言加入 `locales` 数组：
   ```ts
   locales: ['en', 'es', 'zh', 'hi', 'ja'],
   ```

> 作用：让 Astro 识别这些语言，并在 `Astro.currentLocale` / 路由前缀上支持它们。

#### 步骤 2：在 i18n 工具中声明语言与文案结构

文件：[`src/utils/i18n.ts`](./src/utils/i18n.ts)

1. **languages 映射中增加新语言**：
   ```ts
   export const languages = {
     en: 'English',
     es: 'Español',
     zh: '简体中文',
     hi: 'Hindi',
     ja: '日本語',
   };
   ```

2. **ui 文案对象中增加对应语言分支**：
   - 当前结构为：
     ```ts
     export const ui = {
       en: { ... },
       es: { ... },
       zh: { ... },
     } as const;
     ```
   - 按照 `en` 的 key 集合，新增：
     ```ts
     ui.hi = {
       'nav.home': '...',          // 印地语翻译
       'nav.boredAtWork': '...',   // 以下所有 key 都要覆盖
       ...
     };

     ui.ja = {
       'nav.home': '...',
       'nav.boredAtWork': '...',
       ...
     };
     ```

**规范要求：**
- **必须保持 key 集合与 `ui.en` 完全一致**（缺失 key 会回退到英文，但为了体验和后续 AI 维护，建议逐个补全）。
- 特别注意分类 key：`cat.xxx`、搜索 `search.xxx`、博客 `blog.xxx`、cookie 提示 `cookie.xxx` 等，这些直接影响导航、分类页、搜索 UI、博客分页等组件。

`useTranslations(lang)` 已经实现：
- 优先读取 `ui[lang][key]`，缺失时自动回退到 `ui.en[key]`。
- 支持占位符 `{0}`、`{1}` 通过第二个参数数组替换。

因此，一旦 `languages` + `ui` 配齐，新语言自动接入现有所有使用 `t('...')` 的组件：
- 导航、按钮、搜索、博客、CookieBanner、游戏详情页分类名称等。

#### 步骤 3：语言切换（LanguagePicker）中自动生效

文件：[`src/components/common/LanguagePicker.astro`](./src/components/common/LanguagePicker.astro)

该组件：
- 从 `languages` 中读取所有语言 key 及显示名称；
- 根据当前 URL 判断前缀并生成新语言对应的路径：
  - `/es/...` → 切到 `/zh/...` / `/hi/...` / `/ja/...`
  - `/...`（默认 en）→ 切到 `/hi/...` 时，在前面加 `/hi`。

由于它直接使用 `languages` 对象：
- **新增语言时只要更新 `languages`，语言切换器会自动多出对应选项**；
- 无需改动组件逻辑。

#### 步骤 4：导航链接与菜单自动适配

文件：[`src/navigation.ts`](./src/navigation.ts)

关键函数：
```ts
const getLink = (path: string, lang: string) => {
  if (path.startsWith('/blog')) {
    return getPermalink(path);
  }

  const prefix = lang === 'en' ? '' : `/${lang}`;
  return getPermalink(`${prefix}${path}`);
};
```

说明：
- 对于非博客链接：
  - 英文：`/bored-games` → `/bored-games`
  - 西语：`/bored-games` → `/es/bored-games`
  - 中文：`/bored-games` → `/zh/bored-games`
  - 新语言 hi：`/bored-games` → `/hi/bored-games`
  - 新语言 ja：`/bored-games` → `/ja/bored-games`
- 文案文本 `label` 来自 `useTranslations(lang)`，因此在 `ui.hi` / `ui.ja` 中补齐导航相关 key 即可。

> 结论：新增语言只需改 `i18n.ts` 和 `astro.config.ts`，主导航就会自动产生新语言版本的菜单链接。

---

### 三、页面内容层的多语言策略

目前站点采用 **“结构相同 + 内容独立”** 的方式维护多语言页面：
- 英文为默认：`src/pages/...`
- 西语：`src/pages/es/...`
- 中文：`src/pages/zh/...`

典型例子：
- 英文无聊游戏页：`src/pages/bored-games/bored-at-work.astro`
- 西语版本：`src/pages/es/bored-games/bored-at-work.astro`
- 中文版本：`src/pages/zh/bored-games/bored-at-work.astro`

#### 新语言页面目录的建立步骤

以新增 `hi` 为例：

1. 在 `src/pages/` 下创建 `hi/` 目录：
   - 推荐结构直接复制 `es` 或 `zh` 目录作为起点：
     - `src/pages/hi/bored-games/...`
     - `src/pages/hi/mini-games/...`
     - `src/pages/hi/relax-games/...`
     - `src/pages/hi/browser-games/...`
     - `src/pages/hi/html5-games/...`
     - `src/pages/hi/small-games/...`
     - `src/pages/hi/arcade-games/...`
     - `src/pages/hi/index.astro`（首页）等。

2. 对于每个复制过来的页面：
   - **修改 `metadata`**：
     - `title`
     - `description`
     - schema 中的 `"name"`, `"description"`, `"url"`（注意 URL 中加入 `/hi/`）。
   - **正文内容全部翻译为目标语言**：
     - Heading（`<h1>`, `<h2>`）
     - 段落 `<p>`
     - 列表 `<li>`
   - **内部链接**：
     - 所有指向同一语言内页面的链接加上 `/hi` 前缀，例如：
       - `/bored-games` → `/hi/bored-games`
       - `/mini-games/action` → `/hi/mini-games/action`
   - **游戏详情页链接**：
     - 列表页、网格组件的链接一般已经通过 `GameCard` 自动处理（根据 URL 推断语言），无需手动改。

3. 日语（`ja`）完全类似：建立 `src/pages/ja/`，按上述规则翻译与修正链接。

> 建议：先确定“每种语言最少要覆盖的核心页面集合”（首页 + 核心分类 + 关键组合页），其它长尾可以逐步补充。

---

### 四、动态路由与语言自动识别

#### 游戏详情页动态路由

文件：[`src/pages/game/[id]-[slug].astro`](./src/pages/game/%5Bid%5D-%5Bslug%5D.astro) 及 `zh/es` 对应版本。

关键点：
- `getStaticPaths()` 生成所有游戏的 `[id]-[slug]` 路径。
- 语言由 `getLangFromUrl(Astro.url)` 自动根据 URL 前缀识别：
  - `/game/ID-slug` → `en`
  - `/es/game/ID-slug` → `es`
  - `/zh/game/ID-slug` → `zh`
  - `/hi/game/ID-slug` → `hi`
  - `/ja/game/ID-slug` → `ja`
- 文案、分类名等通过 `useTranslations(lang)` 和 `cat.xxx` key 实现本地化。

因此：
- 新语言 **不需要再新建单独的 `[id]-[slug].astro` 文件**；
- 只要 URL 前缀正确，`getLangFromUrl` 就能识别语言并加载对应翻译。

#### 分类、博客、搜索等动态/列表页

典型文件：
- `src/pages/es/category/[slug].astro`
- `src/pages/zh/category/[slug].astro`
- `src/pages/search.astro`
- 各语言博客列表、文章页等。

通用模式：
- 使用 `getLangFromUrl(Astro.url)` 得到当前语言；
- 使用 `useTranslations(lang)` 得到 `t` 函数；
- 使用 `cat.xxx`、`blog.xxx`、`search.xxx` 等 key 进行本地化。

对新增语言的影响：
- 只要 `i18n.ts` 中对应 key 已翻译好，这些动态页在新语言下会自动使用正确的文本。

---

### 五、搜索（Pagefind）与多语言

相关文件：
- 搜索弹窗组件：[`src/components/common/Search.astro`](./src/components/common/Search.astro)
- 独立搜索页面：[`src/pages/search.astro`](./src/pages/search.astro)

注意事项：
- 搜索文案（标题、描述、占位符、无结果提示）来自 `i18n.ts` 中 `search.xxx` key。
- 搜索逻辑本身是对整个静态站点索引的，Pagefind 根据页面 `<html lang="...">` 和内容进行多语言支持。

扩展新语言时：
1. 在 `ui.hi`、`ui.ja` 中补全：
   - `search.title`
   - `search.description`
   - `search.placeholder`
   - `search.noResults`
2. 确保新语言页面 `<html lang="hi">` / `<html lang="ja">`。Astro i18n + 布局一般会自动设置。
3. 构建之后运行 Pagefind 重新索引（CI 或本地命令），保证新语言页面被收录。

---

### 六、SEO 与站点地图层面的注意点

1. 每种语言页面的 `metadata.title`、`metadata.description` 必须是该语言的自然表述，包含主要关键词。
2. schema.org 部分：
   - `"url"` 字段必须使用对应语言前缀：如 `/hi/...`、`/ja/...`。
   - `"inLanguage"` 建议标明，如 `"inLanguage": "hi"`、`"inLanguage": "ja"`。
3. 站点地图与 RSS：
   - 当前已经通过 Astrowind 的集成自动生成，只要页面在 `src/pages` 下，就会进入 sitemap。
   - 新语言页创建后会自动出现在 sitemap 和 Pagefind 索引中。

---

### 七、为 AI 扩展新语言时的执行顺序建议

后续如果让 AI 自动扩展印地语、日语或更多语言，可以直接遵循下面的执行顺序：

1. **注册语言**
   - 修改 `astro.config.ts` → 在 `i18n.locales` 中加入新语言代码。
   - 修改 `src/utils/i18n.ts` → 在 `languages` 与 `ui` 中添加新语言结构，先用英文占位，后续再翻译。

2. **生成新语言页面骨架**
   - 复制 `src/pages/es` 或 `src/pages/zh` 为新目录 `src/pages/{lang}`。
   - 确保所有内部链接前缀替换为 `/{lang}`。

3. **批量翻译与润色**
   - 优先翻译：首页、核心分类页、主要专题页（如 bored-games 系列）。
   - 再处理：长尾分类页与说明文字。

4. **检查动态路由与组件**
   - 确认 `LanguagePicker` 出现新语言；
   - 随机访问几条 `/hi/...`、`/ja/...` 路径，确认导航、搜索、CookieBanner 文案均为对应语言。

5. **运行检测与构建**
   - 执行：`npm run check:astro`，确保无类型/语法错误；
   - 执行：`npm run build` + Pagefind 索引命令，检查搜索是否包含新语言内容。

6. **最终回顾**
   - 抽查：
     - URL 规范是否统一（无多余尾斜杠、前缀正确）；
     - 语言切换是否在相同页面之间跳转（bored-games → hi/ 同路径）；
     - 搜索结果中是否出现新语言页面的标题与摘要。

---

以上流程确保：
- 新语言能在 **URL、导航、文案、搜索、SEO** 各层面完整接入；
- 修改集中在少数几个核心文件，便于 AI 快速理解和批量操作；
- 对后续再增加更多语言（如法语、德语等）同样适用，只需按此 SOP 重复执行。

