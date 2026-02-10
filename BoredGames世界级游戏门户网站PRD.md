MiniGamesHub - 世界级游戏门户网站PRD文档
AI编程执行版 v4.0
文档版本: v4.0 - AI执行优化版
创建日期: 2026-02-06
最后更新: 2026-02-06
状态: 可直接用于AI编程工具（Trae/Cursor）
目标: 打造与Y8、CrazyGames竞争的世界级HTML5游戏门户
执行摘要（AI必读）
本文档定义了MiniGamesHub的完整技术规范。这是一个采用Astro 5.x构建的HTML5游戏门户网站，核心差异化定位是"工作/学习间隙的即时游戏"，通过多关键词SEO矩阵和极致用户体验，目标成为全球Top 10的在线游戏门户。

核心SEO关键词矩阵（必须严格执行）

| 关键词层级 | 核心关键词 | 月搜索量 | 竞争度 | 页面类型 |
| :--- | :--- | :--- | :--- | :--- |
| L1 - 品牌词 | MiniGamesHub | - | 低 | 首页 |
| L2 - 场景词 | games to play when bored | 90K | 中 | 首页/分类页 |
| L2 - 场景词 | bored at work games | 45K | 中 | 场景分类页 |
| L2 - 场景词 | bored at school games | 38K | 中 | 场景分类页 |
| L3 - 品类词 | mini games | 450K | 中 | 类型分类页 |
| L3 - 品类词 | browser games | 增长趋势 | 中 | 类型分类页 |
| L3 - 品类词 | html5 games | 180K | 低 | 类型分类页 |
| L3 - 痛点词 | no download games | 740K | 中 | 功能分类页 |
| L3 - 热门类 | io games / car games | 1.2M+ | 高 | 类型分类页 |
| L3 - 热门类 | 2 player games | 800K | 高 | 类型分类页 |
| L4 - 长尾词 | quick games for work | 12K | 低 | 组合页 |
| L4 - 长尾词 | unblocked games at school | 180K | 高 | 组合页 |

技术栈选型（严格遵循）

```yaml
前端框架: Astro 5.x（零JS默认，极致性能）
状态管理: Nano Stores (用于收藏/历史记录/全局状态)
样式方案: Tailwind CSS 4.x
UI组件: shadcn/ui
动画: Framer Motion
多语言: Astro i18n + 7语言支持
搜索: Pagefind（静态搜索，无需服务端）
部署: Vercel Edge（全球CDN + 边缘缓存）
数据源: Gamepix API (SID: GM8A7)
统计分析: Google Analytics 4 + Plausible (双重验证，隐私合规)
法规遵从: CookieConsent v3 (GDPR/CCPA/LGPD)
```

第一部分：SEO架构与关键词布局（核心章节）
1.1 URL架构设计（必须严格实现）

```text
minigameshub.org/                                    ← 首页（L1-L2关键词）
├── /bored-at-work/                                 ← 场景分类页（L2）
│   ├── /quick-games/                               ← 子分类（L4）
│   ├── /hidden-games/                              ← 子分类（L4）
│   ├── /meeting-games/                             ← 子分类（L4）
│   └── /office-games/                              ← 子分类（L4）
│
├── /bored-at-school/                               ← 场景分类页（L2）
│   ├── /chromebook-games/                          ← 子分类（L4）
│   ├── /unblocked-games/                           ← 子分类（L4，高搜索量）
│   └── /classroom-games/                           ← 子分类（L4）
│
├── /mini-games/                                    ← 类型分类页（L3，450K搜索量）
│   ├── /quick/                                     ← 子分类
│   ├── /idle/                                      ← 子分类
│   └── /arcade/                                    ← 子分类
│
├── /browser-games/                                 ← 类型分类页（L3，增长趋势）
│   ├── /html5/                                     ← 子分类（L3，180K搜索量）
│   ├── /webgl/                                     ← 子分类
│   └── /flash-alternative/                         ← 子分类
│
├── /no-download-games/                             ← 功能分类页（L3，740K搜索量）
│   ├── /instant-play/                              ← 子分类
│   ├── /play-now/                                  ← 子分类
│   └── /zero-install/                              ← 子分类
│
├── /html5-games/                                   ← 技术分类页（L3，180K搜索量）
│   ├── /mobile-friendly/                           ← 子分类
│   ├── /cross-platform/                            ← 子分类
│   └── /offline-capable/                           ← 子分类（PWA功能）
│
├── /games-for-[audience]/                          ← 人群分类页（L3）
│   ├── /kids/                                      ← 子分类
│   ├── /teens/                                     ← 子分类
│   └── /adults/                                    ← 子分类
│
├── /game/[id]-[slug]/                              ← 游戏详情页（L4长尾词）
│   └── （每个游戏一个独立页面，AI生成独特内容）
│
├── /search/                                        ← 搜索页
├── /trending/                                      ← 热门游戏页
├── /new-games/                                     ← 新游戏页
├── /my-games/                                      ← 用户中心（收藏/历史，纯前端实现）
└── /about/, /privacy/, /faq/                       ← 支撑页面
```

1.2 首页SEO内容架构（哥飞"分门别类罗列"六字真言）
首页必须严格按照以下结构实现，每个H2下必须有3+个H3，每个H3下有6+个游戏卡片

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 核心Meta（必须动态生成） -->
    <title>MiniGamesHub - Games to Play When Bored | 5000+ Mini Games, Browser Games, HTML5 Games</title>
    <meta name="description" content="Bored at work or school? Play 5000+ free mini games, browser games, and HTML5 games instantly on MiniGamesHub. No download, no installation - just click and play!">
    <meta name="keywords" content="games to play when bored, mini games, browser games, html5 games, no download games, bored at work games, bored at school games, instant games, quick games, free online games">
    
    <!-- Open Graph -->
    <meta property="og:title" content="MiniGamesHub - Games to Play When Bored | 5000+ Free Mini Games">
    <meta property="og:description" content="Play 5000+ free mini games, browser games, and HTML5 games instantly. No download required!">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://minigameshub.org/">
    <meta property="og:image" content="https://minigameshub.org/og-image.jpg">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="MiniGamesHub- Games to Play When Bored">
    <meta name="twitter:description" content="5000+ free mini games, browser games, HTML5 games. No download!">
    
    <!-- Canonical -->
    <link rel="canonical" href="https://minigameshub.org/">
    
    <!-- Hreflang（多语言） -->
    <link rel="alternate" hreflang="en" href="https://minigameshub.org/">
    <link rel="alternate" hreflang="zh" href="https://minigameshub.org/zh/">
    <link rel="alternate" hreflang="hi" href="https://minigameshub.org/hi/">
    <link rel="alternate" hreflang="ja" href="https://minigameshub.org/ja/">
    <link rel="alternate" hreflang="ru" href="https://minigameshub.org/ru/">
    <link rel="alternate" hreflang="vi" href="https://minigameshub.org/vi/">
    <link rel="alternate" hreflang="de" href="https://minigameshub.org/de/">
    <link rel="alternate" hreflang="x-default" href="https://minigameshub.org/">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "MiniGamesHub",
        "url": "https://minigameshub.org/",
        "description": "Games to play when bored at work or school. 5000+ free mini games, browser games, HTML5 games.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://minigameshub.org/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>
