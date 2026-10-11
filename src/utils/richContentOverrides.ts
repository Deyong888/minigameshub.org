/**
 * 游戏页富内容回填(四维质量审计,2026-10-11)。
 *
 * `src/data/rich-content-overrides.json` 按游戏 id 存放人工撰写的原创
 * rich_content(全部基于 GamePix 描述改写,不编造评分/玩家数/特性)。
 * 之所以不用直接改 gamepix.json: `npm run fetch-games` 会整体覆写该文件,
 * 独立文件 + 三处合并才能在 refetch 后存活。
 *
 * 合并点(三处必须一致,与 gameSeo.ts 的注释对应):
 * 1. src/data/games.ts —— 游戏页/全站取数的唯一 Game 映射
 * 2. src/integrations/game-sitemap.ts —— sitemap-games.xml 的收录判定
 * 3. astro.config.ts —— @astrojs/sitemap filter 的排除判定
 */
import overrides from '../data/rich-content-overrides.json';

const table = overrides as Record<string, string>;

/** 返回某游戏的人工回填 rich_content(去空白后),没有则返回 undefined。 */
export const getRichContentOverride = (id: string): string | undefined => {
  const html = table[id]?.trim();
  return html ? html : undefined;
};

/** 把回填合并进一条游戏记录,保持 isGameIndexable 三处判定一致。 */
export const withRichContentOverride = <T extends { id: string; rich_content?: string | null }>(
  game: T
): T => {
  const override = getRichContentOverride(game.id);
  if (!override) return game;
  return { ...game, rich_content: override };
};
