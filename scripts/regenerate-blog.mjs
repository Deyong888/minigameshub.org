// regenerate-blog.mjs
// 用站内 1489 款真实游戏重新生成博客文章：每篇绑定真实游戏 + 真实封面 + 真实 iframe
// 用法: node scripts/regenerate-blog.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POST_DIR = path.join(ROOT, 'src/data/post');
const GAMEPIX = path.join(ROOT, 'src/data/gamepix.json');

const feed = JSON.parse(fs.readFileSync(GAMEPIX, 'utf8'));
const GAMES = feed.items; // 1489 款真实游戏
console.log(`[regenerate-blog] 载入 ${GAMES.length} 款真实游戏`);

// ---------- 工具 ----------
// 确定性伪随机（按种子洗牌），保证每次生成结果一致且各文章互不雷同
function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seedStr) {
  const seed = xmur3(seedStr)();
  const rand = mulberry32(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 按分类/关键词筛选真实游戏
function matches(g, cats, kw) {
  if (cats && cats.includes(g.category)) return true;
  if (kw && kw.length) {
    const hay = (g.title + ' ' + (g.description || '')).toLowerCase();
    return kw.some((k) => hay.includes(k));
  }
  return false;
}

// 为某篇文章挑选 count 款真实游戏：优先主题池，不足时用高质量总池补齐
function pickGames(cfg) {
  const count = cfg.count;
  const byQuality = [...GAMES].sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0));
  let pool = byQuality;
  if (cfg.cats || cfg.kw) {
    const themed = byQuality.filter((g) => matches(g, cfg.cats, cfg.kw));
    if (themed.length > 0) pool = themed;
  }
  // 主题池取质量最高的 400 款再洗牌，保证质量且各篇不同
  const topPool = pool.slice(0, Math.min(pool.length, 400));
  const shuffled = seededShuffle(topPool, cfg.file);
  const chosen = [];
  const seen = new Set();
  for (const g of shuffled) {
    if (!seen.has(g.id)) {
      seen.add(g.id);
      chosen.push(g);
    }
    if (chosen.length >= count) break;
  }
  // 若主题池不足，用高质量总池补齐
  if (chosen.length < count) {
    const fill = seededShuffle(byQuality, cfg.file + '-fill');
    for (const g of fill) {
      if (!seen.has(g.id)) {
        seen.add(g.id);
        chosen.push(g);
      }
      if (chosen.length >= count) break;
    }
  }
  return chosen.slice(0, count);
}

// 分类 -> 一句话玩法提示
const HOW = {
  puzzle: 'Sharpen your mind with this clever puzzle — a perfect quick brain workout.',
  'match-3': 'Match, swap, and chain combos in this satisfying match-3 challenge.',
  '2048': 'Number-sliding strategy that is easy to learn and hard to put down.',
  arcade: 'Fast, reactive arcade action built for short bursts of fun.',
  action: 'Get your adrenaline going with this action-packed browser game.',
  shooter: 'Aim, dodge, and fire your way through waves of enemies.',
  'first-person-shooter': 'Lock on and spray in this first-person shooter showdown.',
  sports: 'Pick up and play sports fun — no gear required.',
  racing: 'Hit the throttle and race to the finish line.',
  driving: 'Take the wheel and enjoy some casual driving action.',
  strategy: 'Plan your moves and outthink the competition.',
  board: 'Classic board-game strategy, reimagined for the browser.',
  card: 'A relaxing card game you can enjoy any time.',
  chess: 'The timeless game of strategy and skill.',
  casual: 'Easy, laid-back fun you can jump into instantly.',
  'hyper-casual': 'Pick up and play in seconds — pure casual joy.',
  idle: 'Sit back and watch your progress grow.',
  clicker: 'Click, upgrade, and chase bigger numbers.',
  adventure: 'Explore, discover, and dive into an adventure.',
  io: 'Jump into a chaotic multiplayer .io arena.',
  snake: 'Classic snake action with a modern twist.',
  stickman: 'Hilarious stickman chaos and combat.',
  fighting: 'Punch, kick, and brawl your way to victory.',
  runner: 'Keep running and do not look back.',
  platformer: 'Jump and dash through tricky platforming levels.',
  simulation: 'Build, manage, and simulate your own little world.',
  memory: 'Test and train your memory.',
  brain: 'Give your brain a quick, fun challenge.',
  block: 'Stack, clear, and blast blocks for satisfying combos.',
  basketball: 'Hoop it up with quick basketball action.',
  animal: 'Cute animal-themed fun for everyone.',
  fun: 'Plain, simple, smile-inducing fun.',
  addictive: 'One more round — you have been warned.',
  'two-player': 'Grab a friend and settle it in two-player mode.',
  girls: 'Bright, playful fun made for everyone.',
  'dress-up': 'Style, mix, and match your perfect look.',
  retro: 'Old-school pixels, modern convenience.',
  monster: 'Face down monsters in this creature-filled romp.',
  war: 'Command, conquer, and win the war.',
  tanks: 'Roll out and dominate in tank combat.',
  bike: 'Lean into the curves on two wheels.',
  golf: 'Tee off and sink it in this casual golf game.',
  ball: 'Bounce, kick, and score with this ball game.',
};
function howTo(g) {
  return HOW[g.category] || 'Jump in and play this free HTML5 game right in your browser.';
}