</head>
<body>
    <!-- ==================== H1: 核心品牌词 ==================== -->
    <h1>Games to Play When Bored</h1>
    <p class="tagline">5000+ free mini games, browser games, and HTML5 games. No download, no installation - instant fun!</p>
    
    <!-- 首屏游戏播放器（差异化功能：即点即玩） -->
    <section class="hero-player-section relative" aria-label="Featured Game">
        <!-- 盲盒入口（悬浮或置于显眼位置） -->
        <div class="mystery-trigger absolute top-4 right-4 z-20">
            <button id="mysteryBoxBtn" class="btn-mystery animate-bounce-gentle">
                🎁 Surprise Me!
            </button>
        </div>

        <div class="game-container" id="heroGameContainer">
            <iframe 
                id="heroFrame"
                src="https://games.gamepix.com/play/slither-io?sid=GM8A7" 
                title="Slither.io - Play Instantly"
                loading="eager"
                allowfullscreen
                sandbox="allow-scripts allow-same-origin allow-popups"
            ></iframe>
            
            <!-- 播放器控制栏 -->
            <div class="player-controls">
                <span id="currentGameTitle" class="text-white font-bold ml-4">Now Playing: Slither.io</span>
                <div class="controls-right">
                    <button id="bossKey" class="btn-boss" title="Boss Key (ESC)">🚨 Boss Key</button>
                    <button id="muteBtn" class="btn-mute" title="Mute (M)">🔇 Mute</button>
                    <button id="fullscreenBtn" class="btn-fullscreen" title="Fullscreen">⛶ Fullscreen</button>
                </div>
            </div>
        </div>
    </section>

    <!-- 热门游戏带（点击直接在上方Hero区域播放，不跳转） -->
    <div class="quick-play-bar overflow-x-auto p-4 bg-gray-900">
        <h3 class="text-white text-sm mb-2">🔥 Trending Now (Click to Play Instantly)</h3>
        <div class="flex gap-4">
            <!-- 这里的卡片点击会触发 JS 更新 heroFrame.src -->
            <button class="quick-game-thumb" onclick="playInHero('game-id', 'url')">
                <img src="..." alt="...">
            </button>
        </div>
    </div>
    
    <!-- ==================== 第一大门类：场景分类（L2关键词） ==================== -->
    <!-- 目标关键词：bored at work games, bored at school games -->
    
    <h2>🎯 Bored at Work Games</h2>
    <p class="section-desc">Sneaky mini games and browser games that work on office computers. <strong>No download required</strong>, boss-key included!</p>
    
    <!-- 子分类1 -->
    <h3>Quick Mini Games (Under 5 Minutes)</h3>
    <p class="subsection-desc">Perfect for coffee breaks - <strong>instant play HTML5 games</strong> that load in seconds.</p>
    <div class="game-grid" data-category="quick-work">
        <!-- 6-8个游戏卡片，每个卡片必须包含关键词丰富的alt文本 -->
        <article class="game-card">
            <a href="/game/slither-io/">
                <img src="/thumbs/slither-io.jpg" alt="Slither.io - Quick mini game for work, no download" loading="lazy">
                <h4>Slither.io</h4>
                <span class="tag">Mini Game</span>
                <span class="tag">No Download</span>
            </a>
        </article>
        <!-- 更多游戏... -->
    </div>
    <a href="/bored-at-work/quick-games/" class="more-link">More Quick Mini Games for Work →</a>
    
    <!-- 子分类2 -->
    <h3>Hidden Browser Games (Look Like Work)</h3>
    <p class="subsection-desc"><strong>Browser games</strong> disguised as spreadsheets and documents. Perfect for <strong>bored at work</strong> moments.</p>
    <div class="game-grid" data-category="hidden-work">
        <!-- 游戏卡片... -->
    </div>
    <a href="/bored-at-work/hidden-games/" class="more-link">More Hidden Browser Games →</a>
    
    <!-- 子分类3 -->
    <h3>Meeting-Friendly HTML5 Games</h3>
    <p class="subsection-desc">One-hand <strong>HTML5 games</strong> that run silently in your browser during meetings.</p>
    <div class="game-grid" data-category="meeting">
        <!-- 游戏卡片... -->
    </div>
    <a href="/bored-at-work/meeting-games/" class="more-link">More Meeting Games →</a>
    
    <!-- CTA到分类页 -->
    <div class="category-cta">
        <a href="/bored-at-work/" class="btn-primary">View All 500+ Bored at Work Games</a>
    </div>
    
    <!-- ==================== 第二大门类：学校场景（L2关键词） ==================== -->
    
    <h2>🏫 Bored at School Games</h2>
    <p class="section-desc"><strong>Unblocked games</strong> and <strong>browser games</strong> that work on school Chromebooks and networks. <strong>No download</strong> needed!</p>
    
    <h3>Chromebook Mini Games</h3>
    <p class="subsection-desc"><strong>HTML5 mini games</strong> optimized for Chromebooks - runs smoothly on school devices.</p>
    <div class="game-grid" data-category="chromebook">
        <!-- 游戏卡片... -->
    </div>
    
    <h3>Unblocked Browser Games</h3>
    <p class="subsection-desc"><strong>Browser games</strong> that bypass school firewalls. <strong>No download</strong>, instant play.</p>
    <div class="game-grid" data-category="unblocked">
        <!-- 游戏卡片... -->
    </div>
    
    <h3>Classroom-Friendly HTML5 Games</h3>
    <p class="subsection-desc">Educational <strong>HTML5 games</strong> that teachers approve. Learn while playing!</p>
    <div class="game-grid" data-category="classroom">
        <!-- 游戏卡片... -->
    </div>
    
    <div class="category-cta">
        <a href="/bored-at-school/" class="btn-primary">View All 800+ School Games</a>
    </div>
    
    <!-- ==================== 第三大门类：游戏类型（L3关键词） ==================== -->
    <!-- 目标关键词：mini games, browser games, html5 games -->
    
    <h2>🎮 Mini Games - Quick Fun</h2>
    <p class="section-desc">The best <strong>mini games</strong> collection online. Short, addictive <strong>browser games</strong> perfect for quick breaks.</p>
    
    <h3>Arcade Mini Games</h3>
    <p class="subsection-desc">Classic <strong>mini arcade games</strong> - from Pac-Man to modern hits. All <strong>HTML5</strong>, no Flash needed.</p>
    <div class="game-grid" data-category="mini-arcade">
        <!-- 游戏卡片... -->
    </div>
    <a href="/mini-games/arcade/" class="more-link">More Arcade Mini Games →</a>
    
    <h3>Puzzle Mini Games</h3>
    <p class="subsection-desc">Brain-teasing <strong>mini puzzle games</strong> - 2048, Sudoku, and more <strong>browser games</strong>.</p>
    <div class="game-grid" data-category="mini-puzzle">
        <!-- 游戏卡片... -->
    </div>
    <a href="/mini-games/puzzle/" class="more-link">More Puzzle Mini Games →</a>
    
    <h3>Idle Mini Games</h3>
    <p class="subsection-desc">Set-and-forget <strong>mini idle games</strong> - progress even when you're working!</p>
    <div class="game-grid" data-category="mini-idle">
        <!-- 游戏卡片... -->
    </div>
    <a href="/mini-games/idle/" class="more-link">More Idle Mini Games →</a>
    
    <div class="category-cta">
        <a href="/mini-games/" class="btn-primary">Browse All 2000+ Mini Games</a>
    </div>
    
    <!-- ==================== 第四大门类：技术类型（L3关键词） ==================== -->
    
    <h2>🌐 Browser Games - No Download</h2>
    <p class="section-desc">Pure <strong>browser games</strong> that run instantly. <strong>No download</strong>, <strong>no installation</strong> - just click and play!</p>
    
    <h3>HTML5 Games</h3>
    <p class="subsection-desc">Modern <strong>HTML5 games</strong> with stunning graphics and smooth gameplay. Works on all devices.</p>
    <div class="game-grid" data-category="html5">
        <!-- 游戏卡片... -->
    </div>
    <a href="/html5-games/" class="more-link">More HTML5 Games →</a>
    
    <h3>WebGL Games</h3>
    <p class="subsection-desc">High-performance <strong>browser games</strong> using WebGL technology. Console-quality in your browser!</p>
    <div class="game-grid" data-category="webgl">
        <!-- 游戏卡片... -->
    </div>
    <a href="/browser-games/webgl/" class="more-link">More WebGL Games →</a>
    
    <h3>Mobile Browser Games</h3>
    <p class="subsection-desc"><strong>Browser games</strong> optimized for mobile. Play on iPhone, Android, any smartphone.</p>
    <div class="game-grid" data-category="mobile-browser">
        <!-- 游戏卡片... -->
    </div>
    <a href="/browser-games/mobile/" class="more-link">More Mobile Browser Games →</a>
    
    <div class="category-cta">
        <a href="/browser-games/" class="btn-primary">Play 3000+ Browser Games</a>
    </div>
    
    <!-- ==================== 第五大门类：核心卖点（L3关键词） ==================== -->
    
    <h2>⚡ No Download Games - Instant Play</h2>
    <p class="section-desc">The ultimate collection of <strong>no download games</strong>. <strong>Instant play</strong> - zero waiting, zero installation!</p>
    
    <h3>Instant Play Games</h3>
    <p class="subsection-desc">Click and play in under 1 second. The fastest <strong>no download games</strong> on the internet.</p>
    <div class="game-grid" data-category="instant">
        <!-- 游戏卡片... -->
    </div>
    
    <h3>Play Now Games</h3>
    <p class="subsection-desc">Zero-setup <strong>browser games</strong> - what you see is what you play. <strong>No download</strong> ever!</p>
    <div class="game-grid" data-category="play-now">
        <!-- 游戏卡片... -->
    </div>
    
    <h3>Zero Install Games</h3>
    <p class="subsection-desc">Save storage space with <strong>no download games</strong>. Perfect for Chromebooks and work computers.</p>
    <div class="game-grid" data-category="zero-install">
        <!-- 游戏卡片... -->
    </div>
    
    <div class="category-cta">
        <a href="/no-download-games/" class="btn-primary">Discover 4000+ No Download Games</a>
    </div>
    
    <!-- ==================== SEO内容区块（EEAT标准） ==================== -->
    
    <h2>What Are Mini Games and Browser Games?</h2>
    <div class="seo-content">
        <p><strong>Mini games</strong> are short, casual games designed for quick play sessions. Unlike traditional video games that require hours of commitment, <strong>mini games</strong> can be enjoyed in 5-10 minute bursts. At <strong>MiniGamesHub</strong>, we specialize in curating the best <strong>mini games</strong> from around the web, all playable instantly in your browser.</p>
        
        <p><strong>Browser games</strong> are games that run directly in your web browser without requiring any downloads or installations. Thanks to modern <strong>HTML5</strong> and WebGL technologies, today's <strong>browser games</strong> offer graphics and gameplay that rival native apps. Whether you're on a Chromebook, office computer, or mobile phone, <strong>browser games</strong> work everywhere.</p>
        
        <p>The term <strong>"games to play when bored"</strong> perfectly describes our mission. We've all been there - stuck in a boring meeting, waiting for a download, or just needing a mental break. That's where <strong>MiniGamesHub</strong> comes in. Our collection of <strong>no download games</strong> means you can start playing in seconds, with zero commitment.</p>
        
        <p>Unlike other gaming sites that force you to download apps or create accounts, we believe in true <strong>instant play</strong>. Every game on our platform is a <strong>no download game</strong> - just click, play, and enjoy. Whether you're looking for <strong>mini games</strong> for your coffee break or <strong>HTML5 games</strong> that work on your school Chromebook, we've got you covered.</p>
    </div>
    
    <!-- ==================== FAQ区块（Schema.org标记） ==================== -->
    
    <h2>Frequently Asked Questions About Mini Games and Browser Games</h2>
    <div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
        
        <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <h3 itemprop="name">What are mini games?</h3>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <p itemprop="text"><strong>Mini games</strong> are short, casual games designed for quick play sessions, typically lasting 5-10 minutes. They're perfect for when you're bored at work or school and need a quick break. At MiniGamesHub, we offer thousands of free mini games that require no download.</p>
            </div>
        </div>
        
        <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <h3 itemprop="name">What are browser games?</h3>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <p itemprop="text"><strong>Browser games</strong> are games that run directly in your web browser using HTML5 technology. They require no download or installation, making them perfect for work computers, school Chromebooks, and any device with a web browser.</p>
            </div>
        </div>
        
        <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <h3 itemprop="name">Can I play these games without downloading?</h3>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <p itemprop="text">Yes! All games on MiniGamesHub are <strong>no download games</strong>. They use HTML5 technology to run instantly in your browser. No installation, no storage space used - just click and play.</p>
            </div>
        </div>
        
        <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <h3 itemprop="name">What are HTML5 games?</h3>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <p itemprop="text"><strong>HTML5 games</strong> are browser-based games built using HTML5 technology. They work on all modern browsers without plugins like Flash, making them the modern standard for browser games. HTML5 games offer great graphics, smooth gameplay, and work on both desktop and mobile.</p>
            </div>
        </div>
        
        <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <h3 itemprop="name">Are these games safe for work?</h3>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <p itemprop="text">Yes! Our <strong>bored at work games</strong> collection includes hidden games that look like work documents, silent games that won't disturb colleagues, and quick games perfect for coffee breaks. We also include a "Boss Key" feature (press ESC) to instantly hide your game.</p>
            </div>
        </div>
        
        <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <h3 itemprop="name">Do these games work on Chromebooks?</h3>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <p itemprop="text">Absolutely! All our <strong>HTML5 games</strong> and <strong>browser games</strong> work perfectly on Chromebooks. Since they run in the browser with no download required, they're ideal for school Chromebooks that restrict app installations.</p>
            </div>
        </div>
        
    </div>
    
