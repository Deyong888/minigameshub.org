import { getPermalink, getAsset } from './utils/permalinks';
import { useTranslations } from './utils/i18n';

const getLink = (path: string, lang: string) => {
  if (path.startsWith('/blog')) {
    return getPermalink(path);
  }

  const prefix = lang === 'en' ? '' : `/${lang}`;
  return getPermalink(`${prefix}${path}`);
};

export const getHeaderData = (lang = 'en') => {
  const t = useTranslations(lang as any);
  
  return {
    links: [
      {
        text: t('nav.miniGames'),
        href: getLink('/mini-games', lang),
        links: [
          { text: t('cat.arcade'), href: getLink('/mini-games/arcade', lang) },
          { text: t('cat.puzzle'), href: getLink('/mini-games/puzzle', lang) },
          { text: t('cat.action'), href: getLink('/mini-games/action', lang) },
          { text: t('nav.relaxGames'), href: getLink('/mini-games/relax', lang) },
        ],
      },
      {
        text: t('nav.smallGames'),
        href: getLink('/small-games', lang),
        links: [
          { text: t('cat.casual'), href: getLink('/small-games/casual', lang) },
          { text: t('nav.quickGames'), href: getLink('/small-games/quick', lang) },
          { text: t('cat.short'), href: getLink('/small-games/short', lang) },
        ],
      },
      {
        text: t('nav.relaxGames'),
        href: getLink('/relax-games', lang),
        links: [
          { text: t('cat.stressRelief'), href: getLink('/relax-games/stress-relief', lang) },
          { text: t('cat.calming'), href: getLink('/relax-games/calming', lang) },
          { text: t('cat.casual'), href: getLink('/relax-games/casual', lang) },
        ],
      },
      {
        text: t('nav.boredGames'),
        href: getLink('/bored-games', lang),
        links: [
          { text: t('nav.boredAtWork'), href: getLink('/bored-games/bored-at-work', lang) },
          { text: t('nav.boredAtSchool'), href: getLink('/bored-games/bored-at-school', lang) },
          { text: t('nav.waitingInLine'), href: getLink('/bored-games/waiting-in-line', lang) },
        ],
      },
      {
        text: t('nav.arcadeGames'),
        href: getLink('/arcade-games', lang),
        links: [
          { text: t('cat.classic'), href: getLink('/arcade-games/classic', lang) },
          { text: t('cat.retro'), href: getLink('/arcade-games/retro', lang) },
          { text: t('cat.modern'), href: getLink('/arcade-games/modern', lang) },
        ],
      },
    ],
    actions: [{ text: t('hero.surprise'), href: getLink('/surprise', lang), icon: 'tabler:gift' }],
  };
};

export const getFooterData = (lang = 'en') => {
  const t = useTranslations(lang as any);
  
  return {
    links: [
      {
        title: t('nav.boredGames'),
        links: [
          { text: t('nav.boredGames'), href: getLink('/bored-games', lang) },
          { text: t('nav.boredAtWork'), href: getLink('/bored-games/bored-at-work', lang) },
          { text: t('nav.boredAtSchool'), href: getLink('/bored-games/bored-at-school', lang) },
          { text: t('nav.waitingInLine'), href: getLink('/bored-games/waiting-in-line', lang) },
        ],
      },
      {
        title: t('nav.miniGames'),
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
        title: t('nav.relaxGames'),
        links: [
          { text: t('nav.relaxGames'), href: getLink('/relax-games', lang) },
          { text: t('cat.puzzle'), href: getLink('/mini-games/puzzle', lang) },
          { text: t('cat.casual'), href: getLink('/small-games/casual', lang) },
          { text: t('cat.classic'), href: getLink('/arcade-games/classic', lang) },
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
      { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
      { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
      { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    ],
    footNote: `
      © 2026 MiniGamesHub · A property of Synthflow Digital LTD · All rights reserved.
    `,
  };
};

export const headerData = getHeaderData('en');
export const footerData = getFooterData('en');
