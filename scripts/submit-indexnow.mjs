// 向 IndexNow (Bing/Yandex/Naver/Seznam 等) 提交站点地图，加速新页面收录。
// 用法（部署 dist/ 之后执行）：node scripts/submit-indexnow.mjs
//
// 原理：IndexNow 协议只需告知「哪些 URL 已变更」，搜索引擎会主动抓取。
// 这里读取 dist/ 下生成的 sitemap，把全部页面 URL 一次性提交；
// 同时依赖 public/<key>.txt 密钥文件（已随站点一起发布）完成鉴权。
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://minigameshub.org';

// 1) 找到 public/ 下 32 位十六进制密钥文件，并读取密钥
const publicDir = join(__dirname, '../public');
const keyFileName = readdirSync(publicDir).find((f) => /^[a-f0-9]{32,}\.txt$/.test(f));
if (!keyFileName) {
  console.error('未找到 IndexNow 密钥文件（public/ 下应为 32 位十六进制 .txt）');
  process.exit(1);
}
const key = readFileSync(join(publicDir, keyFileName), 'utf8').trim();
const keyLocation = `${SITE}/${keyFileName}`;

// 2) 收集 dist/ 里 sitemap 中的全部 URL
function collectUrls() {
  const distDir = join(__dirname, '../dist');
  const urls = [];
  for (const f of readdirSync(distDir)) {
    if (!/^sitemap.*\.xml$/.test(f)) continue;
    const xml = readFileSync(join(distDir, f), 'utf8');
    const locs = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    for (const loc of locs) {
      urls.push(loc.replace(/^<loc>/, '').replace(/<\/loc>$/, ''));
    }
  }
  return [...new Set(urls)];
}

const urls = collectUrls();
if (urls.length === 0) {
  console.error('未在 dist/ 找到 sitemap，请先执行 `npm run build`。');
  process.exit(1);
}
console.log(`收集到 ${urls.length} 个 URL，准备提交 IndexNow...`);

const payload = {
  host: new URL(SITE).host,
  key,
  keyLocation,
  urlList: urls,
};

// IndexNow 支持多个端点，逐一尝试
const endpoints = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://searchadvisor.naver.com/indexnow',
];

for (const endpoint of endpoints) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    console.log(`${endpoint} -> ${res.status} ${res.statusText}`);
  } catch (err) {
    console.warn(`${endpoint} 提交失败:`, err.message);
  }
}
