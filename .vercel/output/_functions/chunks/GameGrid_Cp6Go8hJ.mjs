import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, u as unescapeHTML, e as renderSlot } from './astro/server_BWaOESUl.mjs';
import 'piccolore';
import { $ as $$WidgetWrapper } from './WidgetWrapper_RmwjD2e6.mjs';
import { $ as $$GameCard } from './GameCard_OWLKRJ5t.mjs';
import { a as $$Button } from './PageLayout_BsFBc9qS.mjs';

const $$Astro = createAstro("https://minigameshub.org");
const $$GameGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GameGrid;
  const {
    title = "",
    subtitle = "",
    tagline = "",
    games = [],
    link,
    linkText = "View All Games",
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-7xl mx-auto ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col mb-8"> ${(title || subtitle || tagline) && renderTemplate`<div class="md:max-w-4xl mb-2"> ${tagline && renderTemplate`<p class="text-base text-secondary dark:text-blue-200 font-bold tracking-wide uppercase">${unescapeHTML(tagline)}</p>`} ${title && renderTemplate`<h2 class="text-3xl md:text-4xl font-bold leading-tighter tracking-tighter font-heading">${unescapeHTML(title)}</h2>`} ${subtitle && renderTemplate`<p class="mt-2 text-muted dark:text-slate-400 text-xl">${unescapeHTML(subtitle)}</p>`} </div>`} ${renderSlot($$result2, $$slots["content"])} </div>  <div class="grid gap-6 md:gap-8 row-gap-5 md:grid-cols-3 lg:grid-cols-6 -mb-6"> ${games.map((game) => renderTemplate`${renderComponent($$result2, "GameCard", $$GameCard, { "game": game })}`)} </div> ${link && renderTemplate`<div class="mt-8 text-center"> ${renderComponent($$result2, "Button", $$Button, { "variant": "secondary", "href": link }, { "default": async ($$result3) => renderTemplate`${linkText}<span class="ml-2">→</span> ` })} </div>`}` })}`;
}, "E:/website/minigameshub.org/src/components/widgets/GameGrid.astro", void 0);

export { $$GameGrid as $ };
