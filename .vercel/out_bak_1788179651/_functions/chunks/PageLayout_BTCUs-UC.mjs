import { c as createComponent, m as maybeRenderHead, a as renderTemplate, d as createAstro, b as addAttribute, r as renderComponent, e as renderSlot, s as spreadAttributes, F as Fragment, u as unescapeHTML } from './astro/server_BWaOESUl.mjs';
import 'piccolore';
import { a as $$Icon, l as languages, u as useTranslations, r as resolveLang, $ as $$Layout } from './Layout_DSlasLbG.mjs';
import 'clsx';
import { U as UI, t as trimSlash, g as getHomePermalink, e as getAsset, a as getPermalink } from './permalinks_DdAc5Pgt.mjs';
import { twMerge } from 'tailwind-merge';

const $$Logo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<img src="/navicon.png" alt="MiniGamesHub" class="self-center ml-2 rtl:ml-0 rtl:mr-2 h-8 md:h-6 w-auto">`;
}, "E:/website/minigameshub.org/src/components/Logo.astro", void 0);

const $$Astro$6 = createAstro("https://minigameshub.org");
const $$ToggleTheme = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ToggleTheme;
  const {
    label = "Toggle between Dark and Light mode",
    class: className = "text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center",
    iconClass = "w-6 h-6",
    iconName = "tabler:sun"
  } = Astro2.props;
  return renderTemplate`${!(UI.theme.endsWith(":only")) && renderTemplate`${maybeRenderHead()}<button type="button"${addAttribute(className, "class")}${addAttribute(label, "aria-label")} data-aw-toggle-color-scheme>${renderComponent($$result, "Icon", $$Icon, { "name": iconName, "class": iconClass })}</button>`}`;
}, "E:/website/minigameshub.org/src/components/common/ToggleTheme.astro", void 0);

const $$Astro$5 = createAstro("https://minigameshub.org");
const $$ToggleMenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ToggleMenu;
  const {
    label = "Toggle Menu",
    class: className = "flex flex-col h-12 w-12 rounded justify-center items-center cursor-pointer group"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button type="button"${addAttribute(className, "class")}${addAttribute(label, "aria-label")} data-aw-toggle-menu> <span class="sr-only">${label}</span> ${renderSlot($$result, $$slots["default"], renderTemplate` <span aria-hidden="true" class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:rotate-45 group-[.expanded]:translate-y-2.5"></span> <span aria-hidden="true" class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:opacity-0"></span> <span aria-hidden="true" class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:-rotate-45 group-[.expanded]:-translate-y-2.5"></span> `)} </button>`;
}, "E:/website/minigameshub.org/src/components/common/ToggleMenu.astro", void 0);

const $$Astro$4 = createAstro("https://minigameshub.org");
const $$LanguagePicker = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$LanguagePicker;
  const currentLang = Astro2.currentLocale || "en";
  const { class: className } = Astro2.props;
  const getPathForLang = (lang) => {
    const currentPath = Astro2.url.pathname;
    const parts = currentPath.split("/").filter(Boolean);
    const firstPart = parts[0];
    if (firstPart && Object.keys(languages).includes(firstPart)) {
      parts.shift();
    }
    if (lang === "en") {
      return "/" + parts.join("/");
    }
    const suffix = parts.length > 0 ? "/" + parts.join("/") : "";
    return "/" + lang + suffix;
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["relative inline-block text-left group", className], "class:list")}> <button type="button" class="text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center" id="language-menu-button" aria-label="Change language" aria-expanded="true" aria-haspopup="true"> ${renderComponent($$result, "Icon", $$Icon, { "name": "tabler:language", "class": "w-6 h-6 md:w-5 md:h-5" })} </button> <div class="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="language-menu-button" tabindex="-1"> <div class="py-1" role="none"> ${Object.entries(languages).map(([lang, label]) => renderTemplate`<a${addAttribute(getPathForLang(lang), "href")}${addAttribute([
    "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800",
    { "bg-gray-100 dark:bg-slate-800 font-bold": currentLang === lang }
  ], "class:list")} role="menuitem" tabindex="-1"> ${label} </a>`)} </div> </div> </div>`;
}, "E:/website/minigameshub.org/src/components/common/LanguagePicker.astro", void 0);

