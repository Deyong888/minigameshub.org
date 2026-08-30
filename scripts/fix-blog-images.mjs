/**
 * 修复博客文章中的 Unsplash 图片问题
 *
 * 背景：37 篇博客文章由 AI 批量生成，其中的 Unsplash 图片 URL 大量为编造的 ID（HTTP 404）。
 * Astro 5 的 content layer 会自动优化 Markdown 正文图片，对远程 URL 执行 inferSize
 * （下载图片推断尺寸），遇到 404 即抛错中断构建：
 *   "Failed to parse image reference: {"inferSize":true,"src":"...","alt":"...","loading":"lazy","index":0}"
 *
 * 修复策略：
 *   1. 正文图片 `![alt](url)` → 转为原生 <img> 标签，带显式 width/height
 *      （绕开 content layer 的 inferSize，同时消除 CLS 布局偏移）
 *   2. 404 死链图片 → 删除该行（保留正文文字内容）
 *   3. frontmatter 头图 404 → 替换为站内真实游戏封面（img.gamepix.com）
 *
 * 用法：node scripts/fix-blog-images.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POST_DIR = path.join(ROOT, 'src/data/post');
const GAMEPIX = path.join(ROOT, 'src/data/gamepix.json');
const DRY = process.argv.includes('--dry');

/* ---------- 工具 ---------- */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 15000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      const status = res.statusCode;
      res.destroy();
      resolve(status === 200);
    });
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.on('error', () => resolve(false));
  });
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx]);
      }
    })
  );
  return out;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.md') || p.endsWith('.mdx') ? [p] : [];
  });
}

/** 从 Unsplash URL 查询串解析尺寸，缺省按 16:9 推断 */
function parseDims(url) {
  const q = url.slice(url.indexOf('?') + 1);
  const w = Number(new URLSearchParams(q).get('w')) || 800;
  const h = Number(new URLSearchParams(q).get('h')) || Math.round((w * 9) / 16);
  return { w, h };
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- 站内游戏索引 ---------- */

const games = JSON.parse(fs.readFileSync(GAMEPIX, 'utf8')).items
  .map((g) => ({ title: g.title, ns: g.namespace || g.id, img: g.banner_image || g.image, category: g.category }))
  .filter((g) => g.img);

/** 从文本中匹配站内游戏（按标题长度优先，避免短名误匹配） */
const sortedGames = [...games].sort((a, b) => b.title.length - a.title.length);
function matchGame(text) {
  const t = text.toLowerCase();
  for (const g of sortedGames) {
    const title = g.title.toLowerCase();
    if (title.length >= 5 && t.includes(title)) return g;
  }
  return null;
}

const STOPWORDS = new Set([
  'best', 'top', 'games', 'game', 'play', 'playing', 'free', 'online', 'unblocked', 'mini',
  'browser', 'html5', 'when', 'bored', 'at', 'school', 'work', 'in', 'the', 'for', 'and',
  'no', 'download', 'needed', 'required', 'chromebook', '2026', 'instantly', 'to', 'of',
  'that', 'actually', 'instant', 'fun', 'guide', 'complete', 'beginners', 'how', 'trending',
  'reviewed', 'rated', 'improve', 'mental', 'health', 'reduce', 'stress', 'history',
]);

/** 头图兜底：按文章标题关键词在站内游戏里挑最相关的 */
function matchGameByTitle(postTitle) {
  const words = postTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w));

  if (!words.length) return null;
  let best = null;
  let bestScore = 0;
  for (const g of games) {
    const gt = g.title.toLowerCase();
    const score = words.reduce((s, w) => s + (gt.includes(w) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = g; }
  }
  return bestScore > 0 ? best : null;
}

/** 文章分类 → 站内游戏分类（与 src/data/games.ts 的分类逻辑保持一致） */
const CATEGORY_BUCKETS = {
  'bored at school': ['arcade', 'sports', 'racing', 'action', 'adventure', 'runner', 'driving', 'stickman'],
  'bored at work': ['puzzle', 'strategy', 'board', 'card', '2048', 'match-3', 'mahjong', 'solitaire', 'logic', 'simulation'],
  'waiting in line': ['casual', 'puzzle', 'arcade', 'card', 'board'],
  'mini games': ['casual', 'clicker', 'idle', 'junior', 'music'],
};

/** 兜底热门游戏（与 games.ts popularSlugs 一致） */
const POPULAR_SLUGS = [
  'moto-x3m-spooky-land',
  'penalty-kick-wiz',
  'basketball-stars',
  'worm-hunt-snake-game-io-zone',
  'funny-shooter-2',
  'stickman-warriors-1',
  'gelatino',
  'demolition-derby-life',
];

