import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = path.join(__dirname, '../src/data/gamepix.json');

const SID = 'GM8A7';
const PER_PAGE = 96;

// 配置：通用 feed 抓取多少页（按质量排序，新游戏高质量排在 page1 顶部）
const GENERAL_PAGES = 25;
// 各分类抓取多少页（补充长尾/分类多样性）
const CATEGORIES = [
  '2048', 'match-3', 'simulation', 'stickman', 'arcade', 'puzzle',
  'sports', 'strategy', 'board', 'action', 'adventure', 'driving',
  'junior', 'classic',
];
const CAT_PAGES = 3;

function buildUrls() {
  const urls = [];
  for (let p = 1; p <= GENERAL_PAGES; p++) {
    urls.push(`https://feeds.gamepix.com/v2/json?sid=${SID}&pagination=${PER_PAGE}&page=${p}`);
  }
  for (const cat of CATEGORIES) {
    for (let p = 1; p <= CAT_PAGES; p++) {
      urls.push(`https://feeds.gamepix.com/v2/json?sid=${SID}&category=${cat}&pagination=${PER_PAGE}&page=${p}`);
    }
  }
  return urls;
}

async function fetchWithRetry(url, retries = 3, delayMs = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch ${url}: ${response.statusText}`);
        if (attempt < retries) {
          console.log(`  Retrying in ${delayMs}ms... (attempt ${attempt + 1}/${retries})`);
          await new Promise((r) => setTimeout(r, delayMs));
          continue;
        }
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${url} (attempt ${attempt}/${retries}):`, error.message || error);
      if (attempt < retries) {
        console.log(`  Retrying in ${delayMs}ms... (attempt ${attempt + 1}/${retries})`);
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  return null;
}

async function fetchGames() {
  console.log('Starting expanded game fetch...');
  const url = buildUrls();
  console.log(`Total feed requests to make: ${url.length}`);
  let allItems = [];
  let done = 0;

  for (const u of url) {
    const data = await fetchWithRetry(u);
    if (data && data.items && Array.isArray(data.items)) {
      allItems = allItems.concat(data.items);
    }
    done++;
    if (done % 10 === 0) console.log(`Progress: ${done}/${url.length} requests, ${allItems.length} raw items`);
  }

  // 去重：以 game id 为准，保留首次出现（通用 feed 质量排序优先）
  const uniqueGamesMap = new Map();
  allItems.forEach((game) => {
    if (game && game.id && !uniqueGamesMap.has(game.id)) {
      uniqueGamesMap.set(game.id, game);
    }
  });

  const uniqueGames = Array.from(uniqueGamesMap.values());
  // 确保日期字段存在（用于"上新"排序兜底）
  uniqueGames.forEach((g) => {
    if (!g.date_published) g.date_published = g.date_modified || new Date(0).toUTCString();
  });

  console.log(`Total unique games: ${uniqueGames.length}`);

  const finalData = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'MiniGamesHub Aggregated Feed',
    home_page_url: 'https://minigameshub.org/',
    feed_url: 'https://minigameshub.org/feed.json',
    modified: new Date().toISOString(),
    items: uniqueGames,
  };

  try {
    // compact 写入以减少文件体积与解析耗时
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(finalData));
    console.log(`Successfully wrote ${uniqueGames.length} games to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error writing file:', error);
    process.exit(1);
  }
}

fetchGames();