</body>
</html>
```

1.3 分类页SEO模板（以/mini-games/为例）

```html
<!-- /mini-games/ 页面 -->
<title>Mini Games - Play 2000+ Free Mini Games Online | MiniGamesHub</title>
<meta name="description" content="Play the best mini games online for free! 2000+ quick mini games and browser games - no download required. Perfect for short breaks at work or school.">
<meta name="keywords" content="mini games, free mini games, online mini games, browser mini games, quick games, short games, mini arcade games, mini puzzle games">

<h1>Mini Games - Free Online Mini Games</h1>
<p class="category-desc">Discover the best collection of <strong>mini games</strong> on the internet. These short, addictive <strong>browser games</strong> are perfect for quick breaks - no download, instant play!</p>

<!-- 子分类罗列 -->
<h2>Mini Arcade Games</h2>
<h3>Classic Mini Arcade</h3>
<!-- 游戏网格 -->

<h3>Modern Mini Arcade</h3>
<!-- 游戏网格 -->

<h2>Mini Puzzle Games</h2>
<h3>Logic Mini Puzzles</h3>
<!-- 游戏网格 -->

<h3>Match-3 Mini Games</h3>
<!-- 游戏网格 -->

<!-- SEO内容区 -->
<h2>What Are Mini Games?</h2>
<p>详细解释mini games的定义、特点、优势，自然融入关键词...</p>

