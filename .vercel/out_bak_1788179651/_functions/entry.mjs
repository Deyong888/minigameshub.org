import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DdvUYsOy.mjs';
import { manifest } from './manifest_B69v1ElK.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/games.json.astro.mjs');
const _page4 = () => import('./pages/arcade-games/classic.astro.mjs');
const _page5 = () => import('./pages/arcade-games/modern.astro.mjs');
const _page6 = () => import('./pages/arcade-games/retro.astro.mjs');
const _page7 = () => import('./pages/arcade-games.astro.mjs');
const _page8 = () => import('./pages/bored-games/bored-at-school.astro.mjs');
const _page9 = () => import('./pages/bored-games/bored-at-work.astro.mjs');
const _page10 = () => import('./pages/bored-games/waiting-in-line.astro.mjs');
const _page11 = () => import('./pages/bored-games.astro.mjs');
const _page12 = () => import('./pages/browser-games/flash-alternative.astro.mjs');
const _page13 = () => import('./pages/browser-games/html5.astro.mjs');
const _page14 = () => import('./pages/browser-games/webgl.astro.mjs');
const _page15 = () => import('./pages/browser-games.astro.mjs');
const _page16 = () => import('./pages/category/_slug_.astro.mjs');
const _page17 = () => import('./pages/contact.astro.mjs');
const _page18 = () => import('./pages/editorial-guidelines.astro.mjs');
const _page19 = () => import('./pages/es/about.astro.mjs');
const _page20 = () => import('./pages/es/arcade-games/classic.astro.mjs');
const _page21 = () => import('./pages/es/arcade-games/modern.astro.mjs');
const _page22 = () => import('./pages/es/arcade-games/retro.astro.mjs');
const _page23 = () => import('./pages/es/arcade-games.astro.mjs');
const _page24 = () => import('./pages/es/bored-games/bored-at-school.astro.mjs');
const _page25 = () => import('./pages/es/bored-games/bored-at-work.astro.mjs');
const _page26 = () => import('./pages/es/bored-games/waiting-in-line.astro.mjs');
const _page27 = () => import('./pages/es/bored-games.astro.mjs');
const _page28 = () => import('./pages/es/browser-games/flash-alternative.astro.mjs');
const _page29 = () => import('./pages/es/browser-games/html5.astro.mjs');
const _page30 = () => import('./pages/es/browser-games/webgl.astro.mjs');
const _page31 = () => import('./pages/es/browser-games.astro.mjs');
const _page32 = () => import('./pages/es/category/_slug_.astro.mjs');
const _page33 = () => import('./pages/es/contact.astro.mjs');
const _page34 = () => import('./pages/es/game/_id_-_slug_.astro.mjs');
const _page35 = () => import('./pages/es/html5-games/cross-platform.astro.mjs');
const _page36 = () => import('./pages/es/html5-games/mobile-friendly.astro.mjs');
const _page37 = () => import('./pages/es/html5-games/offline-capable.astro.mjs');
const _page38 = () => import('./pages/es/html5-games.astro.mjs');
const _page39 = () => import('./pages/es/mini-games/action.astro.mjs');
const _page40 = () => import('./pages/es/mini-games/arcade.astro.mjs');
const _page41 = () => import('./pages/es/mini-games/puzzle.astro.mjs');
const _page42 = () => import('./pages/es/mini-games/relax.astro.mjs');
const _page43 = () => import('./pages/es/mini-games.astro.mjs');
const _page44 = () => import('./pages/es/my-games.astro.mjs');
const _page45 = () => import('./pages/es/no-download-games/instant-play.astro.mjs');
const _page46 = () => import('./pages/es/no-download-games/play-now.astro.mjs');
const _page47 = () => import('./pages/es/no-download-games/zero-install.astro.mjs');
const _page48 = () => import('./pages/es/no-download-games.astro.mjs');
const _page49 = () => import('./pages/es/privacy.astro.mjs');
const _page50 = () => import('./pages/es/relax-games/calming.astro.mjs');
const _page51 = () => import('./pages/es/relax-games/casual.astro.mjs');
const _page52 = () => import('./pages/es/relax-games/stress-relief.astro.mjs');
const _page53 = () => import('./pages/es/relax-games.astro.mjs');
const _page54 = () => import('./pages/es/small-games/casual.astro.mjs');
const _page55 = () => import('./pages/es/small-games/quick.astro.mjs');
const _page56 = () => import('./pages/es/small-games/short.astro.mjs');
const _page57 = () => import('./pages/es/small-games.astro.mjs');
const _page58 = () => import('./pages/es/surprise.astro.mjs');
const _page59 = () => import('./pages/es/terms.astro.mjs');
const _page60 = () => import('./pages/es.astro.mjs');
const _page61 = () => import('./pages/game/_id_-_slug_.astro.mjs');
const _page62 = () => import('./pages/glossary.astro.mjs');
const _page63 = () => import('./pages/hi/mini-games.astro.mjs');
const _page64 = () => import('./pages/hi.astro.mjs');
const _page65 = () => import('./pages/html5-games/cross-platform.astro.mjs');
const _page66 = () => import('./pages/html5-games/mobile-friendly.astro.mjs');
const _page67 = () => import('./pages/html5-games/offline-capable.astro.mjs');
const _page68 = () => import('./pages/html5-games.astro.mjs');
const _page69 = () => import('./pages/mini-games/action.astro.mjs');
const _page70 = () => import('./pages/mini-games/arcade.astro.mjs');
const _page71 = () => import('./pages/mini-games/puzzle.astro.mjs');
const _page72 = () => import('./pages/mini-games/relax.astro.mjs');
const _page73 = () => import('./pages/mini-games.astro.mjs');
const _page74 = () => import('./pages/my-games.astro.mjs');
const _page75 = () => import('./pages/new-games.astro.mjs');
const _page76 = () => import('./pages/no-download-games/instant-play.astro.mjs');
const _page77 = () => import('./pages/no-download-games/play-now.astro.mjs');
const _page78 = () => import('./pages/no-download-games/zero-install.astro.mjs');
const _page79 = () => import('./pages/no-download-games.astro.mjs');
const _page80 = () => import('./pages/pricing.astro.mjs');
const _page81 = () => import('./pages/privacy.astro.mjs');
const _page82 = () => import('./pages/relax-games/calming.astro.mjs');
const _page83 = () => import('./pages/relax-games/casual.astro.mjs');
const _page84 = () => import('./pages/relax-games/stress-relief.astro.mjs');
const _page85 = () => import('./pages/relax-games.astro.mjs');
const _page86 = () => import('./pages/rss.xml.astro.mjs');
const _page87 = () => import('./pages/services.astro.mjs');
const _page88 = () => import('./pages/small-games/casual.astro.mjs');
const _page89 = () => import('./pages/small-games/quick.astro.mjs');
const _page90 = () => import('./pages/small-games/short.astro.mjs');
const _page91 = () => import('./pages/small-games.astro.mjs');
const _page92 = () => import('./pages/surprise.astro.mjs');
const _page93 = () => import('./pages/terms.astro.mjs');
const _page94 = () => import('./pages/zh/about.astro.mjs');
const _page95 = () => import('./pages/zh/arcade-games/classic.astro.mjs');
const _page96 = () => import('./pages/zh/arcade-games/modern.astro.mjs');
const _page97 = () => import('./pages/zh/arcade-games/retro.astro.mjs');
const _page98 = () => import('./pages/zh/arcade-games.astro.mjs');
const _page99 = () => import('./pages/zh/bored-games/bored-at-school.astro.mjs');
const _page100 = () => import('./pages/zh/bored-games/bored-at-work.astro.mjs');
const _page101 = () => import('./pages/zh/bored-games/waiting-in-line.astro.mjs');
const _page102 = () => import('./pages/zh/bored-games.astro.mjs');
const _page103 = () => import('./pages/zh/browser-games/flash-alternative.astro.mjs');
const _page104 = () => import('./pages/zh/browser-games/html5.astro.mjs');
const _page105 = () => import('./pages/zh/browser-games/webgl.astro.mjs');
const _page106 = () => import('./pages/zh/browser-games.astro.mjs');
const _page107 = () => import('./pages/zh/category/_slug_.astro.mjs');
const _page108 = () => import('./pages/zh/contact.astro.mjs');
const _page109 = () => import('./pages/zh/game/_id_-_slug_.astro.mjs');
const _page110 = () => import('./pages/zh/html5-games/cross-platform.astro.mjs');
const _page111 = () => import('./pages/zh/html5-games/mobile-friendly.astro.mjs');
const _page112 = () => import('./pages/zh/html5-games/offline-capable.astro.mjs');
const _page113 = () => import('./pages/zh/html5-games.astro.mjs');
const _page114 = () => import('./pages/zh/mini-games/action.astro.mjs');
const _page115 = () => import('./pages/zh/mini-games/arcade.astro.mjs');
const _page116 = () => import('./pages/zh/mini-games/puzzle.astro.mjs');
const _page117 = () => import('./pages/zh/mini-games/relax.astro.mjs');
const _page118 = () => import('./pages/zh/mini-games.astro.mjs');
const _page119 = () => import('./pages/zh/my-games.astro.mjs');
const _page120 = () => import('./pages/zh/no-download-games/instant-play.astro.mjs');
const _page121 = () => import('./pages/zh/no-download-games/play-now.astro.mjs');
const _page122 = () => import('./pages/zh/no-download-games/zero-install.astro.mjs');
const _page123 = () => import('./pages/zh/no-download-games.astro.mjs');
const _page124 = () => import('./pages/zh/privacy.astro.mjs');
const _page125 = () => import('./pages/zh/relax-games/calming.astro.mjs');
const _page126 = () => import('./pages/zh/relax-games/casual.astro.mjs');
const _page127 = () => import('./pages/zh/relax-games/stress-relief.astro.mjs');
const _page128 = () => import('./pages/zh/relax-games.astro.mjs');
const _page129 = () => import('./pages/zh/small-games/casual.astro.mjs');
const _page130 = () => import('./pages/zh/small-games/quick.astro.mjs');
const _page131 = () => import('./pages/zh/small-games/short.astro.mjs');
const _page132 = () => import('./pages/zh/small-games.astro.mjs');
const _page133 = () => import('./pages/zh/surprise.astro.mjs');
const _page134 = () => import('./pages/zh/terms.astro.mjs');
const _page135 = () => import('./pages/zh.astro.mjs');
const _page136 = () => import('./pages/_---blog_/_category_/_---page_.astro.mjs');
const _page137 = () => import('./pages/_---blog_/_tag_/_---page_.astro.mjs');
const _page138 = () => import('./pages/_---blog_/_---page_.astro.mjs');
const _page139 = () => import('./pages/index.astro.mjs');
const _page140 = () => import('./pages/_---blog_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/games.json.ts", _page3],
    ["src/pages/arcade-games/classic.astro", _page4],
    ["src/pages/arcade-games/modern.astro", _page5],
    ["src/pages/arcade-games/retro.astro", _page6],
    ["src/pages/arcade-games/index.astro", _page7],
    ["src/pages/bored-games/bored-at-school.astro", _page8],
    ["src/pages/bored-games/bored-at-work.astro", _page9],
    ["src/pages/bored-games/waiting-in-line.astro", _page10],
    ["src/pages/bored-games/index.astro", _page11],
    ["src/pages/browser-games/flash-alternative/index.astro", _page12],
    ["src/pages/browser-games/html5/index.astro", _page13],
    ["src/pages/browser-games/webgl/index.astro", _page14],
    ["src/pages/browser-games/index.astro", _page15],
    ["src/pages/category/[slug].astro", _page16],
    ["src/pages/contact.astro", _page17],
    ["src/pages/editorial-guidelines.astro", _page18],
    ["src/pages/es/about.astro", _page19],
    ["src/pages/es/arcade-games/classic.astro", _page20],
    ["src/pages/es/arcade-games/modern.astro", _page21],
    ["src/pages/es/arcade-games/retro.astro", _page22],
    ["src/pages/es/arcade-games/index.astro", _page23],
    ["src/pages/es/bored-games/bored-at-school.astro", _page24],
    ["src/pages/es/bored-games/bored-at-work.astro", _page25],
    ["src/pages/es/bored-games/waiting-in-line.astro", _page26],
    ["src/pages/es/bored-games/index.astro", _page27],
    ["src/pages/es/browser-games/flash-alternative/index.astro", _page28],
    ["src/pages/es/browser-games/html5/index.astro", _page29],
    ["src/pages/es/browser-games/webgl/index.astro", _page30],
    ["src/pages/es/browser-games/index.astro", _page31],
    ["src/pages/es/category/[slug].astro", _page32],
    ["src/pages/es/contact.astro", _page33],
    ["src/pages/es/game/[id]-[slug].astro", _page34],
    ["src/pages/es/html5-games/cross-platform/index.astro", _page35],
    ["src/pages/es/html5-games/mobile-friendly/index.astro", _page36],
    ["src/pages/es/html5-games/offline-capable/index.astro", _page37],
    ["src/pages/es/html5-games/index.astro", _page38],
    ["src/pages/es/mini-games/action.astro", _page39],
    ["src/pages/es/mini-games/arcade.astro", _page40],
    ["src/pages/es/mini-games/puzzle.astro", _page41],
    ["src/pages/es/mini-games/relax.astro", _page42],
    ["src/pages/es/mini-games/index.astro", _page43],
    ["src/pages/es/my-games.astro", _page44],
    ["src/pages/es/no-download-games/instant-play/index.astro", _page45],
    ["src/pages/es/no-download-games/play-now/index.astro", _page46],
    ["src/pages/es/no-download-games/zero-install/index.astro", _page47],
    ["src/pages/es/no-download-games/index.astro", _page48],
    ["src/pages/es/privacy.md", _page49],
    ["src/pages/es/relax-games/calming.astro", _page50],
    ["src/pages/es/relax-games/casual.astro", _page51],
    ["src/pages/es/relax-games/stress-relief.astro", _page52],
    ["src/pages/es/relax-games/index.astro", _page53],
    ["src/pages/es/small-games/casual.astro", _page54],
    ["src/pages/es/small-games/quick.astro", _page55],
    ["src/pages/es/small-games/short.astro", _page56],
    ["src/pages/es/small-games/index.astro", _page57],
    ["src/pages/es/surprise.astro", _page58],
    ["src/pages/es/terms.md", _page59],
    ["src/pages/es/index.astro", _page60],
    ["src/pages/game/[id]-[slug].astro", _page61],
    ["src/pages/glossary.astro", _page62],
    ["src/pages/hi/mini-games/index.astro", _page63],
    ["src/pages/hi/index.astro", _page64],
    ["src/pages/html5-games/cross-platform/index.astro", _page65],
    ["src/pages/html5-games/mobile-friendly/index.astro", _page66],
    ["src/pages/html5-games/offline-capable/index.astro", _page67],
    ["src/pages/html5-games/index.astro", _page68],
    ["src/pages/mini-games/action.astro", _page69],
    ["src/pages/mini-games/arcade.astro", _page70],
    ["src/pages/mini-games/puzzle.astro", _page71],
    ["src/pages/mini-games/relax.astro", _page72],
    ["src/pages/mini-games/index.astro", _page73],
    ["src/pages/my-games.astro", _page74],
    ["src/pages/new-games.astro", _page75],
    ["src/pages/no-download-games/instant-play/index.astro", _page76],
    ["src/pages/no-download-games/play-now/index.astro", _page77],
    ["src/pages/no-download-games/zero-install/index.astro", _page78],
    ["src/pages/no-download-games/index.astro", _page79],
    ["src/pages/pricing.astro", _page80],
    ["src/pages/privacy.md", _page81],
    ["src/pages/relax-games/calming.astro", _page82],
    ["src/pages/relax-games/casual.astro", _page83],
    ["src/pages/relax-games/stress-relief.astro", _page84],
    ["src/pages/relax-games/index.astro", _page85],
    ["src/pages/rss.xml.ts", _page86],
    ["src/pages/services.astro", _page87],
    ["src/pages/small-games/casual.astro", _page88],
    ["src/pages/small-games/quick.astro", _page89],
    ["src/pages/small-games/short.astro", _page90],
    ["src/pages/small-games/index.astro", _page91],
    ["src/pages/surprise.astro", _page92],
    ["src/pages/terms.md", _page93],
    ["src/pages/zh/about.astro", _page94],
    ["src/pages/zh/arcade-games/classic.astro", _page95],
    ["src/pages/zh/arcade-games/modern.astro", _page96],
    ["src/pages/zh/arcade-games/retro.astro", _page97],
    ["src/pages/zh/arcade-games/index.astro", _page98],
    ["src/pages/zh/bored-games/bored-at-school.astro", _page99],
    ["src/pages/zh/bored-games/bored-at-work.astro", _page100],
    ["src/pages/zh/bored-games/waiting-in-line.astro", _page101],
    ["src/pages/zh/bored-games/index.astro", _page102],
    ["src/pages/zh/browser-games/flash-alternative/index.astro", _page103],
    ["src/pages/zh/browser-games/html5/index.astro", _page104],
    ["src/pages/zh/browser-games/webgl/index.astro", _page105],
    ["src/pages/zh/browser-games/index.astro", _page106],
    ["src/pages/zh/category/[slug].astro", _page107],
    ["src/pages/zh/contact.astro", _page108],
    ["src/pages/zh/game/[id]-[slug].astro", _page109],
    ["src/pages/zh/html5-games/cross-platform/index.astro", _page110],
    ["src/pages/zh/html5-games/mobile-friendly/index.astro", _page111],
    ["src/pages/zh/html5-games/offline-capable/index.astro", _page112],
    ["src/pages/zh/html5-games/index.astro", _page113],
    ["src/pages/zh/mini-games/action.astro", _page114],
    ["src/pages/zh/mini-games/arcade.astro", _page115],
    ["src/pages/zh/mini-games/puzzle.astro", _page116],
    ["src/pages/zh/mini-games/relax.astro", _page117],
    ["src/pages/zh/mini-games/index.astro", _page118],
    ["src/pages/zh/my-games.astro", _page119],
    ["src/pages/zh/no-download-games/instant-play/index.astro", _page120],
    ["src/pages/zh/no-download-games/play-now/index.astro", _page121],
    ["src/pages/zh/no-download-games/zero-install/index.astro", _page122],
    ["src/pages/zh/no-download-games/index.astro", _page123],
    ["src/pages/zh/privacy.md", _page124],
    ["src/pages/zh/relax-games/calming.astro", _page125],
    ["src/pages/zh/relax-games/casual.astro", _page126],
    ["src/pages/zh/relax-games/stress-relief.astro", _page127],
    ["src/pages/zh/relax-games/index.astro", _page128],
    ["src/pages/zh/small-games/casual.astro", _page129],
    ["src/pages/zh/small-games/quick.astro", _page130],
    ["src/pages/zh/small-games/short.astro", _page131],
    ["src/pages/zh/small-games/index.astro", _page132],
    ["src/pages/zh/surprise.astro", _page133],
    ["src/pages/zh/terms.md", _page134],
    ["src/pages/zh/index.astro", _page135],
    ["src/pages/[...blog]/[category]/[...page].astro", _page136],
    ["src/pages/[...blog]/[tag]/[...page].astro", _page137],
    ["src/pages/[...blog]/[...page].astro", _page138],
    ["src/pages/index.astro", _page139],
    ["src/pages/[...blog]/index.astro", _page140]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "13e7bd79-81e2-4333-bbd7-a247ee3fd4fb",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
