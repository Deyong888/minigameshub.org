import { allGames } from '~/data/games';
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  // 外壳方案(2026-11-16):通用播放器外壳(GameShell)按 URL 中的游戏 ID
  // 查此索引渲染标题/简介/播放器,因此需带 description。embed URL 不用
  // 存:GamePix 格式固定为 https://play.gamepix.com/{slug}/embed?sid=GM8A7
  // (7,305 款实测零例外),外壳直接由 slug 拼接。
  const lightweightGames = allGames.map((game) => ({
    id: game.id,
    slug: game.slug,
    title: game.title,
    category: game.category,
    thumbnail: game.thumbnail,
    description: game.description,
  }));

  return new Response(JSON.stringify(lightweightGames), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