<h2>Why Play Mini Games?</h2>
<p>解释mini games适合的场景（工作间隙、通勤等），强化场景关键词...</p>
```

第二部分：技术架构（AI执行规范）
2.1 项目目录结构（必须严格遵循）

```text
boredgames-work/
├── .github/
│   └── workflows/
│       ├── sync-games.yml              # 每6小时同步Gamepix数据
│       ├── generate-content.yml        # AI内容生成
│       └── deploy.yml                  # Vercel部署
│
├── scripts/                            # 构建脚本（Node.js）
│   ├── fetch-games.js                  # Gamepix API抓取
│   ├── generate-seo-content.js         # AI SEO内容生成
│   ├── generate-sitemap.js             # 多语言sitemap生成
│   └── optimize-images.js              # 图片优化
│
├── src/
│   ├── components/                     # Astro组件
│   │   ├── ui/                         # shadcn/ui基础组件
│   │   │   ├── button.astro
│   │   │   ├── card.astro
│   │   │   └── badge.astro
│   │   │
│   │   ├── game/                       # 游戏相关组件
│   │   │   ├── GamePlayer.astro        # 游戏播放器（核心）
│   │   │   ├── GameCard.astro          # 游戏卡片
│   │   │   ├── GameGrid.astro          # 游戏网格
│   │   │   ├── MysteryBox.astro        # 盲盒抽奖组件（新）
│   │   │   ├── BossKey.astro           # 老板键功能
│   │   │   └── MuteControl.astro       # 静音控制
│   │   │
│   │   ├── layout/                     # 布局组件
│   │   │   ├── Header.astro            # 页头（含搜索）
│   │   │   ├── Footer.astro            # 页脚
│   │   │   ├── Sidebar.astro           # 侧边栏（广告位）
│   │   │   └── AdSlot.astro            # 广告位组件
│   │   │
│   │   └── seo/                        # SEO组件
│   │       ├── SchemaOrg.astro         # 结构化数据
│   │       ├── Hreflang.astro          # 多语言标签
│   │       └── Breadcrumb.astro        # 面包屑导航
│   │
│   ├── layouts/                        # 页面布局
│   │   ├── RootLayout.astro            # 根布局
│   │   ├── GameLayout.astro            # 游戏页布局
│   │   └── CategoryLayout.astro        # 分类页布局
│   │
│   ├── pages/                          # 路由页面
│   │   ├── [lang]/                     # 多语言路由
│   │   │   ├── index.astro             # 首页（核心）
│   │   │   ├── bored-at-work/
│   │   │   │   └── index.astro         # 工作场景页
│   │   │   ├── bored-at-school/
│   │   │   │   └── index.astro         # 学校场景页
│   │   │   ├── mini-games/
│   │   │   │   └── index.astro         # 迷你游戏页
│   │   │   ├── browser-games/
│   │   │   │   └── index.astro         # 浏览器游戏页
│   │   │   ├── html5-games/
│   │   │   │   └── index.astro         # HTML5游戏页
│   │   │   ├── no-download-games/
│   │   │   │   └── index.astro         # 免下载游戏页
│   │   │   ├── game/
│   │   │   │   └── [id]-[slug].astro   # 游戏详情页
│   │   │   ├── search.astro            # 搜索页
│   │   │   └── trending.astro          # 热门页
│   │   └── index.astro                 # 根路径重定向
│   │
│   ├── i18n/                           # 国际化
│   │   ├── config.ts                   # i18n配置
│   │   ├── ui/                         # UI翻译
│   │   │   ├── en.json
│   │   │   ├── zh.json
│   │   │   └── ...
│   │   └── seo/                        # SEO内容翻译
│   │       └── ...
│   │
│   ├── lib/                            # 工具库
│   │   ├── seo/                        # SEO工具
│   │   ├── game/                       # 游戏工具
│   │   └── ai/                         # AI生成工具
│   │
│   └── styles/                         # 全局样式
│       └── global.css
│
├── public/                             # 静态资源
│   ├── images/
│   │   ├── games/                      # 游戏缩略图
│   │   └── categories/                 # 分类图标
│   └── icons/                          # PWA图标
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

