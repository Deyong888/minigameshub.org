import type { Game } from '~/types/game';
import gamepixData from './gamepix.json';

// Helper to map GamePix item to our Game interface
const mapGamePixItem = (item: any): Game => ({
  id: item.id,
  slug: item.namespace || item.id, // Use namespace if available for cleaner URLs
  title: item.title,
  description: item.description,
  thumbnail: item.banner_image || item.image,
  url: item.url,
  width: item.width,
  height: item.height,
  category: item.category,
  tags: [item.category, item.orientation],
  rating: 4.5, // Default rating as not in feed (or could use quality_score * 5)
  plays: Math.floor(Math.random() * 50000) + 10000, // Mock plays for now
});

const allGamePixGames = gamepixData.items.map(mapGamePixItem);

// Categorization Logic
export const featuredGames: Game[] = allGamePixGames.slice(0, 6); // Top 6 quality (assuming feed is sorted)

export const boredAtWorkGames: Game[] = allGamePixGames.filter(g => 
  ['puzzle', 'strategy', 'board', 'card', '2048', 'match-3', 'mahjong', 'solitaire', 'logic', 'simulation'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36); // Limit to 36 for grid

export const boredAtSchoolGames: Game[] = allGamePixGames.filter(g => 
  ['arcade', 'sports', 'racing', 'action', 'adventure', 'runner', 'driving', 'stickman'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const miniGames: Game[] = allGamePixGames.filter(g => 
  ['casual', 'clicker', 'idle', 'junior', 'music'].some(c => g.category.toLowerCase().includes(c)) || g.tags.includes('portrait')
).slice(0, 36);

export const waitingInLineGames: Game[] = allGamePixGames.filter(g => 
  ['casual', 'puzzle', 'arcade', 'card', 'board'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const quickGames: Game[] = allGamePixGames.filter(g => 
  ['arcade', 'runner', 'driving', 'sports'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const unblockedGames: Game[] = allGamePixGames.filter(g => 
  ['puzzle', 'board', 'strategy'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 24);

export const hiddenGames: Game[] = allGamePixGames.filter(g =>
  ['board', 'card', 'puzzle', 'mahjong', 'solitaire'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 24);

export const meetingGames: Game[] = allGamePixGames.filter(g =>
  ['strategy', 'puzzle', 'card', 'turn-based'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 24);

export const officeGames: Game[] = allGamePixGames.filter(g =>
  ['strategy', 'board', 'mahjong', 'solitaire', 'logic'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 24);

export const chromebookGames: Game[] = allGamePixGames.filter(g =>
  ['arcade', 'adventure', 'strategy', 'junior', 'sports'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 24);

export const classroomGames: Game[] = allGamePixGames.filter(g =>
  ['junior', 'puzzle', 'educational', 'word', 'math'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 24);

export const noDownloadGames: Game[] = allGamePixGames.slice(0, 24); // All games are no-download

export const browserGames: Game[] = allGamePixGames.slice(0, 24); // Represent generic browser games
export const html5Games: Game[] = allGamePixGames.slice(10, 34); // Represent generic HTML5 games

// New Categories for MiniGamesHub.org

// 1. Mini Games Subcategories
export const miniArcadeGames: Game[] = allGamePixGames.filter(g => 
  ['arcade', 'runner', 'classic'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const miniPuzzleGames: Game[] = allGamePixGames.filter(g => 
  ['puzzle', 'logic', '2048', 'match-3', 'sudoku', 'mahjong'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const miniActionGames: Game[] = allGamePixGames.filter(g => 
  ['action', 'shooting', 'fighting', 'defense'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const miniRelaxGames: Game[] = allGamePixGames.filter(g => 
  ['casual', 'music', 'board', 'card', 'solitaire'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

// 2. Small Games Subcategories
export const smallCasualGames: Game[] = allGamePixGames.filter(g => 
  ['casual', 'board', 'card', 'simulation'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const smallQuickGames: Game[] = allGamePixGames.filter(g => 
  ['arcade', 'runner', 'driving', 'sports'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const smallShortGames: Game[] = allGamePixGames.filter(g => 
  ['junior', 'educational', 'simple'].some(c => g.category.toLowerCase().includes(c)) || g.tags.includes('portrait')
).slice(0, 36);

// 3. Relax Games Subcategories
export const relaxStressReliefGames: Game[] = allGamePixGames.filter(g => 
  ['puzzle', 'music', 'bubble'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const relaxCalmingGames: Game[] = allGamePixGames.filter(g => 
  ['board', 'solitaire', 'mahjong', 'card'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const relaxCasualGames: Game[] = allGamePixGames.filter(g => 
  ['casual', 'simulation', 'cooking'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

// 4. Arcade Games Subcategories
export const arcadeClassicGames: Game[] = allGamePixGames.filter(g => 
  ['arcade', 'classic', '8bit'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const arcadeRetroGames: Game[] = allGamePixGames.filter(g => 
  ['arcade', 'pixel'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

export const arcadeModernGames: Game[] = allGamePixGames.filter(g => 
  ['action', 'adventure', 'sports', 'racing', '3d'].some(c => g.category.toLowerCase().includes(c))
).slice(0, 36);

// Main Category Exports (aggregates or specific selections)
export const mainMiniGames: Game[] = allGamePixGames.slice(0, 36); // Mix
export const mainSmallGames: Game[] = smallCasualGames;
export const mainRelaxGames: Game[] = relaxCalmingGames;
export const mainArcadeGames: Game[] = arcadeClassicGames;


// If categories are empty (fallback), just take slices
if (boredAtWorkGames.length < 4) boredAtWorkGames.push(...allGamePixGames.slice(6, 14));
if (boredAtSchoolGames.length < 4) boredAtSchoolGames.push(...allGamePixGames.slice(14, 22));
if (miniGames.length < 4) miniGames.push(...allGamePixGames.slice(22, 30));

export const allGames: Game[] = allGamePixGames;

export const getUniqueGames = () => {
  const map = new Map();
  allGames.forEach(g => map.set(g.slug, g));
  return Array.from(map.values());
};

export const getUniqueCategories = () => {
  const categories = new Set(allGames.map(g => g.category));
  return Array.from(categories);
};

export const getGamesByCategory = (category: string) => {
  return allGames.filter(g => g.category === category);
};

export const getRelatedGames = (game: Game, limit: number = 12): Game[] => {
  return allGames
    .filter(g => g.id !== game.id) // Exclude current
    .map(g => {
      let score = 0;
      if (g.category === game.category) score += 3;
      if (g.tags.some(t => game.tags.includes(t))) score += 1;
      return { g, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.g);
};
