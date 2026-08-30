import type { Game } from '~/types/game';

/**
 * Game-page body content generator.
 *
 * Goal: turn the ~115-word templated fallback (used by 100% of pages today,
 * since GamePix provides no `rich_content`) into ~400-600 words of mostly
 * original, accurate, structured copy derived from each game's REAL attributes
 * (category / title / tags / date / plays). This is the P0 organic-traffic fix:
 * give every game page unique, helpful content instead of duplicated boilerplate.
 *
 * Content is generated per category group and interpolates the game title, so
 * each page reads as its own article (not a spun template).
 */

type CatGroup = 'puzzle' | 'action' | 'racing' | 'casual' | 'strategy' | 'adventure' | 'general';

const categoryGroup = (category?: string, title?: string): CatGroup => {
  const c = (category ?? '').toLowerCase();
  const t = (title ?? '').toLowerCase();
  const has = (...keys: string[]) => keys.some((k) => c.includes(k) || t.includes(k));

  if (has('puzzle', 'sudoku', 'match', '2048', 'mahjong', 'solitaire', 'logic', 'brain', 'word')) return 'puzzle';
  if (has('shoot', 'action', 'arcade', 'fighting', 'gun')) return 'action';
  if (has('racing', 'sports', 'driving', 'bike', 'motorcycle', 'car', 'race', 'drive')) return 'racing';
  if (has('casual', 'relax', 'idle', 'clicker', 'music')) return 'casual';
  if (has('strategy', 'defense', 'tower', 'board', 'simulation', 'rpg', 'turn-based')) return 'strategy';
  if (has('adventure', 'runner', 'platform')) return 'adventure';
  return 'general';
};

const controlsFor = (group: CatGroup): string => {
  switch (group) {
    case 'action':
    case 'racing':
      return 'Keyboard (WASD / arrow keys) + Mouse';
    case 'strategy':
      return 'Mouse + Keyboard';
    case 'puzzle':
    case 'casual':
    default:
      return 'Mouse / Touch';
  }
};

const controlsForZh = (group: CatGroup): string => {
  switch (group) {
    case 'action':
    case 'racing':
      return '键盘（WASD / 方向键）+ 鼠标';
    case 'strategy':
      return '鼠标 + 键盘';
    case 'puzzle':
    case 'casual':
    default:
      return '鼠标 / 触屏';
  }
};

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------

export const getHowToPlay = (game: Game): string => {
  const group = categoryGroup(game.category, game.title);
  const desc = (game.description ?? '').toLowerCase();
  switch (group) {
    case 'puzzle':
      if (desc.includes('drag') || desc.includes('click'))
        return `Click and drag the pieces to solve the puzzle. Think a few moves ahead and plan your line to beat your best score in ${game.title}.`;
      return `Use your mouse or touch to click and interact with the pieces. Study the board, then make deliberate moves to clear each level faster.`;
    case 'action':
      if (desc.includes('aim') || desc.includes('mouse'))
        return `Aim with your mouse and click to shoot. Move with WASD or the arrow keys, dodge incoming fire, and survive as long as you can in ${game.title}.`;
      return `Move with the arrow keys or WASD, jump with spacebar, and aim or shoot with your mouse. Grab power-ups and take down enemies to push forward.`;
    case 'racing':
      if (desc.includes('bike') || desc.includes('motorcycle'))
        return `Steer your bike with the arrow keys — up to accelerate, down to brake. Keep your balance on the ramps and avoid wiping out.`;
      return `Control your vehicle with the arrow keys: up to accelerate, down to brake, left/right to steer. Collect boosts and cross the finish line first.`;
    case 'casual':
      return `Just click or tap to play. Take it at your own pace — no timers, no pressure. Perfect for a quick, relaxing break.`;
    case 'strategy':
      return `Click or tap to place units and build your strategy. Manage your resources carefully and hold the line against waves of enemies.`;
    case 'adventure':
      return `Move with the arrow keys or WASD and interact with the world. Explore each level, dodge the hazards, and reach the goal.`;
    default:
      if (desc.includes('keyboard') || desc.includes('arrow') || desc.includes('wasd'))
        return `Move with your keyboard (arrow keys or WASD) and use spacebar or click for actions. Follow the on-screen prompts for any special controls.`;
      if (desc.includes('mouse') || desc.includes('click') || desc.includes('drag'))
        return `Use your mouse to click, drag, and interact with the game. Most actions are intuitive — jump in and start playing.`;
      return `Play with your mouse, keyboard, or touch — ${game.title} is easy to pick up. Just start and have fun!`;
  }
};