2.2 核心组件实现规范
2.2.1 游戏播放器组件（必须实现老板键、静音）

```astro
---
// src/components/game/GamePlayer.astro
interface Props {
    game: {
        id: string;
        title: string;
        url: string;  // Gamepix嵌入URL
        width: number;
        height: number;
    };
    showControls?: boolean;
}

const { game, showControls = true } = Astro.props;
const embedUrl = `${game.url}&sid=GM8A7`;  // 必须包含SID
---

<div class="game-player" data-game-id={game.id}>
    <!-- 游戏iframe容器 -->
    <div class="game-frame-wrapper relative">
        <iframe
            id={`game-frame-${game.id}`}
            src={embedUrl}
            title={`${game.title} - Play Online Free`}
            width="100%"
            height="600"
            frameborder="0"
            allowfullscreen
            allow="autoplay; fullscreen; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="eager"
            class="rounded-lg shadow-2xl"
        ></iframe>
        
        <!-- 加载状态 -->
        <div class="loading-overlay absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
            <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                <p class="mt-4 text-white">Loading {game.title}...</p>
            </div>
        </div>
    </div>
    
    {showControls && (
        <div class="player-controls mt-4 flex flex-wrap gap-2 items-center justify-between bg-gray-800 p-3 rounded-lg">
            <div class="flex gap-2">
                <!-- 老板键 -->
                <button 
                    id="boss-key-btn"
                    class="boss-key-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                    title="Boss Key (ESC or `)"
                >
                    <span>🚨</span>
                    <span>Boss Key</span>
                </button>
                
                <!-- 静音 -->
                <button 
                    id="mute-btn"
                    class="mute-btn bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                    title="Mute (M)"
                >
                    <span id="mute-icon">🔊</span>
                    <span id="mute-text">Mute</span>
                </button>
                
                <!-- 全屏 -->
                <button 
                    id="fullscreen-btn"
                    class="fullscreen-btn bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                    title="Fullscreen (F)"
                >
                    <span>⛶</span>
                    <span>Fullscreen</span>
                </button>
            </div>
            
            <div class="text-gray-300 text-sm">
                Press <kbd class="bg-gray-700 px-2 py-1 rounded">ESC</kbd> for Boss Key
            </div>
        </div>
    )}
    
    <!-- 老板键遮罩层（默认隐藏） -->
    <div id="boss-overlay" class="boss-overlay hidden fixed inset-0 bg-gray-100 z-50 overflow-auto">
        <div class="max-w-5xl mx-auto p-8">
            <!-- 伪装成Excel界面 -->
            <div class="bg-white shadow-lg min-h-screen">
                <div class="bg-green-700 text-white px-4 py-2 flex items-center justify-between">
                    <span>Q3_Financial_Report.xlsx - Excel</span>
                    <div class="flex gap-2">
                        <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
                        <span class="w-3 h-3 rounded-full bg-green-400"></span>
                    </div>
                </div>
                <div class="p-4">
                    <div class="border border-gray-300">
                        <table class="w-full text-sm">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="border p-2 text-left">Revenue Stream</th>
                                    <th class="border p-2 text-right">Q1</th>
                                    <th class="border p-2 text-right">Q2</th>
                                    <th class="border p-2 text-right">Q3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td class="border p-2">Product Sales</td><td class="border p-2 text-right">$1.2M</td><td class="border p-2 text-right">$1.5M</td><td class="border p-2 text-right">$1.8M</td></tr>
                                <tr><td class="border p-2">Services</td><td class="border p-2 text-right">$800K</td><td class="border p-2 text-right">$900K</td><td class="border p-2 text-right">$1.1M</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="mt-8 text-gray-500 text-center">Press <kbd class="bg-gray-200 px-2 py-1 rounded">ESC</kbd> to return to game...</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script define:vars={{ gameId: game.id }}>
    // 老板键功能
    let isBossMode = false;
    const bossOverlay = document.getElementById('boss-overlay');
    const bossBtn = document.getElementById('boss-key-btn');
    const gameFrame = document.getElementById(`game-frame-${gameId}`);
    
    function toggleBossMode() {
        isBossMode = !isBossMode;
        
        if (isBossMode) {
            // 进入老板模式
            bossOverlay.classList.remove('hidden');
            document.title = 'Q3_Financial_Report.xlsx - Excel Online';
            
            // 尝试静音游戏（通过postMessage）
            try {
                gameFrame.contentWindow.postMessage({ type: 'mute', value: true }, '*');
            } catch(e) {}
            
            // 改变favicon
            const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23217346" width="100" height="100"/><text x="50" y="65" font-size="50" text-anchor="middle" fill="white">X</text></svg>';
            document.head.appendChild(link);
            
        } else {
            // 恢复游戏
            bossOverlay.classList.add('hidden');
            document.title = `${gameId} - Play Online Free | MiniGamesHub`;
            
            try {
                gameFrame.contentWindow.postMessage({ type: 'mute', value: false }, '*');
            } catch(e) {}
            
            // 恢复favicon
            const link = document.querySelector("link[rel*='icon']");
            if (link) link.href = '/favicon.svg';
        }
    }
    
    // 键盘监听
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === '`') {
            e.preventDefault();
            toggleBossMode();
        }
        if (e.key === 'm' || e.key === 'M') {
            toggleMute();
        }
        if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
    });
    
    bossBtn?.addEventListener('click', toggleBossMode);
    
    // 静音功能
    let isMuted = false;
    const muteBtn = document.getElementById('mute-btn');
    const muteIcon = document.getElementById('mute-icon');
    const muteText = document.getElementById('mute-text');
    
    function toggleMute() {
        isMuted = !isMuted;
        muteIcon.textContent = isMuted ? '🔇' : '🔊';
        muteText.textContent = isMuted ? 'Unmute' : 'Mute';
        
        try {
            gameFrame.contentWindow.postMessage({ 
                type: 'audio', 
                action: isMuted ? 'mute' : 'unmute' 
            }, '*');
        } catch(e) {}
        
        // 视觉反馈
        muteBtn.classList.toggle('bg-red-600', isMuted);
        muteBtn.classList.toggle('bg-gray-600', !isMuted);
    }
    
    muteBtn?.addEventListener('click', toggleMute);
    
    // 全屏功能
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            gameFrame.requestFullscreen?.() || gameFrame.webkitRequestFullscreen?.();
        } else {
            document.exitFullscreen?.() || document.webkitExitFullscreen?.();
        }
    }
    
    fullscreenBtn?.addEventListener('click', toggleFullscreen);
    
    // iframe加载完成后隐藏loading
    gameFrame?.addEventListener('load', () => {
        const loading = document.querySelector('.loading-overlay');
        if (loading) loading.classList.add('hidden');
    });
