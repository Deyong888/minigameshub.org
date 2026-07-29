import { getPermalink, getAsset } from './utils/permalinks';
import { useTranslations, resolveLang } from './utils/i18n';

const getLink = (path: string, lang: string) => {
  if (path.startsWith('/blog')) {
    return getPermalink(path);
  }

  const prefix = lang === 'en' ? '' : `/${lang}`;
  return getPermalink(`${prefix}${path}`);
};

export const getHeaderData = (lang = 'en') => {
  const t = useTranslations(resolveLang(lang));

  return {
    links: [
      {
        text: t('nav.games'),
        href: getLink('/mini-games', lang),
        links: [
          { text: t('nav.miniGames'), href: getLink('/mini-games', lang) },
          { text: t('nav.smallGames'), href: getLink('/small-games', lang) },
          { text: t('nav.arcadeGames'), href: getLink('/arcade-games', lang) },
          { text: t('nav.browserGames'), href: getLink('/browser-games', lang) },
          { text: t('nav.html5Games'), href: getLink('/html5-games', lang) },
          { text: t('nav.noDownloadGames'), href: getLink('/no-download-games', lang) },
        ],
      },
      {
        text: t('nav.lifestyle'),
        href: getLink('/relax-games', lang),
        links: [
          { text: t('nav.relaxGames'), href: getLink('/relax-games', lang) },
          { text: t('nav.boredGames'), href: getLink('/bored-games', lang) },
        ],
      },
      {
        text: t('nav.blog'),
        href: getLink('/blog', lang),
      },
    ],
    actions: [{ text: t('hero.surprise'), href: getLink('/surprise', lang), icon: 'tabler:gift' }],
  };
};

export const getFooterData = (lang = 'en') => {
  const t = useTranslations(resolveLang(lang));

  return {
    links: [
      {
        title: t('nav.games'),
        links: [
          { text: t('nav.miniGames'), href: getLink('/mini-games', lang) },
          { text: t('nav.smallGames'), href: getLink('/small-games', lang) },
          { text: t('nav.arcadeGames'), href: getLink('/arcade-games', lang) },
          { text: t('nav.browserGames'), href: getLink('/browser-games', lang) },
          { text: t('nav.html5Games'), href: getLink('/html5-games', lang) },
          { text: t('nav.noDownloadGames'), href: getLink('/no-download-games', lang) },
        ],
      },
      {
        title: t('nav.lifestyle'),
        links: [
          { text: t('nav.relaxGames'), href: getLink('/relax-games', lang) },
          { text: t('nav.boredGames'), href: getLink('/bored-games', lang) },
          { text: t('nav.boredAtWork'), href: getLink('/bored-games/bored-at-work', lang) },
          { text: t('nav.boredAtSchool'), href: getLink('/bored-games/bored-at-school', lang) },
        ],
      },
      {
        title: t('footer.about'),
        links: [
          { text: t('footer.about'), href: getLink('/about', lang) },
          { text: t('nav.blog'), href: getLink('/blog', lang) },
          { text: t('nav.contact'), href: getLink('/contact', lang) },
        ],
      },
    ],
    secondaryLinks: [
      { text: t('footer.terms'), href: getLink('/terms', lang) },
      { text: t('footer.privacy'), href: getLink('/privacy', lang) },
    ],
    socialLinks: [
      { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/MiniGamesHub' },
      { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/minigameshub' },
      { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://facebook.com/MiniGamesHub' },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    ],
    footNote: `
      © 2026 MiniGamesHub · A property of Synthflow Digital LTD · All rights reserved.
    `,
  };
};

export const headerData = getHeaderData('en');
export const footerData = getFooterData('en');
