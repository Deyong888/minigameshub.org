import { allGames } from '~/data/games';
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  const lightweightGames = allGames.map((game) => ({
    id: game.id,
    slug: game.slug,
    title: game.title,
    category: game.category,
    thumbnail: game.thumbnail,
  }));

  return new Response(JSON.stringify(lightweightGames), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