</script>

/* 用户交互脚本：收藏与历史记录 */
<script>
    // 简单的本地存储管理
    const GAME_ID = document.querySelector('.game-player').dataset.gameId;
    
    // 添加到历史记录
    function addToHistory(id) {
        let history = JSON.parse(localStorage.getItem('bg_history') || '[]');
        history = history.filter(item => item !== id); // 移除旧的
        history.unshift(id); // 添加到开头
        if (history.length > 20) history.pop(); // 保留最近20个
        localStorage.setItem('bg_history', JSON.stringify(history));
    }
    
    // 页面加载时记录
    if (GAME_ID) addToHistory(GAME_ID);
    
    // 收藏功能逻辑（配合UI按钮）
    function toggleFavorite(id) {
        let favs = JSON.parse(localStorage.getItem('bg_favorites') || '[]');
        const index = favs.indexOf(id);
        if (index > -1) {
            favs.splice(index, 1);
            return false; // 已取消
        } else {
            favs.push(id);
            localStorage.setItem('bg_favorites', JSON.stringify(favs));
            return true; // 已收藏
        }
    }
</script>

<style>
    .game-frame-wrapper {
        position: relative;
        aspect-ratio: 16/9;
        max-height: 600px;
    }
    
    .game-frame-wrapper iframe {
        width: 100%;
        height: 100%;
    }
    
    kbd {
        font-family: monospace;
        border: 1px solid #666;
    }
    
    .boss-overlay {
        animation: fadeIn 0.1s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>
```

2.2.2 游戏卡片组件（SEO优化版）

```astro
---
// src/components/game/GameCard.astro
interface Props {
    game: {
        id: string;
        title: string;
        category: string;
        tags: string[];
        thumbnail: string;
    };
    variant?: 'default' | 'compact';
    lazy?: boolean;
}

const { game, variant = 'default', lazy = true } = Astro.props;

// 生成SEO友好的URL
const gameUrl = `/game/${game.id}-${game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`;

// 生成关键词丰富的alt文本
const altText = `${game.title} - ${game.category} game, play online free, no download`;
---

<article class="game-card group" data-game-id={game.id} data-category={game.category}>
    <a href={gameUrl} class="block relative overflow-hidden rounded-xl bg-gray-800 transition-transform hover:scale-105">
        <!-- 缩略图 -->
        <div class="aspect-[4/3] relative overflow-hidden">
            <img
                src={game.thumbnail}
                alt={altText}
                width={variant === 'compact' ? 200 : 300}
                height={variant === 'compact' ? 150 : 225}
                loading={lazy ? 'lazy' : 'eager'}
                decoding="async"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            
            <!-- 悬停遮罩 -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div class="text-center">
                    <div class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-2xl mb-2 mx-auto">▶</div>
                    <span class="text-white font-medium">Play Now</span>
                </div>
            </div>
            
            <!-- 标签 -->
            {game.tags?.includes('new') && (
                <span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">NEW</span>
            )}
            {game.tags?.includes('hot') && (
                <span class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">HOT</span>
            )}
        </div>
        
        <!-- 游戏信息 -->
        <div class="p-3">
            <h3 class="text-white font-semibold truncate group-hover:text-green-400 transition-colors">
                {game.title}
            </h3>
            <div class="flex items-center justify-between mt-2 text-sm text-gray-400">
                <span class="capitalize">{game.category}</span>
                <span class="flex items-center gap-1">
                    <span>⭐</span>
                    <span>{(Math.random() * 2 + 3).toFixed(1)}</span>
                </span>
            </div>
            
            <!-- SEO关键词标签（视觉隐藏但SEO可见） -->
            <div class="sr-only">
                Play {game.title} online free. {game.category} game, no download required, instant play.
            </div>
        </div>
    </a>
</article>

<style>
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    /* 盲盒特效样式 */
    .mystery-overlay {
        animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        75% { transform: translateX(10px) rotate(5deg); }
    }
    .animate-shake { animation: shake 0.5s ease-in-out infinite; }
</style>
```

2.2.3 盲盒组件（MysteryBox - 游戏化激励）

```astro
---
// src/components/game/MysteryBox.astro
---
<div id="mystery-module">
    <!-- 遮罩与弹窗 -->
    <div id="mystery-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div class="relative bg-gradient-to-br from-purple-600 to-blue-600 p-1 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all">
            <div class="bg-gray-900 rounded-xl p-6 text-center">
                
                <!-- 初始状态：宝箱 -->
                <div id="box-state-closed" class="py-8">
                    <div class="text-6xl mb-4 animate-bounce cursor-pointer" id="chest-icon">🎁</div>
                    <h3 class="text-2xl font-bold text-white mb-2">Mystery Game</h3>
                    <p class="text-purple-200">Feeling bored? Let fate decide!</p>
                    <button id="open-box-btn" class="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all">
                        Open Box
                    </button>
                </div>

                <!-- 动画状态：抽奖中 -->
                <div id="box-state-opening" class="hidden py-12">
                    <div class="text-6xl mb-4 animate-shake">🎲</div>
                    <p class="text-white text-lg">Selecting a gem for you...</p>
                </div>

                <!-- 结果状态：展示游戏 -->
                <div id="box-state-result" class="hidden">
                    <div class="text-yellow-400 text-sm font-bold tracking-wider mb-2">✨ EXCELLENT CHOICE FOUND!</div>
                    <img id="mystery-thumb" src="" alt="Mystery Game" class="w-full h-48 object-cover rounded-lg mb-4 border-2 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                    <h3 id="mystery-title" class="text-xl font-bold text-white mb-4">Game Title</h3>
                    
                    <div class="flex flex-col gap-3">
                        <button id="play-mystery-now" class="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform active:scale-95">
                            ▶ Play Now
                        </button>
                        <button id="spin-again" class="text-gray-400 hover:text-white text-sm">
                            ↻ Spin Again
                        </button>
                    </div>
                </div>
                
                <button id="close-mystery" class="absolute top-2 right-2 text-gray-400 hover:text-white">✕</button>
            </div>
        </div>
        
        <!-- 粒子特效容器 -->
        <canvas id="confetti-canvas" class="absolute inset-0 pointer-events-none"></canvas>
    </div>
</div>

<script>
    import confetti from 'canvas-confetti'; // 需安装 canvas-confetti

    const modal = document.getElementById('mystery-modal');
    const btn = document.getElementById('mysteryBoxBtn'); // 首页的入口按钮
    const closeBtn = document.getElementById('close-mystery');
    const openBtn = document.getElementById('open-box-btn');
    
    // 状态容器
    const stateClosed = document.getElementById('box-state-closed');
    const stateOpening = document.getElementById('box-state-opening');
    const stateResult = document.getElementById('box-state-result');

    // 打开弹窗
    btn?.addEventListener('click', () => {
        modal.classList.remove('hidden');
        resetState();
    });

    closeBtn?.addEventListener('click', () => modal.classList.add('hidden'));

    // 抽奖逻辑
    openBtn?.addEventListener('click', async () => {
        // 1. 切换到动画状态
        stateClosed.classList.add('hidden');
        stateOpening.classList.remove('hidden');
        
        // 2. 模拟延迟与随机算法
        await new Promise(r => setTimeout(r, 1500));
        
        // 假设从全局游戏列表随机获取
        // const randomGame = window.allGames[Math.floor(Math.random() * window.allGames.length)];
        const randomGame = {
            title: "Temple Run 2",
            thumb: "https://img.gamedistribution.com/...",
            url: "..."
        }; // 示例数据
        
        // 3. 渲染结果
        document.getElementById('mystery-title').textContent = randomGame.title;
        document.getElementById('mystery-thumb').src = randomGame.thumb;
        
        // 4. 切换到结果状态并播放特效
        stateOpening.classList.add('hidden');
        stateResult.classList.remove('hidden');
        
        // 5. 撒花特效
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 60
        });
        
        // 6. 绑定"Play Now"事件
        document.getElementById('play-mystery-now').onclick = () => {
            // 调用首页播放器逻辑
            window.playInHero(randomGame.id, randomGame.url);
            modal.classList.add('hidden');
        };
    });

    function resetState() {
        stateClosed.classList.remove('hidden');
        stateOpening.classList.add('hidden');
        stateResult.classList.add('hidden');
    }