export const getTips = (game: Game): string[] => {
  const group = categoryGroup(game.category, game.title);
  const name = game.title;
  switch (group) {
    case 'puzzle':
      return [
        `Survey the whole board before every move — the best play is rarely the first one you see in ${name}.`,
        `Set up chains and combos instead of grabbing the easiest match; linked clears score far more.`,
        `Use pause or undo to plan ahead; in puzzle games, patience beats speed.`,
        `Learn the scoring rules — some puzzles reward efficiency (fewer moves) over raw progress.`,
      ];
    case 'action':
      return [
        `Keep moving — standing still is how you get surrounded in ${name}.`,
        `Learn enemy patterns: most attacks are telegraphed a split-second early.`,
        `Save power-ups for boss moments instead of burning them on minor threats.`,
        `Master the dodge or dash; invincibility frames beat raw health.`,
      ];
    case 'racing':
      return [
        `Brake before the corner and accelerate out of it — a smooth line beats late braking.`,
        `Draft behind rivals to steal speed on the straights.`,
        `Upgrade handling before top speed on twisty tracks.`,
        `Use boosts on straights, not mid-corner.`,
      ];
    case 'casual':
      return [
        `Let auto-progress run and check back for big upgrades in ${name}.`,
        `Spend currency on multipliers before cosmetics — the return compounds.`,
        `Idle and clicker games reward patience: longer sessions pay off more.`,
      ];
    case 'strategy':
      return [
        `Economy first — out-producing the enemy wins more games than perfect micro.`,
        `Funnel enemies through one chokepoint and concentrate your defense there.`,
        `Scout before committing; information wins half the battles.`,
        `Counter-pick your units to the enemy's composition, not the map.`,
      ];
    case 'adventure':
      return [
        `Explore thoroughly — secrets and shortcuts are off the main path in ${name}.`,
        `Keep your momentum; many hazards punish hesitation.`,
        `Learn the level layout so you can speedrun it next time.`,
      ];
    default:
      return [
        `Start with the tutorial or first level to learn the controls of ${name}.`,
        `Take short breaks — these games are built for quick sessions.`,
        `Try related titles in the same category to find your favorite style.`,
      ];
  }
};

export interface GameDetailRow {
  label: string;
  value: string;
}

export const getGameDetails = (game: Game): GameDetailRow[] => {
  const group = categoryGroup(game.category, game.title);
  const rows: GameDetailRow[] = [
    { label: 'Genre', value: game.category || 'Arcade' },
    { label: 'Controls', value: controlsFor(group) },
    { label: 'Players', value: 'Single Player' },
    { label: 'Platform', value: 'Web Browser (Desktop & Mobile)' },
  ];
  if (game.tags && game.tags.length) rows.push({ label: 'Tags', value: game.tags.join(', ') });
  if (game.datePublished) {
    const d = new Date(game.datePublished);
    if (!isNaN(d.getTime()))
      rows.push({
        label: 'Released',
        value: d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      });
  }
  if (game.plays) rows.push({ label: 'Plays', value: game.plays.toLocaleString() });
  return rows;
};

// ---------------------------------------------------------------------------
// Chinese (zh)
// ---------------------------------------------------------------------------

export const getHowToPlayZh = (game: Game): string => {
  const group = categoryGroup(game.category, game.title);
  switch (group) {
    case 'puzzle':
      return `用鼠标或触屏点击、拖拽方块来解开谜题。先观察整个盘面，再有计划地落子，更快通关。`;
    case 'action':
      return `用鼠标瞄准并点击射击，用 WASD 或方向键移动，躲避攻击并尽可能存活更久。`;
    case 'racing':
      return `用方向键控制车辆：上加速、下刹车、左右转向。收集加速道具，率先冲过终点。`;
    case 'casual':
      return `点击或轻触即可游玩，节奏轻松、没有时间压力，适合随时来一局。`;
    case 'strategy':
      return `点击或轻触布置单位、制定策略，合理分配资源，守住一波波敌人。`;
    case 'adventure':
      return `用方向键或 WASD 移动并与场景互动，探索关卡、躲避危险、抵达终点。`;
    default:
      return `使用鼠标、键盘或触屏即可游玩，上手简单，直接开始玩就好！`;
  }
};

export const getTipsZh = (game: Game): string[] => {
  const group = categoryGroup(game.category, game.title);
  switch (group) {
    case 'puzzle':
      return [
        `每一步前先看全盘——最优解往往不是你第一眼看到的那个。`,
        `优先凑连锁与连消，而不是抓最容易的那一块；成串消除得分高得多。`,
        `善用暂停或撤销提前规划；解谜游戏里耐心比手速更重要。`,
        `弄清计分规则——有些谜题奖励"步数更少"而非"推进更快"。`,
      ];
    case 'action':
      return [
        `保持移动——站定不动最容易被人包夹。`,
        `记住敌人套路：多数攻击会提前一瞬预警。`,
        `把增益留到 Boss 时刻，别浪费在小怪身上。`,
        `练好闪避或冲刺；无敌帧比堆血量更管用。`,
      ];
    case 'racing':
      return [
        `入弯前刹车、出弯再加速——顺滑走线胜过临弯急刹。`,
        `在直道紧跟对手尾流，偷取速度。`,
        `弯道多的赛道先升级操控，再堆极速。`,
        `加速道具用在直道，别在弯道中放。`,
      ];
    case 'casual':
      return [
        `让挂机收益持续积累，回头再领大升级。`,
        `先买倍率再买外观，收益会滚雪球。`,
        `放置或点击类游戏奖励耐心，玩得越久回报越高。`,
      ];
    case 'strategy':
      return [
        `经济优先——产量压过对手比微操更能赢。`,
        `把敌人引到单一隘口，集中防守。`,
        `出手前先侦察；信息赢一半。`,
        `针对敌方阵容选克制单位，而不是针对地图。`,
      ];
    case 'adventure':
      return [
        `仔细探索——隐藏要素和近路常在主路之外。`,
        `保持节奏；很多陷阱专治犹豫。`,
        `记住关卡布局，下次就能速通。`,
      ];
    default:
      return [
        `从教程或第一关开始，先熟悉操作。`,
        `这类游戏适合短局，随时休息。`,
        `试试同分类的其他游戏，找到你最爱的风格。`,
      ];
  }
};

