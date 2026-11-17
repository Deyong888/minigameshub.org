/**
 * 游戏页可索引性唯一判定源(AdSense 合规整改,2026-10-08)。
 *
 * 一个游戏页只有在携带足够原创内容时才允许被搜索引擎索引:
 * - rich_content 去空白后长度 >= 200 字符, 或
 * - description 词数 >= 150
 *
 * 其余一律 noindex(但 follow,保留内链权重传递)。
 *
 * 共用方(三处必须一致):
 * 1. 五语种游戏页 metadata robots(src/pages/game/[id]-[slug].astro 及
 *    es/zh/de/pt 同名页)
 * 2. src/integrations/game-sitemap.ts —— noindex URL 永不进 sitemap-games.xml
 * 3. src/data/games.ts 的 getGameStaticPaths —— 外壳方案(2026-11-16)起,
 *    只有可索引游戏才预渲染静态页,其余由播放器外壳承接
 * (astro.config.ts 的 @astrojs/sitemap filter 自 2026-11-16 起不再用此判定:
 * 游戏页改静态预渲染后全部排除出 sitemap-0.xml,可索引页只进 sitemap-games.xml。)
 *
 * 数据实测(2026-10-08):gamepix.json 7285 个游戏 rich_content 全空,
 * description 词数 max 57 → 现阶段 7285 页将全部 noindex,sitemap-games.xml 为空。
 * 这是刻意为之:thin-content 页先收敛,等富内容补齐后再放行。
 */

export interface IndexableGameLike {
  rich_content?: string | null;
  description?: string | null;
}

const countWords = (s: string): number =>
  s
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

/** rich_content>=200字符 或 description>=150词 才可索引。 */
export const isGameIndexable = (game: IndexableGameLike): boolean => {
  const rich = (game.rich_content ?? '').trim();
  if (rich.length >= 200) return true;
  const desc = (game.description ?? '').trim();
  if (desc && countWords(desc) >= 150) return true;
  return false;
};