</script>
```

第三部分：AI内容生成系统（必须实现）
3.1 AI服务配置

```yaml
# .env
# AI服务API密钥（必须配置）
DEEPSEEK_API_KEY=sk-your-deepseek-key
KIMI_API_KEY=sk-your-kimi-key
OPENAI_API_KEY=sk-your-openai-key

# Gamepix配置
GAMEPIX_SID=GM8A7

# 站点配置
SITE_URL=https://minigameshub.org
SITE_NAME=MiniGamesHub
```

3.2 游戏SEO内容生成脚本

```javascript
// scripts/generate-seo-content.js
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

const deepseek = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com'
});

// 内容生成模板
const PROMPT_TEMPLATES = {
    gameDescription: (game, lang) => `
You are an expert SEO content writer for online games. Create engaging, keyword-rich content for the game "${game.title}".

Game Info:
- Title: ${game.title}
- Category: ${game.category}
- Description: ${game.description}
- Tags: ${game.tags?.join(', ')}

Target Language: ${lang}
Target Keywords: mini games, browser games, html5 games, no download games, games to play when bored, bored at work games, instant play
Context: This game is part of a portal containing categories like "Bored at Work", "Bored at School", "Mini Games", "IO Games".

Requirements:
1. SEO Title: 50-60 chars, include main keywords + "Unblocked" or "No Download"
2. Meta Description: 150-160 chars, compelling CTA, mention "Instant Play"
3. H1: Include game name + "Play Online Free"
4. Introduction: 300-500 words, naturally use all target keywords 2-3 times each. MUST include 2-3 contextual internal links to related categories (e.g., "Check out more <a href='/bored-at-work/'>bored at work games</a>").
5. How to Play: 200-300 words, clear instructions
6. Tips & Tricks: 5-7 bullet points for winning
7. FAQ Section: 3-4 Q&A specific to this game (Schema.org ready)
8. Related Keywords: 10-15 LSI keywords

Tone: Friendly, enthusiastic, for casual gamers. Use "We", "Us" to build community feel.
Avoid: Keyword stuffing, duplicate content, generic phrases.

Output as JSON with fields: seoTitle, metaDescription, h1, introduction, howToPlay, tips (array), faq (array of {question, answer}), relatedKeywords (array)
`,

    categoryDescription: (category, lang) => `
Create SEO content for category page: "${category.name}"

Category: ${category.name}
Description: ${category.description}
Target Keywords: ${category.keywords?.join(', ')}

Requirements:
1. Category Title: include main keyword + "online free"
2. Meta Description: 150-160 chars
3. H1: Category name + descriptive text
4. Category Description: 400-600 words
5. Why Play This Category: 200 words
6. Popular Games in Category: list 5-8 games with brief descriptions

Output as JSON
`
};

async function generateGameContent(game, lang = 'en') {
    try {
        const completion = await deepseek.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                { 
                    role: "system", 
                    content: "You are an expert SEO content writer specializing in online gaming. Create unique, engaging content that ranks well in search engines." 
                },
                { 
                    role: "user", 
                    content: PROMPT_TEMPLATES.gameDescription(game, lang)
                }
            ],
            temperature: 0.8,
            max_tokens: 2000,
            response_format: { type: "json_object" }
        });

        const content = JSON.parse(completion.choices[0].message.content);
        
        // 验证内容质量
        if (!validateContent(content)) {
            throw new Error('Content validation failed');
        }
        
        return content;
    } catch (error) {
        console.error(`Failed to generate content for ${game.title}:`, error);
        return null;
    }
}