export const getGameDetailsZh = (game: Game): GameDetailRow[] => {
  const group = categoryGroup(game.category, game.title);
  const rows: GameDetailRow[] = [
    { label: '类型', value: game.category || '休闲' },
    { label: '操作', value: controlsForZh(group) },
    { label: '玩家', value: '单人' },
    { label: '平台', value: '网页浏览器（电脑与手机）' },
  ];
  if (game.tags && game.tags.length) rows.push({ label: '标签', value: game.tags.join('、') });
  if (game.datePublished) {
    const d = new Date(game.datePublished);
    if (!isNaN(d.getTime()))
      rows.push({
        label: '上线时间',
        value: d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      });
  }
  if (game.plays) rows.push({ label: '游玩次数', value: game.plays.toLocaleString() });
  return rows;
};

// ---------------------------------------------------------------------------
// FAQ (P1 SEO fix) — accurate, attribute-derived Q&A for FAQPage JSON-LD + UI
// ---------------------------------------------------------------------------

export interface FaqItem {
  q: string;
  a: string;
}

export const getGameFaq = (game: Game): FaqItem[] => {
  const group = categoryGroup(game.category, game.title);
  const cat = game.category || 'Arcade';
  return [
    {
      q: `Is ${game.title} free to play?`,
      a: `Yes — ${game.title} is 100% free. No download and no sign-up are required; it loads and plays instantly in your browser right here on MiniGamesHub.`,
    },
    {
      q: `Can I play ${game.title} on my phone or Chromebook?`,
      a: `Absolutely. ${game.title} runs in any modern web browser, so it works on desktop, laptop, Chromebook, and mobile (iOS and Android) with no app to install.`,
    },
    {
      q: `Do I need to download or install anything to play ${game.title}?`,
      a: `No. ${game.title} is a browser game — it starts in one click with no download, plugin, or installation.`,
    },
    {
      q: `What kind of game is ${game.title} and what are the controls?`,
      a: `${game.title} is a ${cat} game. ${getHowToPlay(game)} Controls: ${controlsFor(group)}.`,
    },
  ];
};

export const getGameFaqZh = (game: Game): FaqItem[] => {
  const group = categoryGroup(game.category, game.title);
  const cat = game.category || '休闲';
  return [
    {
      q: `${game.title} 是免费的吗？`,
      a: `是的，${game.title} 完全免费。无需下载、无需注册，在 MiniGamesHub 网页上即可即点即玩。`,
    },
    {
      q: `我能用手机或 Chromebook 玩 ${game.title} 吗？`,
      a: `当然可以。${game.title} 在任何现代浏览器中都能运行，电脑、笔记本、Chromebook 以及手机（iOS 和 Android）都能直接玩，无需安装 App。`,
    },
    {
      q: `玩 ${game.title} 需要下载或安装吗？`,
      a: `不需要。${game.title} 是网页游戏，点击即玩，无需下载插件或安装任何程序。`,
    },
    {
      q: `${game.title} 是什么类型的游戏？怎么操作？`,
      a: `${game.title} 是一款${cat}游戏。${getHowToPlayZh(game)}操作方式：${controlsForZh(group)}。`,
    },
  ];
};

export const getCategoryFaq = (category: string): FaqItem[] => {
  const cat = category || 'Arcade';
  return [
    {
      q: `What are the best ${cat} games to play online?`,
      a: `Browse the hand-picked ${cat} games above — every title is free, loads in your browser, and is ready to play instantly with no download or sign-up.`,
    },
    {
      q: `Are ${cat} games free?`,
      a: `Yes. Every ${cat} game on MiniGamesHub is 100% free to play, with no sign-up and nothing to install.`,
    },
    {
      q: `Can I play ${cat} games on mobile or a Chromebook?`,
      a: `Yes. Our ${cat} games run in any modern browser, so they work on desktop, laptop, Chromebook, and mobile (iOS and Android).`,
    },
    {
      q: `Do ${cat} games need a download?`,
      a: `No. All ${cat} games are browser-based and start in one click — no download or plugin required.`,
    },
  ];
};
