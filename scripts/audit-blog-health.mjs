/**
 * 博客文章健康度审计
 *
 * 检查 37 篇 AI 批量生成的文章中，内嵌游戏 iframe 是否指向站内真实存在的游戏。
 * 指向不存在的游戏时，GamePix 会 302 重定向到一个兜底游戏（Tentrix），
 * 导致文章正文与实际可玩内容不符。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POST_DIR = path.join(ROOT, 'src/data/post');

const games = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/gamepix.json'), 'utf8')).items;
const validNs = new Set(games.map((g) => g.namespace || g.id));

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.md') || p.endsWith('.mdx') ? [p] : [];
  });
}

const files = walk(POST_DIR);
let total = 0;
let missing = 0;
const missDetail = {};
const filesAffected = new Set();

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/https:\/\/games\.gamepix\.com\/play\/([a-zA-Z0-9_-]+)/g)) {
    total++;
    if (!validNs.has(m[1])) {
      missing++;
      missDetail[m[1]] = (missDetail[m[1]] || 0) + 1;
      filesAffected.add(path.basename(f));
    }
  }
}

const bodyImgs = files.reduce((n, f) => {
  const src = fs.readFileSync(f, 'utf8');
  return n + (src.match(/<img src="https:\/\/images\.unsplash\.com/g) || []).length;
}, 0);

console.log('===== 博客文章健康度审计 =====');
console.log(`文章总数              : ${files.length}`);
console.log(`iframe 内嵌游戏引用    : ${total}`);
console.log(`  ✅ 站内存在          : ${total - missing}`);
console.log(`  ❌ 站内不存在(会兜底) : ${missing} (${total ? ((100 * missing) / total).toFixed(0) : 0}%)`);
console.log(`缺失游戏明细          : ${JSON.stringify(missDetail)}`);
console.log(`受影响文章数          : ${filesAffected.size}`);
console.log(`正文 Unsplash 图片     : ${bodyImgs}（均为外链库存图，非站内游戏截图）`);