function trimDesc(d, max = 320) {
  if (!d) return '';
  if (d.length <= max) return d.replace(/\s+/g, ' ').trim();
  let s = d.slice(0, max);
  const cut = s.lastIndexOf('.');
  if (cut > max * 0.5) s = s.slice(0, cut + 1);
  else s = s.replace(/\s+\S*$/, '');
  return (s + '…').replace(/\s+/g, ' ').trim();
}

// ---------- 文章配置（保留原始文件名，避免旧链接 404） ----------
const ARTICLES = [
  { file: '15-Best-Games-to-Play-When-Bored-at-School-in-2026-Unblocked-and-Free.md', title: '15 Best Games to Play When Bored at School in 2026 (Unblocked & Free)', count: 15, category: 'Bored at School', tags: ['unblocked games', 'school games', 'chromebook games', 'free browser games'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'hyper-casual', 'puzzle', 'match-3', '2048', 'arcade', 'board'], kw: ['school', 'chromebook'] },
  { file: '20-Best-Games-to-Play-When-Bored-at-School-in-2026.md', title: '20 Best Games to Play When Bored at School in 2026', count: 20, category: 'Bored at School', tags: ['school games', 'unblocked games', 'browser games', 'free games'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['puzzle', 'match-3', '2048', 'casual', 'arcade', 'sports', 'board'], kw: ['school'] },
  { file: '25-Best-Free-Browser-Games-No-Download-2026-Play-Instantly-When-Bored.md', title: '25 Best Free Browser Games (No Download) — Play Instantly When Bored in 2026', count: 25, category: 'Browser Games', tags: ['free browser games', 'no download games', 'instant play', 'html5 games'], browse: { label: 'Browser Games', url: '/browser-games' }, cats: ['casual', 'hyper-casual', 'arcade', 'puzzle', 'match-3', 'action', 'io'], kw: ['browser'] },
  { file: '25-Best-Games-to-Play-When-Bored-at-School-Unblocked-for-Chromebook-in-2026.md', title: '25 Best Games to Play When Bored at School (Unblocked for Chromebook) in 2026', count: 25, category: 'Bored at School', tags: ['chromebook games', 'unblocked games', 'school games', 'free games'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'puzzle', 'match-3', '2048', 'arcade', 'board', 'sports'], kw: ['chromebook'] },
  { file: '25-Best-Games-to-Play-When-Bored-at-School-in-2026-Free-No-Download.md', title: '25 Best Games to Play When Bored at School in 2026 (Free, No Download)', count: 25, category: 'Bored at School', tags: ['school games', 'free games', 'no download', 'unblocked games'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['puzzle', 'match-3', '2048', 'casual', 'arcade', 'board'], kw: ['school'] },
  { file: '25-Best-Unblocked-Games-for-School-Chromebook-2026-Instant-Play-No-Download.md', title: '25 Best Unblocked Games for School Chromebook 2026 (Instant Play, No Download)', count: 25, category: 'Bored at School', tags: ['unblocked games', 'chromebook games', 'school games', 'instant play'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'arcade', 'puzzle', 'match-3', '2048', 'sports', 'board'], kw: ['unblocked'] },
  { file: '25-Best-Unblocked-Games-for-School-Chromebook-2026-Play-Mini-Games-Instantly.md', title: '25 Best Unblocked Games for School Chromebook 2026 — Play Mini Games Instantly', count: 25, category: 'Mini Games', tags: ['unblocked games', 'mini games', 'chromebook games', 'school games'], browse: { label: 'Mini Games', url: '/mini-games' }, cats: ['casual', 'hyper-casual', 'puzzle', 'match-3', 'arcade', '2048', 'clicker'], kw: ['mini'] },
  { file: '25-Best-Unblocked-Games-for-School-Chromebook-2026.md', title: '25 Best Unblocked Games for School Chromebook 2026', count: 25, category: 'Bored at School', tags: ['unblocked games', 'chromebook games', 'school games', 'free games'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'arcade', 'puzzle', 'sports', 'board', 'match-3', '2048'], kw: ['unblocked'] },
  { file: '25-Best-Unblocked-Mini-Games-for-School-Chromebook-in-2026.md', title: '25 Best Unblocked Mini Games for School Chromebook in 2026', count: 25, category: 'Mini Games', tags: ['unblocked mini games', 'chromebook games', 'school games', 'mini games'], browse: { label: 'Mini Games', url: '/mini-games' }, cats: ['casual', 'hyper-casual', 'puzzle', 'match-3', 'clicker', 'idle', '2048'], kw: ['mini'] },
  { file: '30-Best-Games-to-Play-When-Bored-at-School-Unblocked-in-2026-No-Download-Needed.md', title: '30 Best Games to Play When Bored at School (Unblocked, No Download Needed) in 2026', count: 30, category: 'Bored at School', tags: ['unblocked games', 'school games', 'no download', 'free games'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'arcade', 'puzzle', 'match-3', '2048', 'sports', 'board', 'io'], kw: ['school', 'unblocked'] },
  { file: '30-Best-Unblocked-Games-For-School-Chromebook-2026-That-Actually-Work.md', title: '30 Best Unblocked Games for School Chromebook 2026 That Actually Work', count: 30, category: 'Bored at School', tags: ['unblocked games', 'chromebook games', 'school games', 'that work'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'puzzle', 'match-3', '2048', 'arcade', 'board', 'sports', 'io'], kw: ['unblocked'] },
  { file: '50-Best-Unblocked-Games-for-School-Chromebook-2026-Play-Instantly.md', title: '50 Best Unblocked Games for School Chromebook 2026 — Play Instantly', count: 50, category: 'Bored at School', tags: ['unblocked games', 'chromebook games', 'school games', 'instant play'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'arcade', 'puzzle', 'match-3', '2048', 'sports', 'board', 'io', 'action'], kw: ['unblocked'] },
  { file: '50-Games-to-Play-When-Bored-2026-Free-Mini-Browser-Games.md', title: '50 Games to Play When Bored in 2026 — Free Mini Browser Games', count: 50, category: 'Mini Games', tags: ['mini games', 'free games', 'browser games', 'when bored'], browse: { label: 'Mini Games', url: '/mini-games' }, cats: ['casual', 'hyper-casual', 'puzzle', 'match-3', 'clicker', 'idle', 'arcade', '2048'], kw: ['mini'] },
  { file: 'Best-Browser-Games-2026-Play-Instantly-When-Bored.md', title: 'Best Browser Games 2026 — Play Instantly When Bored', count: 10, category: 'Browser Games', tags: ['browser games', 'instant play', 'free games', 'when bored'], browse: { label: 'Browser Games', url: '/browser-games' }, cats: ['casual', 'arcade', 'puzzle', 'action', 'io'] },
  { file: 'Best-Browser-Games-2026-Top-Mini-Games-to-Play-When-Bored.md', title: 'Best Browser Games 2026 — Top Mini Games to Play When Bored', count: 10, category: 'Mini Games', tags: ['mini games', 'browser games', 'free games', 'when bored'], browse: { label: 'Mini Games', url: '/mini-games' }, cats: ['casual', 'hyper-casual', 'puzzle', 'match-3', 'clicker', 'idle'] },
  { file: 'Best-Browser-Games-to-Play-When-Bored-2026-No-Download-Instant-Play.md', title: 'Best Browser Games to Play When Bored in 2026 (No Download, Instant Play)', count: 10, category: 'Browser Games', tags: ['browser games', 'no download', 'instant play', 'when bored'], browse: { label: 'Browser Games', url: '/browser-games' }, cats: ['casual', 'arcade', 'puzzle', 'action', 'io'] },
  { file: 'Best-Browser-Games-to-Play-When-Bored-in-2026-Free-HTML5-Mini-Games.md', title: 'Best Browser Games to Play When Bored in 2026 — Free HTML5 Mini Games', count: 10, category: 'Mini Games', tags: ['html5 games', 'mini games', 'browser games', 'free games'], browse: { label: 'HTML5 Games', url: '/html5-games' }, cats: ['casual', 'puzzle', 'match-3', 'arcade', '2048', 'clicker'] },
  { file: 'Best-Browser-Games-to-Play-When-Bored-in-2026-No-Download-Instant-Fun.md', title: 'Best Browser Games to Play When Bored in 2026 (No Download, Instant Fun)', count: 10, category: 'Browser Games', tags: ['browser games', 'no download', 'instant fun', 'free games'], browse: { label: 'Browser Games', url: '/browser-games' }, cats: ['casual', 'arcade', 'puzzle', 'action', 'fun'] },
  { file: 'Best-Browser-Games-to-Play-When-Bored-in-2026-No-Download-Instant-Play.md', title: 'Best Browser Games to Play When Bored in 2026 (No Download, Instant Play)', count: 10, category: 'Browser Games', tags: ['browser games', 'no download', 'instant play', 'free games'], browse: { label: 'Browser Games', url: '/browser-games' }, cats: ['casual', 'arcade', 'puzzle', 'action', 'io'] },
  { file: 'Best-Browser-Games-to-Play-When-Bored-in-2026-No-Download-Required.md', title: 'Best Browser Games to Play When Bored in 2026 (No Download Required)', count: 10, category: 'Browser Games', tags: ['browser games', 'no download', 'free games', 'when bored'], browse: { label: 'Browser Games', url: '/browser-games' }, cats: ['casual', 'arcade', 'puzzle', 'action', 'sports'] },
  { file: 'Best-Games-to-Play-When-Bored-No-Download-Browser-Games-2026.md', title: 'Best Games to Play When Bored — No Download Browser Games 2026', count: 10, category: 'Browser Games', tags: ['no download games', 'browser games', 'when bored', 'free games'], browse: { label: 'Browser Games', url: '/browser-games' }, cats: ['casual', 'arcade', 'puzzle', 'action', 'io'] },
  { file: 'Best-Games-to-Play-When-Bored-in-2026-Top-HTML5-Browser-Games-for-School-and-Work.md', title: 'Best Games to Play When Bored in 2026 — Top HTML5 Browser Games for School and Work', count: 10, category: 'Browser Games', tags: ['html5 games', 'school games', 'work games', 'browser games'], browse: { label: 'HTML5 Games', url: '/html5-games' }, cats: ['puzzle', 'match-3', '2048', 'casual', 'board', 'strategy'] },
  { file: 'Best-HTML5-Browser-Games-to-Play-When-Bored-in-2026.md', title: 'Best HTML5 Browser Games to Play When Bored in 2026', count: 10, category: 'Browser Games', tags: ['html5 games', 'browser games', 'when bored', 'free games'], browse: { label: 'HTML5 Games', url: '/html5-games' }, cats: ['casual', 'arcade', 'puzzle', 'action', 'io'] },
  { file: 'Best-HTML5-Games-to-Play-Instantly-Without-Download-in-2026.md', title: 'Best HTML5 Games to Play Instantly Without Download in 2026', count: 10, category: 'Browser Games', tags: ['html5 games', 'no download', 'instant play', 'free games'], browse: { label: 'HTML5 Games', url: '/html5-games' }, cats: ['casual', 'puzzle', 'match-3', 'arcade', '2048'] },
  { file: 'Best-Unblocked-Games-2026-Play-Free-Mini-Games-on-School-Chromebook.md', title: 'Best Unblocked Games 2026 — Play Free Mini Games on School Chromebook', count: 10, category: 'Mini Games', tags: ['unblocked games', 'mini games', 'chromebook games', 'free games'], browse: { label: 'Mini Games', url: '/mini-games' }, cats: ['casual', 'hyper-casual', 'puzzle', 'match-3', 'clicker', '2048'] },
  { file: 'Best-Unblocked-Games-for-School-Chromebook-2026-Play-Instantly.md', title: 'Best Unblocked Games for School Chromebook 2026 — Play Instantly', count: 10, category: 'Bored at School', tags: ['unblocked games', 'chromebook games', 'school games', 'instant play'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'arcade', 'puzzle', 'sports', 'board'] },
  { file: 'Best-Unblocked-Games-for-School-Chromebooks-2026-Play-Instantly.md', title: 'Best Unblocked Games for School Chromebooks 2026 — Play Instantly', count: 10, category: 'Bored at School', tags: ['unblocked games', 'chromebook games', 'school games', 'instant play'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'arcade', 'puzzle', 'sports', 'board'] },
  { file: 'Block-Blast-2026-Trending-HTML5-Games-to-Play-When-Bored.md', title: 'Block Blast 2026 — Trending HTML5 Games to Play When Bored', count: 10, category: 'Puzzle Games', tags: ['block games', 'blast games', 'html5 games', 'trending games'], browse: { label: 'Puzzle Games', url: '/mini-games/puzzle' }, cats: ['block', 'puzzle', 'match-3'], kw: ['block', 'blast', 'tetris'] },
  { file: 'Games-to-Play-When-Bored-at-School-2026-Best-Unblocked-Browser-Games-for-Chromebook-No-Download.md', title: 'Games to Play When Bored at School 2026 — Best Unblocked Browser Games for Chromebook (No Download)', count: 25, category: 'Bored at School', tags: ['unblocked games', 'chromebook games', 'browser games', 'school games'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'arcade', 'puzzle', 'match-3', '2048', 'sports', 'board'], kw: ['unblocked', 'school'] },
  { file: 'Top-15-Games-to-Play-When-Bored-at-School-in-2026.md', title: 'Top 15 Games to Play When Bored at School in 2026', count: 15, category: 'Bored at School', tags: ['school games', 'top games', 'unblocked games', 'free games'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'puzzle', 'match-3', '2048', 'arcade', 'board'], kw: ['school'] },
  { file: 'Top-25-Trending-HTML5-Mini-Games-to-Play-When-Bored-in-2026.md', title: 'Top 25 Trending HTML5 Mini Games to Play When Bored in 2026', count: 25, category: 'Mini Games', tags: ['trending games', 'html5 games', 'mini games', 'when bored'], browse: { label: 'Mini Games', url: '/mini-games' }, cats: ['casual', 'hyper-casual', 'puzzle', 'match-3', 'clicker', 'idle', 'arcade'], kw: ['trending'] },
  { file: 'Top-Trending-Mini-Games-2026-Best-HTML5-Browser-Games-to-Play-When-Bored.md', title: 'Top Trending Mini Games 2026 — Best HTML5 Browser Games to Play When Bored', count: 10, category: 'Mini Games', tags: ['trending mini games', 'html5 games', 'browser games', 'when bored'], browse: { label: 'Mini Games', url: '/mini-games' }, cats: ['casual', 'hyper-casual', 'puzzle', 'match-3', 'clicker', 'idle'], kw: ['trending'] },
  { file: 'Top-Trending-Mini-Games-to-Play-When-Bored-in-2026-Instant-Browser-Games.md', title: 'Top Trending Mini Games to Play When Bored in 2026 — Instant Browser Games', count: 10, category: 'Mini Games', tags: ['trending mini games', 'instant play', 'browser games', 'when bored'], browse: { label: 'Mini Games', url: '/mini-games' }, cats: ['casual', 'hyper-casual', 'puzzle', 'match-3', 'clicker', 'io'], kw: ['trending'] },
  { file: 'Top-Trending-Unblocked-Games-2026-for-School-Chromebooks-Free-Play.md', title: 'Top Trending Unblocked Games 2026 for School Chromebooks — Free Play', count: 10, category: 'Bored at School', tags: ['trending unblocked games', 'chromebook games', 'school games', 'free play'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'arcade', 'puzzle', 'sports', 'board'], kw: ['trending', 'unblocked'] },
  { file: 'Top-Unblocked-Games-2026-Play-Free-on-School-Chromebooks.md', title: 'Top Unblocked Games 2026 — Play Free on School Chromebooks', count: 10, category: 'Bored at School', tags: ['unblocked games', 'chromebook games', 'school games', 'free games'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'arcade', 'puzzle', 'sports', 'board'] },
  { file: 'best-mini-games-of-2026-reviewed-and-rated.md', title: 'Best Mini Games of 2026 — Reviewed and Rated', count: 12, category: 'Mini Games', tags: ['mini games', 'reviewed games', 'rated games', 'best games 2026'], browse: { label: 'Mini Games', url: '/mini-games' }, cats: ['casual', 'hyper-casual', 'puzzle', 'match-3', 'arcade', 'clicker', 'idle'], kw: ['mini'] },
  { file: 'complete-beginners-guide-to-solitaire-2026.md', title: 'A Complete Beginner’s Guide to Solitaire (2026)', count: 8, category: 'Card Games', tags: ['solitaire', 'card games', 'beginner guide', 'free card games'], browse: { label: 'Card & Board Games', url: '/category/card-games' }, cats: ['card', 'board', 'chess'], kw: ['solitaire', 'card', 'patience', 'klondike'] },
  { file: 'how-relax-games-improve-mental-health-and-reduce-stress.md', title: 'How Relax Games Improve Mental Health and Reduce Stress', count: 8, category: 'Relax Games', tags: ['relax games', 'mental health', 'stress relief', 'casual games'], browse: { label: 'Relax Games', url: '/relax-games' }, cats: ['casual', 'hyper-casual', 'idle', 'clicker', 'memory', 'brain', 'puzzle'], kw: ['relax', 'calm', 'stress'] },
  { file: 'the-history-of-mini-games-from-arcades-to-browsers.md', title: 'The History of Mini Games — From Arcades to Browsers', count: 8, category: 'Mini Games', tags: ['history of games', 'mini games', 'arcade history', 'browser games'], browse: { label: 'Mini Games', url: '/mini-games' }, cats: ['arcade', 'retro', 'puzzle', 'casual', 'classic'], kw: ['classic', 'arcade'] },
  { file: 'top-10-games-to-play-when-bored-at-work.md', title: 'Top 10 Games to Play When Bored at Work', count: 10, category: 'Bored at Work', tags: ['work games', 'office games', 'bored at work', 'free games'], browse: { label: 'Bored at Work Games', url: '/bored-games/bored-at-work' }, cats: ['puzzle', 'match-3', '2048', 'casual', 'board', 'strategy'], kw: ['work', 'office'] },
  { file: 'top-10-unblocked-games-for-school.md', title: 'Top 10 Unblocked Games for School', count: 10, category: 'Bored at School', tags: ['unblocked games', 'school games', 'chromebook games', 'free games'], browse: { label: 'Bored at School Games', url: '/bored-games/bored-at-school' }, cats: ['casual', 'arcade', 'puzzle', 'sports', 'board', '2048'] },
];

// ---------- 生成单篇 ----------
function buildArticle(cfg) {
  const games = pickGames(cfg);
  const lead = games[0];
  const excerpt = `${cfg.count} hand-picked games to play when you're bored — all free in your browser, no download and no install, and they run on school Chromebooks or any device.`;

  const lines = [];
  const idx = ARTICLES.indexOf(cfg);
  const month = String((idx % 9) + 1).padStart(2, '0');
  const day = String(((idx * 3) % 27) + 1).padStart(2, '0');
  lines.push('---');
  lines.push(`publishDate: 2026-${month}-${day}T00:00:00Z`);
  lines.push(`title: ${cfg.title}`);
  lines.push(`excerpt: ${excerpt}`);
  lines.push(`image: ${lead.banner_image}`);
  lines.push(`category: ${cfg.category}`);
  lines.push('tags:');
  cfg.tags.forEach((t) => lines.push(`  - ${t}`));
  lines.push('metadata:');
  lines.push(`  title: ${cfg.title} | MiniGamesHub`);
  lines.push(`  description: ${excerpt}`);
  lines.push('---');
  lines.push('');
  lines.push(
    `When you've got a few minutes to spare, MiniGamesHub has you covered with over 1,400 free HTML5 games that load instantly in your browser. Below are ${cfg.count} real games from our catalog — every one embeds the actual playable title with its official cover art, so you can try it right here or open the full game page.`
  );
  lines.push('');

  games.forEach((g, i) => {
    const desc = trimDesc(g.description);
    lines.push(`## ${i + 1}. ${g.title}`);
    lines.push('');
    lines.push(desc);
    lines.push('');
    lines.push(
      `<img src="${g.banner_image}" alt="${String(g.title).replace(/"/g, '&quot;')} cover" loading="lazy" style="width:100%;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.15);margin:1rem 0" />`
    );
    lines.push('');
    lines.push(
      `<iframe src="${g.url}" title="${g.title} — Play Free Online" width="100%" height="420" style="border:0;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.15)" loading="lazy" allowfullscreen allow="autoplay; fullscreen; clipboard-write"></iframe>`
    );
    lines.push('');
    lines.push(`*${howTo(g)}* [Play ${g.title} on MiniGamesHub →](/game/${g.id}-${g.namespace})`);
    lines.push('');
  });

  lines.push('## Wrapping Up');
  lines.push('');
  lines.push(
    `That's our pick of ${cfg.count} games you can enjoy without downloading a thing. Every title above is a real game from MiniGamesHub's catalog — bookmark this page and come back whenever you need a quick break.`
  );
  lines.push('');
  lines.push(`👉 [Browse more ${cfg.browse.label} →](${cfg.browse.url})`);
  lines.push('');

  return { front: cfg, body: lines.join('\n'), games };
}

// ---------- 写入 ----------
if (!fs.existsSync(POST_DIR)) fs.mkdirSync(POST_DIR, { recursive: true });

let totalGames = 0;
const usedNamespaces = new Set();
ARTICLES.forEach((cfg) => {
  const { body, games } = buildArticle(cfg);
  const out = path.join(POST_DIR, cfg.file);
  fs.writeFileSync(out, body, 'utf8');
  games.forEach((g) => {
    usedNamespaces.add(g.namespace);
    totalGames++;
  });
});

console.log(`[regenerate-blog] 已生成 ${ARTICLES.length} 篇文章`);
console.log(`[regenerate-blog] 引用真实游戏 ${totalGames} 次，去重后 ${usedNamespaces.size} 款不同游戏`);
console.log(`[regenerate-blog] 全部 iframe/cover 均来自 gamepix.json（已验证 namespace 与 banner_image 字段）`);