const $$Astro$3 = createAstro("https://minigameshub.org");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    variant = "secondary",
    target,
    text = Astro2.slots.render("default"),
    icon = "",
    class: className = "",
    type,
    ...rest
  } = Astro2.props;
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    tertiary: "btn btn-tertiary",
    link: "cursor-pointer hover:text-primary"
  };
  return renderTemplate`${type === "button" || type === "submit" || type === "reset" ? renderTemplate`${maybeRenderHead()}<button${addAttribute(type, "type")}${addAttribute(twMerge(variants[variant] || "", className), "class")}${spreadAttributes(rest)}>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })}${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-5 h-5 ml-1 -mr-1.5 rtl:mr-1 rtl:-ml-1.5 inline-block" })}`}</button>` : renderTemplate`<a${addAttribute(twMerge(variants[variant] || "", className), "class")}${spreadAttributes(target ? { target, rel: "noopener noreferrer" } : {})}${spreadAttributes(rest)}>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })}${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-5 h-5 ml-1 -mr-1.5 rtl:mr-1 rtl:-ml-1.5 inline-block" })}`}</a>`}`;
}, "E:/website/minigameshub.org/src/components/ui/Button.astro", void 0);

const $$Astro$2 = createAstro("https://minigameshub.org");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const {
    id = "header",
    links = [],
    actions = [],
    isSticky = false,
    isDark = false,
    isFullWidth = false,
    showToggleTheme = false,
    showRssFeed = false,
    position = "center"
  } = Astro2.props;
  const currentPath = `/${trimSlash(new URL(Astro2.url).pathname)}`;
  return renderTemplate`${maybeRenderHead()}<header${addAttribute([
    { sticky: isSticky, relative: !isSticky, dark: isDark },
    "top-0 z-50 flex-none mx-auto w-full border-b border-gray-50/0 transition-[opacity] ease-in-out"
  ], "class:list")}${spreadAttributes(isSticky ? { "data-aw-sticky-header": true } : {})}${spreadAttributes(id ? { id } : {})}> <div class="absolute inset-0"></div> <div${addAttribute([
    "relative text-default py-3 px-3 md:px-6 mx-auto w-full",
    {
      "md:flex md:justify-between": position !== "center"
    },
    {
      "md:grid md:grid-cols-3 md:items-center": position === "center"
    },
    {
      "max-w-7xl": !isFullWidth
    }
  ], "class:list")}> <div${addAttribute([{ "mr-auto rtl:mr-0 rtl:ml-auto": position === "right" }, "flex justify-between"], "class:list")}> <a class="flex items-center"${addAttribute(getHomePermalink(), "href")}> ${renderComponent($$result, "Logo", $$Logo, {})} </a> <div class="flex items-center md:hidden"> ${showToggleTheme && renderTemplate`${renderComponent($$result, "ToggleTheme", $$ToggleTheme, { "iconClass": "w-6 h-6 md:w-5 md:h-5 md:inline-block" })}`} ${renderComponent($$result, "LanguagePicker", $$LanguagePicker, {})} ${renderComponent($$result, "ToggleMenu", $$ToggleMenu, {})} </div> </div> <nav class="items-center w-full md:w-auto hidden md:flex md:mx-5 text-default overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:justify-self-center" aria-label="Main navigation"> <ul class="flex flex-col md:flex-row md:self-center w-full md:w-auto text-xl md:text-[0.9375rem] tracking-[0.01rem] font-medium md:justify-center"> ${links.map(({ text, href, links: links2 }) => renderTemplate`<li${addAttribute(links2?.length ? "dropdown" : "", "class")}> ${links2?.length ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <button type="button" class="hover:text-link dark:hover:text-white px-2 py-2 flex items-center whitespace-nowrap"> ${text}${" "} ${renderComponent($$result2, "Icon", $$Icon, { "name": "tabler:chevron-down", "class": "w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden md:inline" })} </button> <ul class="dropdown-menu md:backdrop-blur-md dark:md:bg-dark rounded md:absolute pl-4 md:pl-0 md:hidden font-medium md:bg-white/90 md:min-w-[200px] drop-shadow-xl"> ${links2.map(({ text: text2, href: href2 }) => renderTemplate`<li> <a${addAttribute([
    "first:rounded-t last:rounded-b md:hover:bg-gray-100 hover:text-link dark:hover:text-white dark:hover:bg-gray-700 py-2 px-5 block whitespace-no-wrap",
    { "aw-link-active": href2 === currentPath }
  ], "class:list")}${addAttribute(href2, "href")}> ${text2} </a> </li>`)} </ul> ` })}` : renderTemplate`<a${addAttribute([
    "hover:text-link dark:hover:text-white px-2 py-2 flex items-center whitespace-nowrap",
    { "aw-link-active": href === currentPath }
  ], "class:list")}${addAttribute(href, "href")}> ${text} </a>`} </li>`)} </ul> </nav> <div${addAttribute([
    { "ml-auto rtl:ml-0 rtl:mr-auto": position === "left" },
    "hidden md:self-center md:flex items-center md:mb-0 fixed w-full md:w-auto md:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 md:p-0 md:justify-self-end"
  ], "class:list")}> <div class="items-center flex justify-between w-full md:w-auto"> <div class="flex items-center"> ${showToggleTheme && renderTemplate`${renderComponent($$result, "ToggleTheme", $$ToggleTheme, { "iconClass": "w-6 h-6 md:w-5 md:h-5 md:inline-block" })}`} ${renderComponent($$result, "LanguagePicker", $$LanguagePicker, { "class": "hidden md:inline-block ml-2" })} ${showRssFeed && renderTemplate`<a class="text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center" aria-label="RSS Feed"${addAttribute(getAsset("/rss.xml"), "href")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "tabler:rss", "class": "w-5 h-5" })} </a>`} </div> ${actions?.length ? renderTemplate`<span class="ml-4 rtl:ml-0 rtl:mr-4"> ${actions.map((btnProps) => renderTemplate`${renderComponent($$result, "Button", $$Button, { ...btnProps, "class": "ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto" })}`)} </span>` : ""} </div> </div> </div> </header>`;
}, "E:/website/minigameshub.org/src/components/widgets/Header.astro", void 0);

const $$Astro$1 = createAstro("https://minigameshub.org");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const { socialLinks = [], secondaryLinks = [], links = [], footNote = "", theme = "light" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer${addAttribute([{ dark: theme === "dark" }, "relative border-t border-gray-200 dark:border-slate-800 not-prose"], "class:list")}> <div class="dark:bg-dark absolute inset-0 pointer-events-none" aria-hidden="true"></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6 dark:text-slate-300 intersect-once intersect-quarter intersect-no-queue motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade"> <div class="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12"> <div class="col-span-12 lg:col-span-4"> <div class="mb-2"> <a class="inline-block"${addAttribute(getHomePermalink(), "href")}> <img src="/navicon.png" alt="MiniGamesHub" class="h-7 w-auto"> </a> </div> <div class="text-sm text-muted flex gap-1"> ${secondaryLinks.map(({ text, href }, index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${index !== 0 ? " \xB7 " : ""}<a class="text-muted hover:text-gray-700 dark:text-gray-400 hover:underline transition duration-150 ease-in-out"${addAttribute(href, "href")}>${unescapeHTML(text)}</a> ` })}`)} </div> </div> ${links.map(({ title, links: links2 }) => renderTemplate`<div class="col-span-6 md:col-span-3 lg:col-span-2"> <div class="dark:text-gray-300 font-medium mb-2">${title}</div> ${links2 && Array.isArray(links2) && links2.length > 0 && renderTemplate`<ul class="text-sm"> ${links2.map(({ text, href, ariaLabel }) => renderTemplate`<li class="mb-2"> <a class="text-muted hover:text-gray-700 hover:underline dark:text-gray-400 transition duration-150 ease-in-out"${addAttribute(href, "href")}${addAttribute(ariaLabel, "aria-label")}> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })} </a> </li>`)} </ul>`} </div>`)} </div> <div class="md:flex md:items-center md:justify-between py-6 md:py-8"> ${socialLinks?.length ? renderTemplate`<ul class="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0 rtl:ml-0 rtl:-mr-2 rtl:md:ml-0 rtl:md:mr-4"> ${socialLinks.map(({ ariaLabel, href, text, icon }) => renderTemplate`<li> <a class="text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"${addAttribute(ariaLabel, "aria-label")}${addAttribute(href, "href")}> ${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-5 h-5" })}`} ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })} </a> </li>`)} </ul>` : ""} <div class="text-sm mr-4 dark:text-muted"> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(footNote)}` })} </div> </div> </div> </footer>`;
}, "E:/website/minigameshub.org/src/components/widgets/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Announcement = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<div class="hidden md:flex w-full items-center justify-between bg-black px-4 py-2 text-sm text-muted dark:bg-transparent dark:border-b dark:border-slate-800 dark:text-slate-400"> <div class="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis"> <span class="inline-block bg-white/40 px-1 py-0.5 text-xs font-semibold text-black dark:bg-slate-700 dark:text-slate-300 rtl:mr-0 rtl:ml-0.5">NEW</span> <a href="/" class="max-w-full truncate font-medium text-muted hover:underline dark:text-slate-300">Play 5000+ Free Games on MiniGamesHub! \xBB</a> </div> <div class="ml-4 flex items-center gap-2 shrink-0"> <!-- AddToAny BEGIN --> <div class="a2a_kit a2a_kit_size_32 a2a_default_style"> <a class="a2a_dd" href="https://www.addtoany.com/share"></a> <a class="a2a_button_x"></a> <a class="a2a_button_facebook"></a> <a class="a2a_button_mastodon"></a> <a class="a2a_button_bluesky"></a> <a class="a2a_button_threads"></a> <a class="a2a_button_wechat"></a> <a class="a2a_button_reddit"></a> <a class="a2a_button_pinterest"></a> <a class="a2a_button_copy_link"></a> </div> <script defer src="https://static.addtoany.com/menu/page.js"><\/script> <!-- AddToAny END --> </div> </div>'])), maybeRenderHead());
}, "E:/website/minigameshub.org/src/components/widgets/Announcement.astro", void 0);

