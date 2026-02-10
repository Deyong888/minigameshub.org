
import { allGames } from '~/data/games';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const lightweightGames = allGames.map(game => ({
    id: game.id,
    slug: game.slug,
    title: game.title,
    thumbnail: game.thumbnail,
    category: game.category,
    rating: game.rating,
    plays: game.plays
  }));

  return new Response(JSON.stringify(lightweightGames), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
