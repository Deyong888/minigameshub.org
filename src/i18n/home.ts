// Single source of truth for homepage copy across locales.
// Structure is defined once in src/components/home/HomePage.astro; only the
// strings below differ per language. Edit copy here to update all locales at once.

export type Lang = 'en' | 'es' | 'zh';

export interface FaqItem {
  title: string;
  description: string;
}

export interface SubSection {
  heading: string;
  desc: string;
}

export interface FeatureStat {
  value: string;
  label: string;
}

export interface ShowcaseCard {
  route: string;
  title: string;
  desc: string;
}

export interface FeaturedBlock {
  heading: string;
  desc: string;
}

export interface SeoList {
  h3: string;
  p: string;
  list: string[];
}

export interface HomeCopy {
  metadata: { title: string; description: string };
  hero: { badge: string; titleLead: string; count: string; titleTrail: string; subtext: string };
  nav: { route: string; label: string }[];
  newBanner: { badge: string; title: string; text: string; cta: string };
  newGrid: { eyebrow: string; title: string; subtitle: string; viewAll: string };
  mini: { label: string; title: string; subtitle: string; viewAll: string; subs: SubSection[] };
  small: { label: string; title: string; subtitle: string; viewAll: string; subs: SubSection[] };
  relax: { label: string; title: string; subtitle: string; viewAll: string; subs: SubSection[] };
  bored: {
    label: string;
    title: string;
    subtitle: string;
    viewAll: string;
    cards: { title: string; note: string }[];
  };
  more: { heading: string; subtitle: string; cards: ShowcaseCard[]; featured: FeaturedBlock[] };
  features: FeatureStat[];
  seo: {
    hero: { h2: string; p: string };
    worldCup: SeoList;
    why: SeoList;
    football: SeoList;
  };
  faq: { title: string; subtitle: string; tagline: string; items: FaqItem[] };
}