const getLink = (path, lang) => {
  if (path.startsWith("/blog")) {
    return getPermalink(path);
  }
  const prefix = lang === "en" ? "" : `/${lang}`;
  return getPermalink(`${prefix}${path}`);
};
const getHeaderData = (lang = "en") => {
  const t = useTranslations(resolveLang(lang));
  return {
    links: [
      {
        text: t("nav.games"),
        href: getLink("/mini-games", lang),
        links: [
          { text: t("nav.miniGames"), href: getLink("/mini-games", lang) },
          { text: t("nav.smallGames"), href: getLink("/small-games", lang) },
          { text: t("nav.arcadeGames"), href: getLink("/arcade-games", lang) },
          { text: t("nav.browserGames"), href: getLink("/browser-games", lang) },
          { text: t("nav.html5Games"), href: getLink("/html5-games", lang) },
          { text: t("nav.noDownloadGames"), href: getLink("/no-download-games", lang) },
          { text: t("nav.newGames"), href: getLink("/new-games", lang) }
        ]
      },
      {
        text: t("nav.lifestyle"),
        href: getLink("/relax-games", lang),
        links: [
          { text: t("nav.relaxGames"), href: getLink("/relax-games", lang) },
          { text: t("nav.boredGames"), href: getLink("/bored-games", lang) }
        ]
      },
      {
        text: t("nav.blog"),
        href: getLink("/blog", lang)
      }
    ],
    actions: [{ text: t("hero.surprise"), href: getLink("/surprise", lang), icon: "tabler:gift" }]
  };
};
const getFooterData = (lang = "en") => {
  const t = useTranslations(resolveLang(lang));
  return {
    links: [
      {
        title: t("nav.games"),
        links: [
          { text: t("nav.miniGames"), href: getLink("/mini-games", lang) },
          { text: t("nav.smallGames"), href: getLink("/small-games", lang) },
          { text: t("nav.arcadeGames"), href: getLink("/arcade-games", lang) },
          { text: t("nav.browserGames"), href: getLink("/browser-games", lang) },
          { text: t("nav.html5Games"), href: getLink("/html5-games", lang) },
          { text: t("nav.noDownloadGames"), href: getLink("/no-download-games", lang) },
          { text: t("nav.newGames"), href: getLink("/new-games", lang) }
        ]
      },
      {
        title: t("nav.lifestyle"),
        links: [
          { text: t("nav.relaxGames"), href: getLink("/relax-games", lang) },
          { text: t("nav.boredGames"), href: getLink("/bored-games", lang) },
          { text: t("nav.boredAtWork"), href: getLink("/bored-games/bored-at-work", lang) },
          { text: t("nav.boredAtSchool"), href: getLink("/bored-games/bored-at-school", lang) }
        ]
      },
      {
        title: t("footer.about"),
        links: [
          { text: t("footer.about"), href: getLink("/about", lang) },
          { text: t("nav.blog"), href: getLink("/blog", lang) },
          { text: "Editorial Guidelines", href: "/editorial-guidelines" },
          { text: t("nav.contact"), href: getLink("/contact", lang) }
        ]
      }
    ],
    secondaryLinks: [
      { text: t("footer.terms"), href: getLink("/terms", lang) },
      { text: t("footer.privacy"), href: getLink("/privacy", lang) }
    ],
    socialLinks: [
      { ariaLabel: "X", icon: "tabler:brand-x", href: "https://x.com/MiniGamesHub" },
      { ariaLabel: "Instagram", icon: "tabler:brand-instagram", href: "https://instagram.com/minigameshub" },
      { ariaLabel: "Facebook", icon: "tabler:brand-facebook", href: "https://facebook.com/MiniGamesHub" },
      { ariaLabel: "RSS", icon: "tabler:rss", href: getAsset("/rss.xml") }
    ],
    footNote: `
      © 2026 MiniGamesHub · A property of Synthflow Digital LTD · All rights reserved.
    `
  };
};
getHeaderData("en");
getFooterData("en");

const $$Astro = createAstro("https://minigameshub.org");
const $$PageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { metadata } = Astro2.props;
  const lang = Astro2.currentLocale || "en";
  const headerData = getHeaderData(lang);
  const footerData = getFooterData(lang);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["announcement"], renderTemplate` ${renderComponent($$result2, "Announcement", $$Announcement, {})} `)} ${renderSlot($$result2, $$slots["header"], renderTemplate` ${renderComponent($$result2, "Header", $$Header, { ...headerData, "isSticky": true, "showRssFeed": true, "showToggleTheme": true })} `)} ${maybeRenderHead()}<main> ${renderSlot($$result2, $$slots["default"])} </main> ${renderSlot($$result2, $$slots["footer"], renderTemplate` ${renderComponent($$result2, "Footer", $$Footer, { ...footerData })} `)} ` })}`;
}, "E:/website/minigameshub.org/src/layouts/PageLayout.astro", void 0);

export { $$PageLayout as $, $$Button as a };
