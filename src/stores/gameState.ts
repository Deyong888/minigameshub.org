import { persistentMap } from '@nanostores/persistent';

export interface GameState {
  favorites: string[]; // List of game slugs
  history: string[];   // List of game slugs
}

export const gameState = persistentMap<GameState>('boredgames:state', {
  favorites: [],
  history: [],
}, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const addFavorite = (slug: string) => {
  const current = gameState.get();
  if (!current.favorites.includes(slug)) {
    gameState.setKey('favorites', [...current.favorites, slug]);
  }
};

export const removeFavorite = (slug: string) => {
  const current = gameState.get();
  gameState.setKey('favorites', current.favorites.filter(s => s !== slug));
};

export const toggleFavorite = (slug: string) => {
  const current = gameState.get();
  if (current.favorites.includes(slug)) {
    removeFavorite(slug);
  } else {
    addFavorite(slug);
  }
};

export const addToHistory = (slug: string) => {
  const current = gameState.get();
  const newHistory = [slug, ...current.history.filter(s => s !== slug)].slice(0, 20);
  gameState.setKey('history', newHistory);
};

export const isFavorite = (slug: string) => {
  return gameState.get().favorites.includes(slug);
};
