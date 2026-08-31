import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, x as renderScript, u as unescapeHTML, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_BWaOESUl.mjs';
import 'piccolore';
import { $ as $$PageLayout } from '../../../chunks/PageLayout_BsFBc9qS.mjs';
import { $ as $$WidgetWrapper } from '../../../chunks/WidgetWrapper_RmwjD2e6.mjs';
import { $ as $$GameGrid } from '../../../chunks/GameGrid_Cp6Go8hJ.mjs';
import { $ as $$GamePlayer } from '../../../chunks/GamePlayer_CPxIyGo6.mjs';
import { $ as $$FaqSection } from '../../../chunks/FaqSection_BF5kPsXT.mjs';
import { k as getUniqueGames, l as getRelatedGames } from '../../../chunks/games_CG0U-iPE.mjs';
import { g as getLangFromUrl, t as translateDynamic, u as useTranslations } from '../../../chunks/Layout_8YgtWv08.mjs';
import { e as getHowToPlayZh, f as getTipsZh, h as getGameDetailsZh, i as getGameFaqZh } from '../../../chunks/gameContent_BEyFbRt_.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://minigameshub.org");
const prerender = false;
const $$idslug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$idslug;
  const gameLookup = new Map(getUniqueGames().map((g) => [`${g.id}-${g.slug}`, g]));
  const game = gameLookup.get(`${Astro2.params.id}-${Astro2.params.slug}`);
  if (!game) {
    return new Response(
      '<!doctype html><html lang="zh"><head><meta charset="utf-8"><title>\u672A\u627E\u5230\u6E38\u620F | MiniGamesHub</title><meta name="robots" content="noindex"></head><body style="font-family:sans-serif;text-align:center;padding:80px"><h1>\u672A\u627E\u5230\u6E38\u620F</h1><p>\u60A8\u67E5\u627E\u7684\u6E38\u620F\u5DF2\u4E0D\u518D\u63D0\u4F9B\u3002</p><p><a href="/zh/">\u8FD4\u56DE MiniGamesHub</a></p></body></html>',
      { status: 404, headers: { "content-type": "text/html; charset=utf-8" } }
    );
  }
  const relatedGames = getRelatedGames(game, 12);
  Astro2.response.headers.set("Cache-Control", "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800");
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const getTranslatedCategory = (cat) => {
    const key = `cat.${cat.toLowerCase()}`;
    const translated = translateDynamic(t, key);
    return translated || cat.charAt(0).toUpperCase() + cat.slice(1);
  };
  const translatedCategory = getTranslatedCategory(game.category);
  const categorySlug = game.category.toLowerCase().replace(/\s+/g, "-");
  const howToPlayZh = getHowToPlayZh(game);
  const tipsZh = getTipsZh(game);
  const detailsZh = getGameDetailsZh(game);
  const faqZh = getGameFaqZh(game);
  const metadata = {
    title: `\u73A9 ${game.title} - \u514D\u8D39\u5728\u7EBF\u6E38\u620F | MiniGamesHub.org`,
    description: `\u5728 MiniGamesHub.org \u514D\u8D39\u5728\u7EBF\u73A9 ${game.title}\u3002\u65E0\u9700\u4E0B\u8F7D\u3002${game.description}`,
    openGraph: {
      type: "video.other",
      images: [
        {
          url: game.thumbnail,
          width: 1200,
          height: 630,
          alt: game.title
        }
      ]
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    image: game.thumbnail,
    url: `https://minigameshub.org/zh/game/${game.id}-${game.slug}`,
    genre: game.category,
    playMode: "SinglePlayer",
    applicationCategory: "Game",
    inLanguage: "zh"
  };
  const playerLabels = {
    loading: "\u6B63\u5728\u52A0\u8F7D",
    bossKey: "\u8001\u677F\u952E",
    mute: "\u9759\u97F3",
    unmute: "\u5F00\u542F\u58F0\u97F3",
    fullscreen: "\u5168\u5C4F\u6A21\u5F0F",
    bossKeyHint: "\u6309 ESC \u952E\u5F00\u542F\u8001\u677F\u952E\u6A21\u5F0F",
    returnToGame: "\u6309 ESC \u952E\u8FD4\u56DE\u6E38\u620F..."
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script>  ", "  ", '  <script type="application/ld+json">', "<\/script> ", " "])), unescapeHTML(JSON.stringify(schema)), renderComponent($$result2, "WidgetWrapper", $$WidgetWrapper, { "id": "game-player", "containerClass": "max-w-7xl mx-auto py-6", "bg": "<div class='absolute inset-0 bg-blue-50 dark:bg-transparent'></div>" }, { "default": ($$result3) => renderTemplate`  ${maybeRenderHead()}<nav class="flex mb-4" aria-label="Breadcrumb"> <ol class="inline-flex items-center space-x-1 md:space-x-3"> <li class="inline-flex items-center"> <a href="/zh/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white"> <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"> <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"></path> </svg> ${t("nav.home")} </a> </li> <li> <div class="flex items-center"> <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path> </svg> <a${addAttribute(`/zh/category/${game.category.toLowerCase().replace(/\s+/g, "-")}`, "href")} class="ml-1 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white md:ml-2">${translatedCategory}</a> </div> </li> <li aria-current="page"> <div class="flex items-center"> <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path> </svg> <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">${game.title}</span> </div> </li> </ol> </nav> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Main Game Area (2/3 width) --> <div class="lg:col-span-2"> ${renderComponent($$result3, "GamePlayer", $$GamePlayer, { "game": game, "labels": playerLabels })} <!-- Game Controls / Info Bar --> <div class="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm mb-6 mt-4"> <div> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">${game.title}</h1> <div class="text-sm text-gray-500"> <span class="mr-3">${t("game.plays")}: ${game.plays?.toLocaleString()}</span> <span>${t("game.rating")}: ${game.rating}/5</span> </div> </div> <div class="flex gap-2"> <button id="favoriteBtn"${addAttribute(game.slug, "data-slug")}${addAttribute(t("game.favorite"), "data-text-favorite")} data-text-favorited="已收藏" class="btn-secondary px-3 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">🤍 ${t("game.favorite")}</button> <button id="shareBtn" class="btn-secondary px-3 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">🔗 ${t("game.share")}</button> </div> </div> <!-- Game Description --> <div class="prose dark:prose-invert max-w-none bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm"> <h3>${t("game.about")} ${game.title}</h3> <p>${game.description}</p> <p>${t("game.description", [game.title, translatedCategory])}</p> <h3>${t("game.howToPlay")}</h3> <p>${howToPlayZh}</p> <h3>游戏技巧</h3> <ul class="list-disc pl-6 space-y-1"> ${tipsZh.map((tip) => renderTemplate`<li>${tip}</li>`)} </ul> <h3>游戏详情</h3> <table class="w-full text-sm border-collapse"> <tbody> ${detailsZh.map((row) => renderTemplate`<tr class="border-b border-gray-200 dark:border-gray-700"> <th class="text-left py-2 pr-4 font-semibold align-top">${row.label}</th> <td class="py-2 align-top">${row.value}</td> </tr>`)} </tbody> </table> <h3>更多类似游戏</h3> <p>
喜欢 ${game.title}？查看我们的${" "} <a${addAttribute(`/zh/category/${categorySlug}`, "href")} class="text-primary hover:underline">${translatedCategory} 游戏</a>${" "}
合集，发现更多免费即玩的精选游戏。
</p> </div> <!-- FAQ（P1 SEO：FAQPage JSON-LD + 点击展开） --> ${renderComponent($$result3, "FaqSection", $$FaqSection, { "items": faqZh, "heading": "\u5E38\u89C1\u95EE\u9898" })} </div> <!-- Sidebar (1/3 width) --> <div class="lg:col-span-1"> <div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm sticky top-24"> <h3 class="font-bold text-lg mb-4 border-b pb-2">${t("game.similar")}</h3> <div class="flex flex-col gap-4"> ${relatedGames.slice(0, 6).map((related) => renderTemplate`<a${addAttribute(`/zh/game/${related.id}-${related.slug}`, "href")} class="flex gap-3 group"> <img${addAttribute(related.thumbnail, "src")}${addAttribute(related.title, "alt")} class="w-20 h-14 object-cover rounded bg-gray-200"> <div> <div class="font-bold text-sm group-hover:text-primary transition">${related.title}</div> <div class="text-xs text-gray-500"> ${getTranslatedCategory(related.category)} • ⭐ ${related.rating} </div> </div> </a>`)} </div> </div> </div> </div> ` }), renderComponent($$result2, "GameGrid", $$GameGrid, { "title": t("game.youMightLike"), "games": relatedGames, "classes": { container: "py-8 lg:py-12" } }), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    genre: [game.category],
    url: Astro2.url.href,
    image: game.thumbnail,
    playMode: "SinglePlayer",
    applicationCategory: "Browser Game",
    operatingSystem: "Any",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: game.rating,
      ratingCount: 100,
      bestRating: "5",
      worstRating: "1"
    },
    inLanguage: "zh"
  })), renderScript($$result2, "E:/website/minigameshub.org/src/pages/zh/game/[id]-[slug].astro?astro&type=script&index=0&lang.ts")) })}`;
}, "E:/website/minigameshub.org/src/pages/zh/game/[id]-[slug].astro", void 0);

const $$file = "E:/website/minigameshub.org/src/pages/zh/game/[id]-[slug].astro";
const $$url = "/zh/game/[id]-[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$idslug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
