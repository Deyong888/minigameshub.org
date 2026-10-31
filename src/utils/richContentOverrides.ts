/**
 * 游戏页富内容回填(四维质量审计,2026-10-11)。
 *
 * `src/data/rich-content-overrides.json` 按游戏 id 存放人工撰写的原创
 * rich_content(全部基于 GamePix 描述改写,不编造评分/玩家数/特性)。
 * 之所以不用直接改 gamepix.json: `npm run fetch-games` 会整体覆写该文件,
 * 独立文件 + 三处合并才能在 refetch 后存活。
 *
 * 分片规则(Top500 分批放行,2026-10-21 起):基础文件保持不动,后续批次
 * 依次写入 `src/data/rich-content-overrides-b1.json`、`-b2.json` ……`-b9.json`,
 * 并在下方登记导入合并。合并顺序:基础 < b1 < … < b8 < b9(同 key 时后者
 * 覆盖前者;正常情况下各批次选品不重复,不会发生覆盖)。新增批次时只需
 * 加一个分片文件 + 一行导入。
 *
 * 合并点(三处必须一致,与 gameSeo.ts 的注释对应):
 * 1. src/data/games.ts —— 游戏页/全站取数的唯一 Game 映射
 * 2. src/integrations/game-sitemap.ts —— sitemap-games.xml 的收录判定
 * 3. astro.config.ts —— @astrojs/sitemap filter 的排除判定
 */
import baseOverrides from '../data/rich-content-overrides.json';
import batch1Overrides from '../data/rich-content-overrides-b1.json';
import batch2Overrides from '../data/rich-content-overrides-b2.json';
import batch3Overrides from '../data/rich-content-overrides-b3.json';
import batch4Overrides from '../data/rich-content-overrides-b4.json';
import batch5Overrides from '../data/rich-content-overrides-b5.json';
import batch6Overrides from '../data/rich-content-overrides-b6.json';
import batch7Overrides from '../data/rich-content-overrides-b7.json';
import batch8Overrides from '../data/rich-content-overrides-b8.json';

const table: Record<string, string> = {
  ...(baseOverrides as Record<string, string>),
  ...(batch1Overrides as Record<string, string>),
  ...(batch2Overrides as Record<string, string>),
  ...(batch3Overrides as Record<string, string>),
  ...(batch4Overrides as Record<string, string>),
  ...(batch5Overrides as Record<string, string>),
  ...(batch6Overrides as Record<string, string>),
  ...(batch7Overrides as Record<string, string>),
  ...(batch8Overrides as Record<string, string>),
};

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
