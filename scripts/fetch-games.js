import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = path.join(__dirname, '../src/data/gamepix.json');

const URLS = [
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&pagination=96&page=2',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&pagination=96&page=3',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&pagination=96&page=4',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=2048&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=match-3&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=simulation&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=stickman&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=arcade&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=arcade&pagination=96&page=2',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=puzzle&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=puzzle&pagination=96&page=2',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=sports&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=strategy&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=board&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=action&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=adventure&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=driving&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=junior&pagination=96&page=1',
  'https://feeds.gamepix.com/v2/json?sid=GM8A7&category=classic&pagination=96&page=1'
];

async function fetchGames() {
  console.log('Starting game fetch...');
  let allItems = [];

  for (const url of URLS) {
    try {
      console.log(`Fetching: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch ${url}: ${response.statusText}`);
        continue;
      }
      const data = await response.json();
      if (data.items && Array.isArray(data.items)) {
        console.log(`Found ${data.items.length} games.`);
        allItems = allItems.concat(data.items);
      }
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  }

  // Deduplicate
  const uniqueGamesMap = new Map();
  allItems.forEach(game => {
    // Prefer higher quality score or newer modification date if duplicate?
    // For now, first come first serve or just overwrite.
    // Let's stick with the first one found, but maybe the main feed (GM8A7) should take precedence.
    // Since GM8A7 is first in URLS, it will be added first.
    if (!uniqueGamesMap.has(game.id)) {
      uniqueGamesMap.set(game.id, game);
    }
  });

  const uniqueGames = Array.from(uniqueGamesMap.values());
  
  console.log(`Total unique games: ${uniqueGames.length}`);

  // Construct the final JSON structure (similar to original feed wrapper)
  const finalData = {
    version: "https://jsonfeed.org/version/1.1",
    title: "MiniGamesHub Aggregated Feed",
    home_page_url: "https://minigameshub.org/",
    feed_url: "https://minigameshub.org/feed.json",
    modified: new Date().toISOString(),
    items: uniqueGames
  };

  try {
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(finalData, null, 2));
    console.log(`Successfully wrote to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error writing file:', error);
  }
}

fetchGames();