/** 稳定哈希，用于在同一批候选里轮换，避免多篇文章共用同一张头图 */
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** 头图兜底链：文章标题 → 文章分类（按文件名轮换）→ 热门游戏 */
function pickFallbackGame(postTitle, postCategory, seed) {
  const byTitle = matchGame(postTitle) || matchGameByTitle(postTitle);
  if (byTitle) return byTitle;

  const cats = CATEGORY_BUCKETS[(postCategory || '').toLowerCase()];
  if (cats) {
    const bucket = games.filter((g) => cats.some((c) => (g.category || '').toLowerCase().includes(c)));
    if (bucket.length) return bucket[hashStr(seed) % bucket.length];
  }
  const popular = games.filter((g) => POPULAR_SLUGS.includes(g.ns));
  const pool = popular.length ? popular : games;
  return pool[hashStr(seed) % pool.length];
}

/* ---------- 主流程 ---------- */

const files = walk(POST_DIR);
console.log(`扫描到 ${files.length} 篇文章`);

// 1) 收集全部 Unsplash URL（正文 + 头图）
const urlSet = new Set();
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\((https:\/\/images\.unsplash\.com\/[^)\s]+)/g)) urlSet.add(m[1]);
  for (const m of src.matchAll(/^image:\s*(https:\/\/images\.unsplash\.com\/\S+)/gm)) urlSet.add(m[1]);
}
const urls = [...urlSet];
console.log(`发现 ${urls.length} 个 Unsplash 图片 URL，逐个校验可达性…`);

const status = new Map();
const results = await mapLimit(urls, 8, async (u) => {
  // 用最小尺寸探测，base URL 有效即视为可用
  const ok = await checkUrl(`${u.split('?')[0]}?w=64`);
  await sleep(60);
  return [u, ok];
});
for (const [u, ok] of results) status.set(u, ok);

const dead = urls.filter((u) => !status.get(u));
console.log(`  ✅ 有效 ${urls.length - dead.length} 个 / ❌ 404 死链 ${dead.length} 个`);

// 2) 逐文件改写
let stat = { files: 0, bodyKept: 0, bodyRemoved: 0, heroFixed: 0, heroKept: 0, embedFixed: 0 };

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  const original = src;
  const rel = path.relative(ROOT, file);
  let changed = false;

  // --- 2a. frontmatter 头图 ---
  const heroMatch = src.match(/^image:\s*(https:\/\/images\.unsplash\.com\/\S+)/m);
  if (heroMatch) {
    const url = heroMatch[1];
    if (!status.get(url)) {
      const titleMatch = src.match(/^title:\s*"?(.+?)"?\s*$/m);
      const catMatch = src.match(/^category:\s*"?(.+?)"?\s*$/m);
      const postTitle = titleMatch ? titleMatch[1] : '';
      const postCategory = catMatch ? catMatch[1] : '';
      const g = pickFallbackGame(postTitle, postCategory, path.basename(file));
      const newUrl = g.img.replace(/([?&])w=\d+/, '$1w=1200');
      src = src.replace(heroMatch[0], `image: ${newUrl}`);
      stat.heroFixed++;
      console.log(`  [头图] ${path.basename(file)}\n        404 → ${g.title}（站内真实封面）`);
      changed = true;
    } else {
      stat.heroKept++;
    }
  }

  // --- 2b. 正文图片 ---
  src = src.replace(/!\[([^\]]*)\]\((https:\/\/images\.unsplash\.com\/[^)\s]+)(?:\s+"([^"]*)")?\)/g, (_full, alt, url) => {
    if (!status.get(url)) {
      stat.bodyRemoved++;
      return ''; // 死链：移除，保留正文文字
    }
    const { w, h } = parseDims(url);
    stat.bodyKept++;
    return `<img src="${url}" alt="${escapeAttr(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async" />`;
  });

  // --- 2c. 清理因删图产生的连续空行 ---
  src = src.replace(/\n{4,}/g, '\n\n\n');
  src = src.replace(/[ \t]+\n/g, '\n');

  if (src !== original) {
    changed = true;
  }
  if (changed) {
    stat.files++;
    if (!DRY) fs.writeFileSync(file, src, 'utf8');
  }
}

console.log('\n===== 汇总 =====');
console.log(`修改文件数        : ${stat.files}`);
console.log(`正文图片 保留(转<img>) : ${stat.bodyKept}`);
console.log(`正文图片 删除(404)    : ${stat.bodyRemoved}`);
console.log(`头图     修复       : ${stat.heroFixed}`);
console.log(`头图     无变化(有效) : ${stat.heroKept}`);
console.log(DRY ? '\n[DRY RUN] 未写入任何文件' : '\n已写入文件');