function validateContent(content) {
    // 检查必需字段
    const required = ['seoTitle', 'metaDescription', 'h1', 'introduction'];
    for (const field of required) {
        if (!content[field]) return false;
    }
    
    // 检查关键词密度
    const text = `${content.introduction} ${content.howToPlay || ''}`.toLowerCase();
    const keywords = ['mini games', 'browser games', 'html5 games', 'no download'];
    for (const kw of keywords) {
        const count = (text.match(new RegExp(kw, 'g')) || []).length;
        if (count < 1) {
            console.warn(`Keyword "${kw}" missing or underused`);
        }
    }
    
    return true;
}

// 批量生成
async function batchGenerate(games, lang = 'en') {
    const results = [];
    
    for (const game of games) {
        console.log(`Generating content for: ${game.title}`);
        const content = await generateGameContent(game, lang);
        if (content) {
            results.push({
                gameId: game.id,
                gameTitle: game.title,
                lang,
                content,
                generatedAt: new Date().toISOString()
            });
        }
        // 限速：每秒2个请求
        await new Promise(r => setTimeout(r, 500));
    }
    
    return results;
}

// 主执行
async function main() {
    // 读取游戏数据
    const gamesData = await fs.readFile('./src/data/games.json', 'utf8');
    const games = JSON.parse(gamesData).slice(0, 100); // 先处理前100个
    
    // 生成英文内容
    const enContent = await batchGenerate(games, 'en');
    await fs.writeFile(
        './src/data/seo-content-en.json', 
        JSON.stringify(enContent, null, 2)
    );
    
    console.log(`Generated ${enContent.length} content pieces`);
}

main().catch(console.error);
```

第四部分：多语言SEO架构
4.1 语言配置

```typescript
// src/i18n/config.ts
export const languages = {
    en: { 
        name: 'English', 
        flag: '🇺🇸',
        seo: {
            siteName: 'MiniGamesHub',
            tagline: 'Games to Play When Bored | Mini Games, Browser Games, HTML5 Games',
            description: 'Play 5000+ free mini games, browser games, and HTML5 games instantly. No download required - perfect for when bored at work or school!'
        }
    },
    zh: { 
        name: '简体中文', 
        flag: '🇨🇳',
        seo: {
            siteName: '无聊游戏网',
            tagline: '无聊时玩的游戏 | 小游戏, 网页游戏, 在线游戏',
            description: '5000+免费小游戏、网页游戏、HTML5游戏，无需下载。上班摸鱼、上课无聊时的最佳选择！'
        }
    },
    hi: { 
        name: 'हिन्दी', 
        flag: '🇮🇳',
        seo: {
            siteName: 'BoredGames',
            tagline: 'ऊबने पर खेलने के लिए गेम्स | मिनी गेम्स, ब्राउज़र गेम्स',
            description: '5000+ निःशुल्क मिनी गेम्स और ब्राउज़र गेम्स। डाउनलोड के बिना तुरंत खेलें!'
        }
    },
    ja: { 
        name: '日本語', 
        flag: '🇯🇵',
        seo: {
            siteName: 'BoredGames',
            tagline: '暇つぶしゲーム | ミニゲーム, ブラウザゲーム, HTML5ゲーム',
            description: '5000以上の無料ミニゲーム、ブラウザゲーム、HTML5ゲームをインストール不要ですぐにプレイ！'
        }
    },
    ru: { 
        name: 'Русский', 
        flag: '🇷🇺',
        seo: {
            siteName: 'BoredGames',
            tagline: 'Игры от скуки | Мини-игры, Браузерные игры, HTML5 игры',
            description: '5000+ бесплатных мини-игр и браузерных игр. Без скачивания - играйте мгновенно!'
        }
    },
    vi: { 
        name: 'Tiếng Việt', 
        flag: '🇻🇳',
        seo: {
            siteName: 'BoredGames',
            tagline: 'Trò chơi khi chán | Mini games, Trò chơi trình duyệt',
            description: '5000+ trò chơi mini và trò chơi trình duyệt miễn phí. Không cần tải xuống - chơi ngay!'
        }
    },
    de: { 
        name: 'Deutsch', 
        flag: '🇩🇪',
        seo: {
            siteName: 'BoredGames',
            tagline: 'Spiele gegen Langeweile | Mini-Spiele, Browser-Spiele, HTML5-Spiele',
            description: '5000+ kostenlose Mini-Spiele und Browser-Spiele. Kein Download nötig - sofort spielbar!'
        }
    }
};

export const defaultLang = 'en';
export const showDefaultLang = false;  // URL中不显示默认语言
```

第五部分：性能与Core Web Vitals目标

| 指标 | 目标值 | 优化策略 |
| :--- | :--- | :--- |
| LCP | <1.2s | 图片预加载、关键CSS内联、CDN |
| INP | <100ms | 岛屿架构、事件委托 |
| CLS | <0.05 | 游戏iframe尺寸预留、字体预加载 |
| TTFB | <50ms | Edge渲染、缓存策略 |
| FCP | <0.8s | 流式渲染、关键路径优化 |

第六部分：开发里程碑（12周）

### Phase 1: 基础架构 (Week 1-3)
- [ ] Astro 5 + Tailwind 4 + shadcn/ui 搭建
- [ ] 多语言路由系统（7语言）
- [ ] Gamepix API数据同步
- [ ] 首页"分门别类罗列"结构实现

### Phase 2: 核心功能 (Week 4-6)
- [ ] 游戏播放器（老板键、静音、全屏）
- [ ] 游戏卡片组件
- [ ] 所有分类页实现
- [ ] 游戏详情页
- [ ] 用户中心（收藏/历史记录 - Nano Stores + LocalStorage）

### Phase 3: SEO系统 (Week 7-8)
- [ ] AI内容生成流水线（含Internal Linking逻辑）
- [ ] Schema.org结构化数据（Game, FAQ, Breadcrumb）
- [ ] 多语言Hreflang
- [ ] Sitemap生成（支持Sitemap Index分割）

### Phase 4: 优化与上线 (Week 9-12)
- [ ] Core Web Vitals优化
- [ ] 广告系统集成
- [ ] 隐私合规（Cookie Consent）与统计代码
- [ ] 多语言内容填充
- [ ] 生产部署
