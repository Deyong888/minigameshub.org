import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate } from './astro/server_BWaOESUl.mjs';
import 'piccolore';
import 'clsx';
import { g as getLangFromUrl } from './Layout_8YgtWv08.mjs';
/* empty css                         */

const $$Astro = createAstro("https://minigameshub.org");
const $$GameCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GameCard;
  const { game, variant = "default", lazy = true } = Astro2.props;
  const lang = getLangFromUrl(Astro2.url);
  const slug = game.slug || game.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const gameUrl = lang === "es" ? `/es/game/${game.id}-${slug}` : lang === "zh" ? `/zh/game/${game.id}-${slug}` : `/game/${game.id}-${slug}`;
  const altText = `${game.title} - ${game.category} game, play online free, no download`;
  return renderTemplate`${maybeRenderHead()}<article class="game-card group"${addAttribute(game.id, "data-game-id")}${addAttribute(game.category, "data-category")} data-astro-cid-2qa2wxph> <a${addAttribute(gameUrl, "href")} class="block relative overflow-hidden rounded-xl bg-gray-800 transition-transform hover:scale-105" data-astro-cid-2qa2wxph> <!-- 缩略图 --> <div class="aspect-[4/3] relative overflow-hidden" data-astro-cid-2qa2wxph> <img${addAttribute(game.thumbnail, "src")}${addAttribute(altText, "alt")}${addAttribute(variant === "compact" ? 200 : 300, "width")}${addAttribute(variant === "compact" ? 150 : 225, "height")}${addAttribute(lazy ? "lazy" : "eager", "loading")} decoding="async" class="w-full h-full object-cover transition-transform group-hover:scale-110" data-astro-cid-2qa2wxph> <!-- 悬停遮罩 --> <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" data-astro-cid-2qa2wxph> <div class="text-center" data-astro-cid-2qa2wxph> <div class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-2xl mb-2 mx-auto" data-astro-cid-2qa2wxph>▶</div> <span class="text-white font-medium" data-astro-cid-2qa2wxph>Play Now</span> </div> </div> <!-- 标签 --> ${game.tags?.includes("new") && renderTemplate`<span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded" data-astro-cid-2qa2wxph>NEW</span>`} ${game.tags?.includes("hot") && renderTemplate`<span class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded" data-astro-cid-2qa2wxph>HOT</span>`} </div> <!-- 游戏信息 --> <div class="p-3" data-astro-cid-2qa2wxph> <h3 class="text-white font-semibold truncate group-hover:text-green-400 transition-colors" data-astro-cid-2qa2wxph> ${game.title} </h3> <div class="flex items-center justify-between mt-2 text-sm text-gray-400" data-astro-cid-2qa2wxph> <span class="capitalize" data-astro-cid-2qa2wxph>${game.category}</span> <span class="flex items-center gap-1" data-astro-cid-2qa2wxph> <span data-astro-cid-2qa2wxph>⭐</span> <span data-astro-cid-2qa2wxph>${(Math.random() * 2 + 3).toFixed(1)}</span> </span> </div> <!-- SEO关键词标签（视觉隐藏但SEO可见） --> <div class="sr-only" data-astro-cid-2qa2wxph>
Play ${game.title} online free. ${game.category} game, no download required, instant play.
</div> </div> </a> </article> `;
}, "E:/website/minigameshub.org/src/components/game/GameCard.astro", void 0);

export { $$GameCard as $ };
