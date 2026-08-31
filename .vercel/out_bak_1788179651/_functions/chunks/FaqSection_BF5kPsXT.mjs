import { d as createAstro, c as createComponent, m as maybeRenderHead, a as renderTemplate, u as unescapeHTML } from './astro/server_BWaOESUl.mjs';
import 'piccolore';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://minigameshub.org");
const $$FaqSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FaqSection;
  const { items, heading = "Frequently Asked Questions", jsonLd = true } = Astro2.props;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a
      }
    }))
  };
  return renderTemplate`${maybeRenderHead()}<section class="prose dark:prose-invert max-w-none bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm mt-6"> <h2>${heading}</h2> <div class="faq-list space-y-2"> ${items.map((it) => renderTemplate`<details class="faq-item group border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0"> <summary class="font-semibold cursor-pointer list-none flex items-center justify-between py-2 marker:hidden"> <span>${it.q}</span> <span class="text-primary transition-transform group-open:rotate-45 text-xl leading-none">+</span> </summary> <p class="mt-1 mb-2 text-muted">${it.a}</p> </details>`)} </div> </section> ${jsonLd && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(faqJsonLd)))}`;
}, "E:/website/minigameshub.org/src/components/common/FaqSection.astro", void 0);

export { $$FaqSection as $ };
