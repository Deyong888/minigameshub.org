/**
 * 二次清理：修复主脚本遗漏的畸形图片 URL
 *
 * 1) 部分 Markdown 图片的 URL 里混入了带空格的 &alt=... 垃圾参数，
 *    导致 URL 畸形（curl 直接报错），且主脚本的正则（遇空格停止）无法匹配。
 * 2) 部分 URL 存在 w-800 拼写错误（应为 w=800），导致尺寸参数失效、
 *    Unsplash 返回原图，拖慢 LCP。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POST_DIR = path.resolve(__dirname, '../src/data/post');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.md') || p.endsWith('.mdx') ? [p] : [];
  });
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function dims(url) {
  const q = url.slice(url.indexOf('?') + 1);
  const p = new URLSearchParams(q);
  const w = Number(p.get('w')) || 800;
  const h = Number(p.get('h')) || Math.round((w * 9) / 16);
  return { w, h };
}

const IMG_RE = /!\[([^\]]*)\]\((https:\/\/images\.unsplash\.com\/[^)\n]+)\)/g;

let fixed = 0;
let typo = 0;
let files = 0;

for (const file of walk(POST_DIR)) {
  const original = fs.readFileSync(file, 'utf8');
  let src = original;

  src = src.replace(IMG_RE, (_m, alt, rawUrl) => {
    // 截掉 &alt=... 及其后所有内容（含空格）
    const url = rawUrl.split('&alt=')[0].trim();
    const { w, h } = dims(url);
    fixed++;
    return `<img src="${url}" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async" />`;
  });

  const beforeTypo = src;
  src = src.replace(/([?&])w-(\d+)/g, '$1w=$2');
  if (src !== beforeTypo) typo++;

  if (src !== original) {
    fs.writeFileSync(file, src, 'utf8');
    files++;
  }
}

console.log(`畸形图片修复   : ${fixed} 处`);
console.log(`w-800 拼写修正 : ${typo} 处`);
console.log(`修改文件       : ${files} 个`);