export const home: Record<Lang, HomeCopy> = {
  en: {
    metadata: {
      title: 'MiniGamesHub — Play 3,900+ Free Games | World Cup Football Games Online',
      description:
        'Play 3,900+ free games online including World Cup football games, soccer games, mini games, arcade games and more. Instant browser play, no download required!',
    },
    hero: {
      badge: '🔥 World Cup Football Games Now Live!',
      titleLead: 'Play ',
      count: '3,900+',
      titleTrail: ' Free Games Instantly',
      subtext:
        'Arcade classics, brain-teasing puzzles, relaxing escapes — all playable in your browser. <span class="font-semibold text-gray-800 dark:text-gray-200">No downloads, no sign-ups, just fun.</span>',
    },
    nav: [
      { route: 'mini-games', label: 'Mini Games' },
      { route: 'small-games', label: 'Small Games' },
      { route: 'relax-games', label: 'Relax Games' },
      { route: 'bored-games', label: 'Bored Games' },
      { route: 'arcade-games', label: 'Arcade' },
      { route: 'browser-games', label: 'Browser' },
      { route: 'html5-games', label: 'HTML5' },
      { route: 'new-games', label: '🆕 New Games' },
    ],
    newBanner: {
      badge: 'Freshly Added',
      title: '🆕 New Games Every Week',
      text: 'We just expanded to <strong>3,900+ free games</strong> — with the newest titles added to the top. Dive into the latest drops, all free and playable instantly in your browser.',
      cta: 'Browse New Games',
    },
    newGrid: {
      eyebrow: 'Newly Added',
      title: 'Latest Game Drops',
      subtitle: 'The freshest free games, updated regularly.',
      viewAll: 'View All New',
    },
    mini: {
      label: 'Mini Games',
      title: 'Quick Fun, Anytime',
      subtitle: 'Short, addictive games perfect for coffee breaks and quick sessions.',
      viewAll: 'View All',
      subs: [
        { heading: 'Arcade', desc: 'Classic arcade fun in mini format.' },
        { heading: 'Puzzle', desc: 'Brain-teasing challenges to keep your mind sharp.' },
        { heading: 'Action', desc: 'Fast-paced excitement for adrenaline seekers.' },
      ],
    },
    small: {
      label: 'Small Games',
      title: 'Big Fun in Small Packages',
      subtitle: 'Lightweight HTML5 games that run smoothly on any device.',
      viewAll: 'View All',
      subs: [
        { heading: 'Casual', desc: 'Relaxing small games for unwinding.' },
        { heading: 'Quick', desc: 'Games under 5 minutes for busy schedules.' },
        { heading: 'Short', desc: 'Instant gratification in every session.' },
      ],
    },
    relax: {
      label: 'Relax Games',
      title: 'Unwind and De-stress',
      subtitle: 'Calm, therapeutic games to melt your stress away.',
      viewAll: 'View All',
      subs: [
        { heading: 'Calming', desc: 'Soothing games to reduce anxiety.' },
        { heading: 'Stress Relief', desc: 'Games designed to melt away worries.' },
        { heading: 'Casual', desc: 'Low-pressure games for peaceful sessions.' },
      ],
    },
    bored: {
      label: 'Bored Games',
      title: 'Beat Boredom, Anytime',
      subtitle: 'Curated collections for every situation — work, school, or home.',
      viewAll: 'View All',
      cards: [
        { title: 'Bored at Work', note: 'Boss key included' },
        { title: 'Bored at School', note: 'Unblocked & Chromebook-ready' },
        { title: 'Waiting in Line', note: 'Quick, mobile-friendly fun' },
      ],
    },
    more: {
      heading: 'Explore More Categories',
      subtitle: 'Thousands of games organized just for you.',
      cards: [
        { route: 'arcade-games', title: 'Arcade Games', desc: 'Classic & modern arcade action' },
        { route: 'browser-games', title: 'Browser Games', desc: 'Play in Chrome, Firefox, Safari' },
        { route: 'no-download-games', title: 'No Download Games', desc: 'Instant play, zero waiting' },
        { route: 'html5-games', title: 'HTML5 Games', desc: 'Modern tech, smooth gameplay' },
      ],
      featured: [
        { heading: 'HTML5 Browser Games', desc: 'Modern games for any device.' },
        { heading: 'Mobile Friendly', desc: 'Optimized for touch screens.' },
      ],
    },
    features: [
      { value: '3,900+', label: 'Free Games' },
      { value: '20+', label: 'Categories' },
      { value: 'No Download', label: 'Instant Play' },
      { value: 'All Devices', label: 'Desktop & Mobile' },
    ],
    seo: {
      hero: {
        h2: 'Discover the Best Free Mini Games Online',
        p: 'Welcome to <strong>MiniGamesHub</strong>, your premier destination for <strong>free online mini games</strong> and small games that deliver big fun in small packages. With over 1,400 <strong>HTML5 games</strong> in our collection, you’ll never run out of exciting games to play directly in your browser — no downloads, no installations, and no sign-ups required!',
      },
      worldCup: {
        h3: '⚽ World Cup Football Games',
        p: 'Celebrate the excitement of the <strong>World Cup</strong> with our curated collection of <strong>free football games</strong> and <strong>soccer games</strong>! Play exciting matches, score goals, and experience the thrill of the world’s most popular sport right in your browser. Our selection includes everything from casual kickabouts to competitive football tournaments.',
        list: [],
      },
      why: {
        h3: 'Why Choose Mini Games?',
        p: '<strong>Mini games</strong> and <strong>small games</strong> are designed for short bursts of 5–15 minutes, making them ideal for:',
        list: [
          'Quick work breaks to recharge your brain',
          'Free time at school between classes',
          'Waiting in lines or during commutes',
          'Unwinding after a long, stressful day',
        ],
      },
      football: {
        h3: '🎮 Football & Soccer Games Collection',
        p: 'Looking for the perfect <strong>football game online</strong>? Our sports category features:',
        list: [
          'World Cup themed soccer games',
          'Penalty shootout challenges',
          'Football manager simulations',
          'Arcade-style soccer matches',
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'About mini games, browser games, and how the platform works',
      tagline: 'FAQs',
      items: [
        {
          title: 'What are mini games?',
          description:
            'Mini games are short, casual games designed for quick play sessions, typically 5-10 minutes. They are perfect for busy people who want quick entertainment without commitment.',
        },
        {
          title: 'What is the difference between mini games and small games?',
          description:
            'Mini games emphasize short play time, while small games refer to lightweight games with small file sizes. At MiniGamesHub, we offer both — quick to play and light on storage!',
        },
        {
          title: 'What are HTML5 games?',
          description:
            'HTML5 games are browser-based games built with modern web technology. They run on any device with a browser — no apps, no downloads, instant play!',
        },
        {
          title: 'Can I play arcade games for free?',
          description:
            'Yes! All arcade games on MiniGamesHub are 100% free. Play classic and modern arcade games instantly in your browser.',
        },
        {
          title: 'What are relax games?',
          description:
            'Relax games are designed to reduce stress and provide a calming experience. They are peaceful, pressure-free games perfect for unwinding after a long day.',
        },
        {
          title: 'What are the best games to play when bored?',
          description:
            'The best games to play when bored depend on your situation! For work: quick mini games with boss key. For home: immersive arcade games. For stress: calming relax games. Browse our categories to find your perfect match!',
        },
        {
          title: 'Do you have football games for the World Cup?',
          description:
            'Yes! We have an amazing collection of free football games and soccer games perfect for the World Cup season. Play penalty shootouts, football matches, and soccer tournaments directly in your browser!',
        },
        {
          title: 'Can I play soccer games for free?',
          description:
            'Absolutely! All soccer and football games on MiniGamesHub are 100% free. No downloads, no sign-ups, just instant football fun right in your browser!',
        },
      ],
    },
  },

  es: {
    metadata: {
      title: 'MiniGamesHub — Juega +3.900 Juegos Gratis | Juegos de Fútbol del Mundial en Línea',
      description:
        'Juega +3.900 juegos gratis en línea, incluyendo juegos de fútbol del Mundial, juegos de soccer, minijuegos, juegos arcade y más. Juego instantáneo en el navegador, ¡sin descargas!',
    },
    hero: {
      badge: '🔥 ¡Juegos de Fútbol del Mundial Ya Disponibles!',
      titleLead: 'Juega ',
      count: '+3.900',
      titleTrail: ' Juegos Gratis al Instante',
      subtext:
        'Clásicos arcade, puzzles para el cerebro, escapes relajantes: todo jugable en tu navegador. <strong>Sin descargas, sin registros, solo diversión.</strong>',
    },
    nav: [
      { route: 'mini-games', label: 'Minijuegos' },
      { route: 'small-games', label: 'Juegos Pequeños' },
      { route: 'relax-games', label: 'Juegos de Relax' },
      { route: 'bored-games', label: 'Juegos para Aburridos' },
      { route: 'arcade-games', label: 'Arcade' },
      { route: 'browser-games', label: 'Navegador' },
      { route: 'html5-games', label: 'HTML5' },
      { route: 'new-games', label: '🆕 Juegos Nuevos' },
    ],
    newBanner: {
      badge: 'Recién Añadido',
      title: '🆕 Nuevos Juegos Cada Semana',
      text: '¡Acabamos de ampliar a <strong>+3.900 juegos gratis</strong>, con los títulos más nuevos arriba! Sumérgete en los últimos lanzamientos, todos gratis y jugables al instante en tu navegador.',
      cta: 'Ver Juegos Nuevos',
    },
    newGrid: {
      eyebrow: 'Recién Añadido',
      title: 'Últimos Lanzamientos',
      subtitle: 'Los juegos gratis más frescos, actualizados regularmente.',
      viewAll: 'Ver Todos los Nuevos',
    },
    mini: {
      label: 'Minijuegos',
      title: 'Diversión Rápida en Cualquier Momento',
      subtitle: 'Juegos cortos y adictivos, perfectos para descansos y sesiones rápidas.',
      viewAll: 'Ver Todos',
      subs: [
        { heading: 'Arcade', desc: 'Diversión arcade clásica en formato mini.' },
        { heading: 'Puzzle', desc: 'Desafíos mentales para mantener tu mente aguda.' },
        { heading: 'Acción', desc: 'Emoción de ritmo rápido para buscadores de adrenalina.' },
      ],
    },
    small: {
      label: 'Juegos Pequeños',
      title: 'Diversión Grande en Paquetes Pequeños',
      subtitle: 'Juegos HTML5 ligeros que funcionan sin problemas en cualquier dispositivo.',
      viewAll: 'Ver Todos',
      subs: [
        { heading: 'Casual', desc: 'Juegos pequeños relajantes para desconectar.' },
        { heading: 'Rápido', desc: 'Juegos de menos de 5 minutos para agendas ocupadas.' },
        { heading: 'Corto', desc: 'Gratificación instantánea en cada sesión.' },
      ],
    },
    relax: {
      label: 'Juegos de Relax',
      title: 'Relájate y Desestrésate',
      subtitle: 'Juegos calmados y terapéuticos para derretir tu estrés.',
      viewAll: 'Ver Todos',
      subs: [
        { heading: 'Calmantes', desc: 'Juegos relajantes para reducir la ansiedad.' },
        { heading: 'Alivio del Estrés', desc: 'Juegos diseñados para derretir las preocupaciones.' },
        { heading: 'Casual', desc: 'Juegos de baja presión para sesiones pacíficas.' },
      ],
    },
    bored: {
      label: 'Juegos para Aburridos',
      title: 'Vence el Aburrimiento en Cualquier Momento',
      subtitle: 'Colecciones curadas para cada situación: trabajo, escuela o casa.',
      viewAll: 'Ver Todos',
      cards: [
        { title: 'Aburrido en el Trabajo', note: 'Tecla de jefe incluida' },
        { title: 'Aburrido en la Escuela', note: 'Desbloqueado y listo para Chromebook' },
        { title: 'Esperando en Fila', note: 'Diversión rápida y para móviles' },
      ],
    },
    more: {
      heading: 'Explora Más Categorías',
      subtitle: 'Miles de juegos organizados solo para ti.',
      cards: [
        { route: 'arcade-games', title: 'Juegos Arcade', desc: 'Acción arcade clásica y moderna' },
        { route: 'browser-games', title: 'Juegos de Navegador', desc: 'Juega en Chrome, Firefox, Safari' },
        { route: 'no-download-games', title: 'Juegos Sin Descarga', desc: 'Juego instantáneo, cero espera' },
        { route: 'html5-games', title: 'Juegos HTML5', desc: 'Tecnología moderna, jugabilidad fluida' },
      ],
      featured: [
        { heading: 'Juegos HTML5 de Navegador', desc: 'Juegos modernos para cualquier dispositivo.' },
        { heading: 'Amigable con Móviles', desc: 'Optimizado para pantallas táctiles.' },
      ],
    },
    features: [
      { value: '+3.900', label: 'Juegos Gratis' },
      { value: '+20', label: 'Categorías' },
      { value: 'Sin Descarga', label: 'Juego Instantáneo' },
      { value: 'Todos los Dispositivos', label: 'Escritorio y Móvil' },
    ],
    seo: {
      hero: {
        h2: 'Descubre los Mejores Minijuegos Gratis en Línea',
        p: 'Bienvenido a <strong>MiniGamesHub</strong>, tu destino principal para <strong>minijuegos gratis en línea</strong> y juegos pequeños que ofrecen gran diversión en paquetes pequeños. Con más de 1.400 <strong>juegos HTML5</strong> en nuestra colección, nunca te faltarán juegos emocionantes para jugar directamente en tu navegador: ¡sin descargas, sin instalaciones y sin registros!',
      },
      worldCup: {
        h3: '⚽ Juegos de Fútbol del Mundial',
        p: '¡Celebra la emoción del <strong>Mundial</strong> con nuestra colección curada de <strong>juegos de fútbol gratis</strong> y <strong>juegos de soccer</strong>! Juega partidos emocionantes, marca goles y vive la emoción del deporte más popular del mundo justo en tu navegador. Nuestra selección incluye desde partidos casuales hasta torneos de fútbol competitivos.',
        list: [],
      },
      why: {
        h3: '¿Por qué Elegir Minijuegos?',
        p: 'Los <strong>minijuegos</strong> y <strong>juegos pequeños</strong> están diseñados para rachas cortas de 5 a 15 minutos, lo que los hace ideales para:',
        list: [
          'Descansos rápidos en el trabajo para recargar tu mente',
          'Tiempo libre en la escuela entre clases',
          'Esperando en filas o durante el trayecto',
          'Desconectar después de un largo y estresante día',
        ],
      },
      football: {
        h3: '🎮 Colección de Juegos de Fútbol y Soccer',
        p: '¿Buscas el <strong>juego de fútbol en línea</strong> perfecto? Nuestra categoría de deportes incluye:',
        list: [
          'Juegos de soccer con tema del Mundial',
          'Desafíos de penales',
          'Simulaciones de manager de fútbol',
          'Partidos de fútbol estilo arcade',
        ],
      },
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Sobre minijuegos, juegos de navegador y cómo funciona la plataforma',
      tagline: 'FAQs',
      items: [
        {
          title: '¿Qué son los minijuegos?',
          description:
            'Los minijuegos son juegos cortos y casuales diseñados para sesiones rápidas, típicamente 5-10 minutos. Son perfectos para personas ocupadas que quieren entretenimiento rápido sin compromiso.',
        },
        {
          title: '¿Cuál es la diferencia entre minijuegos y juegos pequeños?',
          description:
            'Los minijuegos enfatizan el tiempo de juego corto, mientras que los juegos pequeños se refieren a juegos ligeros con archivos pequeños. ¡En MiniGamesHub ofrecemos ambos: rápidos de jugar y ligeros en almacenamiento!',
        },
        {
          title: '¿Qué son los juegos HTML5?',
          description:
            'Los juegos HTML5 son juegos basados en navegador construidos con tecnología web moderna. Funcionan en cualquier dispositivo con navegador: ¡sin apps, sin descargas, juego instantáneo!',
        },
        {
          title: '¿Puedo jugar juegos arcade gratis?',
          description:
            '¡Sí! Todos los juegos arcade en MiniGamesHub son 100% gratis. Juega juegos arcade clásicos y modernos al instante en tu navegador.',
        },
        {
          title: '¿Qué son los juegos de relax?',
          description:
            'Los juegos de relax están diseñados para reducir el estrés y ofrecer una experiencia calmante. Son juegos pacíficos y sin presión, perfectos para desconectar después de un largo día.',
        },
        {
          title: '¿Cuáles son los mejores juegos para jugar cuando estás aburrido?',
          description:
            '¡Los mejores juegos para cuando estás aburrido dependen de tu situación! Para el trabajo: minijuegos rápidos con tecla de jefe. Para casa: juegos arcade inmersivos. Para el estrés: juegos de relax calmantes. ¡Explora nuestras categorías para encontrar tu juego perfecto!',
        },
        {
          title: '¿Tienen juegos de fútbol para el Mundial?',
          description:
            '¡Sí! Tenemos una increíble colección de juegos de fútbol gratis y juegos de soccer perfectos para la temporada del Mundial. ¡Juega penales, partidos de fútbol y torneos de soccer directamente en tu navegador!',
        },
        {
          title: '¿Puedo jugar juegos de soccer gratis?',
          description:
            '¡Absolutamente! Todos los juegos de soccer y fútbol en MiniGamesHub son 100% gratis. Sin descargas, sin registros, ¡solo diversión de fútbol instantánea en tu navegador!',
        },
      ],
    },
  },

  zh: {
    metadata: {
      title: 'MiniGamesHub — 畅玩 3,900+ 免费游戏 | 世界杯足球游戏在线',
      description:
        '在线畅玩 3,900+ 款免费游戏，包括世界杯足球游戏、soccer 足球游戏、迷你游戏、街机游戏等。浏览器即开即玩，无需下载！',
    },
    hero: {
      badge: '🔥 世界杯足球游戏现已上线！',
      titleLead: '立即畅玩 ',
      count: '3,900+',
      titleTrail: ' 免费游戏',
      subtext:
        '街机经典、烧脑解谜、放松解压——全部可在浏览器中畅玩。<strong>无需下载，无需注册，畅玩即乐趣。</strong>',
    },
    nav: [
      { route: 'mini-games', label: '迷你游戏' },
      { route: 'small-games', label: '小游戏' },
      { route: 'relax-games', label: '放松游戏' },
      { route: 'bored-games', label: '无聊必备' },
      { route: 'arcade-games', label: '街机' },
      { route: 'browser-games', label: '网页游戏' },
      { route: 'html5-games', label: 'HTML5' },
      { route: 'new-games', label: '🆕 新游戏' },
    ],
    newBanner: {
      badge: '最新添加',
      title: '🆕 每周上新游戏',
      text: '我们刚刚扩充至 <strong>3,900+ 款免费游戏</strong>——最新作品已置顶。立即畅玩最新上架，全部免费、浏览器即开即玩。',
      cta: '浏览新游戏',
    },
    newGrid: {
      eyebrow: '最新添加',
      title: '最新上架游戏',
      subtitle: '最新鲜的免费游戏，定期更新。',
      viewAll: '查看全部新游戏',
    },
    mini: {
      label: '迷你游戏',
      title: '随时随地，轻松乐趣',
      subtitle: '短小上瘾的游戏，非常适合咖啡间隙与碎片时间。',
      viewAll: '查看全部',
      subs: [
        { heading: '街机', desc: '迷你版经典街机乐趣。' },
        { heading: '益智', desc: '烧脑挑战，保持思维敏锐。' },
        { heading: '动作', desc: '快节奏刺激，为寻求肾上腺素的你准备。' },
      ],
    },
    small: {
      label: '小游戏',
      title: '小身材，大乐趣',
      subtitle: '轻量级 HTML5 游戏，在任何设备上都流畅运行。',
      viewAll: '查看全部',
      subs: [
        { heading: '休闲', desc: '放松身心的小游戏。' },
        { heading: '快速', desc: '5 分钟内的小游戏，适合忙碌日程。' },
        { heading: '短时', desc: '每局即刻满足。' },
      ],
    },
    relax: {
      label: '放松游戏',
      title: '放松解压',
      subtitle: '宁静、治愈的游戏，融化你的压力。',
      viewAll: '查看全部',
      subs: [
        { heading: '舒缓', desc: '舒缓游戏，减轻焦虑。' },
        { heading: '缓解压力', desc: '专为消解烦恼而设计的游戏。' },
        { heading: '休闲', desc: '无压力游戏，享受平静时光。' },
      ],
    },
    bored: {
      label: '无聊必备',
      title: '随时随地击退无聊',
      subtitle: '为每种场景精心挑选的合集——工作、学校或居家。',
      viewAll: '查看全部',
      cards: [
        { title: '上班摸鱼', note: '含老板键' },
        { title: '学校解闷', note: '已解锁，Chromebook 友好' },
        { title: '排队等候', note: '轻松、移动端友好' },
      ],
    },
    more: {
      heading: '探索更多分类',
      subtitle: '数千款游戏，为你精心整理。',
      cards: [
        { route: 'arcade-games', title: '街机游戏', desc: '经典与现代街机动作' },
        { route: 'browser-games', title: '网页游戏', desc: '在 Chrome、Firefox、Safari 中畅玩' },
        { route: 'no-download-games', title: '无需下载游戏', desc: '即点即玩，零等待' },
        { route: 'html5-games', title: 'HTML5 游戏', desc: '现代技术，流畅操作' },
      ],
      featured: [
        { heading: 'HTML5 网页游戏', desc: '适用于任何设备的现代游戏。' },
        { heading: '移动端友好', desc: '针对触屏优化。' },
      ],
    },
    features: [
      { value: '3,900+', label: '免费游戏' },
      { value: '20+', label: '个分类' },
      { value: '无需下载', label: '即点即玩' },
      { value: '全平台', label: '桌面与移动端' },
    ],
    seo: {
      hero: {
        h2: '发现最佳免费在线迷你游戏',
        p: '欢迎来到 <strong>MiniGamesHub</strong>，您畅玩<strong>免费在线迷你游戏</strong>与小游戏的首选之地，小体积也能带来大乐趣。我们的合集拥有超过 1,400 款 <strong>HTML5 游戏</strong>，您永远不缺可在浏览器中直接畅玩的精彩游戏——无需下载、无需安装、无需注册！',
      },
      worldCup: {
        h3: '⚽ 世界杯足球游戏',
        p: '用我们精心挑选的<strong>免费足球游戏</strong>与 <strong>soccer 足球游戏</strong>一起，共庆<strong>世界杯</strong>的激情！踢精彩比赛、射门得分，在浏览器中尽情体验全球最受欢迎运动的魅力。我们的选集从休闲踢球到竞技足球锦标赛一应俱全。',
        list: [],
      },
      why: {
        h3: '为什么要选择迷你游戏？',
        p: '<strong>迷你游戏</strong>与<strong>小游戏</strong>专为 5–15 分钟的碎片时间设计，非常适合：',
        list: ['工作间隙快速充电，清醒大脑', '课间在校的空闲时光', '排队或通勤途中', '漫长压力一天后的放松'],
      },
      football: {
        h3: '🎮 足球与 Soccer 游戏合集',
        p: '想找完美的<strong>在线足球游戏</strong>？我们的体育分类包含：',
        list: ['世界杯主题足球游戏', '点球大战挑战', '足球经理模拟', '街机风格足球对战'],
      },
    },
    faq: {
      title: '常见问题',
      subtitle: '关于迷你游戏、网页游戏，以及平台运作方式',
      tagline: 'FAQ',
      items: [
        {
          title: '什么是迷你游戏？',
          description:
            '迷你游戏是短小的休闲游戏，专为快速畅玩设计，通常 5-10 分钟。非常适合想要无负担、即开即玩娱乐的忙碌人群。',
        },
        {
          title: '迷你游戏和小游戏有什么区别？',
          description:
            '迷你游戏强调游戏时长短，而小游戏指体积小、文件小的轻量游戏。在 MiniGamesHub，两者皆有——即玩即乐，存储无负担！',
        },
        {
          title: '什么是 HTML5 游戏？',
          description:
            'HTML5 游戏是基于现代 Web 技术打造的浏览器游戏。只要有浏览器，任何设备都能运行——无需 App、无需下载、即点即玩！',
        },
        {
          title: '街机游戏可以免费玩吗？',
          description: '可以！MiniGamesHub 上所有街机游戏 100% 免费。在浏览器中即玩经典与现代街机游戏。',
        },
        {
          title: '什么是放松游戏？',
          description: '放松游戏旨在缓解压力、带来平静体验。它们平和、无压力，非常适合在漫长一天后放松身心。',
        },
        {
          title: '无聊时最适合玩什么游戏？',
          description:
            '无聊时最适合玩的游戏取决于你的场景！工作时：带老板键的快捷迷你游戏。居家：沉浸式街机游戏。解压：舒缓的放松游戏。浏览我们的分类，找到最适合你的那款！',
        },
        {
          title: '你们有世界杯主题的足球游戏吗？',
          description:
            '有！我们拥有超棒的免费足球游戏与 soccer 足球游戏合集，非常适合世界杯赛季。在浏览器中直接踢点球大战、足球比赛与足球锦标赛！',
        },
        {
          title: '足球游戏可以免费玩吗？',
          description:
            '当然！MiniGamesHub 上所有足球与 soccer 游戏 100% 免费。无需下载、无需注册，浏览器中即享足球乐趣！',
        },
      ],
    },
  },
};
