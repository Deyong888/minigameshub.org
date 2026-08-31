import { d as createAstro, c as createComponent, r as renderComponent, x as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './astro/server_BWaOESUl.mjs';
import 'piccolore';
import { $ as $$WidgetWrapper } from './WidgetWrapper_RmwjD2e6.mjs';
import { C as featuredGames } from './games_064DNuRh.mjs';
import { r as resolveLang, u as useTranslations } from './Layout_DSlasLbG.mjs';

const $$Astro = createAstro("https://minigameshub.org");
const $$GameHero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GameHero;
  const lang = resolveLang(Astro2.currentLocale);
  const t = useTranslations(lang);
  const {
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg"),
    initialGame = featuredGames[0]
    // Default to first featured game
  } = Astro2.props;
  const games = featuredGames.slice(0, 8);
  const gameLinkPrefix = lang === "es" ? "/es/game/" : "/game/";
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-7xl mx-auto ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl"> <!-- Mystery Box Trigger --> <div class="absolute top-4 right-4 z-20"> <a${addAttribute(lang === "es" ? "/es/surprise" : "/surprise", "href")} class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition transform hover:scale-105 animate-bounce flex items-center gap-2 no-underline"> <span>🎁</span> <span class="hidden sm:inline">${t("hero.surprise")}</span> </a> </div> <!-- Game Container --> <div class="w-full h-full flex flex-col relative" id="heroGameContainer"${addAttribute(gameLinkPrefix, "data-game-link-prefix")}${addAttribute(t("hero.nowPlaying"), "data-now-playing-text")}${addAttribute(initialGame?.slug, "data-initial-slug")}${addAttribute(initialGame?.id, "data-initial-id")}> <iframe id="heroFrame"${addAttribute(initialGame?.url || "https://play.gamepix.com/moto-x3m-spooky-land/embed?sid=GM8A7", "src")}${addAttribute(initialGame?.title || "Game", "title")} class="w-full flex-grow border-none" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe> <!-- Controls Bar --> <div class="bg-gray-800 p-3 flex justify-between items-center text-white z-20 relative"> <span id="currentGameTitle" class="font-bold ml-2 truncate max-w-[50%]">${t("hero.nowPlaying")} ${initialGame?.title || "Loading..."}</span> <div class="flex gap-2 shrink-0"> <button id="heroFavoriteBtn" class="px-3 py-1 bg-pink-600 rounded hover:bg-pink-700 text-sm" title="Add to Favorites">❤️</button> <a id="gameDetailsLink"${addAttribute(`${gameLinkPrefix}${initialGame ? `${initialGame.id}-${initialGame.slug}` : "#"}`, "href")} class="px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-sm hidden sm:inline-block no-underline text-white" title="Game Details">ℹ️ ${t("hero.details")}</a> <button id="bossKey" class="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm" title="Boss Key (ESC)">🚨 ${t("hero.bossKey")} (ESC)</button> <button id="fullscreenBtn" class="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm" title="Fullscreen">⛶ ${t("hero.fullscreen")}</button> </div> </div> </div> </div>  <div class="mt-4 overflow-x-auto p-4 bg-gray-900 rounded-lg scrollbar-hide"> <h3 class="text-white text-sm mb-2 font-bold">${t("hero.trending")}</h3> <div class="flex gap-2 pb-2 justify-between"> ${games.map((game) => renderTemplate`<div class="flex-1 h-20 bg-gray-700 rounded cursor-pointer hover:opacity-80 transition relative overflow-hidden group game-thumb"${addAttribute(game.url, "data-url")}${addAttribute(game.title, "data-title")}${addAttribute(game.slug, "data-slug")}${addAttribute(game.id, "data-id")}> <img${addAttribute(game.thumbnail, "src")}${addAttribute(game.title, "alt")} class="w-full h-full object-cover" loading="lazy"> <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center"> <span class="text-white opacity-0 group-hover:opacity-100 font-bold text-xs px-1 text-center shadow-black drop-shadow-md"> ${game.title} </span> </div> </div>`)} </div> </div> ` })} ${renderScript($$result, "E:/website/minigameshub.org/src/components/widgets/GameHero.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/website/minigameshub.org/src/components/widgets/GameHero.astro", void 0);

export { $$GameHero as $ };
