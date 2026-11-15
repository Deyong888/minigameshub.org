// Curated AI-built browser games for the Fable 5.2 topic hub.
// URLs copied verbatim from the 2026-11-15 research report and the
// awesome-list scan (same day). Never guess or reconstruct a URL.
//
// Honesty rule: the `tool` field states the AI tool that actually built
// each game. Only games in the `fable` section were made with
// Claude Fable 5.2; everything in `more` names its own tool.

export interface FableGame {
  name: string;
  slug: string;
  author: string; // '' when the creator is not publicly credited
  handle: string;
  genre: string;
  tool: string; // exact AI tool, shown on the badge
  toolKey:
    | 'fable52'
    | 'fable5'
    | 'opus55'
    | 'claude-code'
    | 'claude'
    | 'cursor'
    | 'codex'
    | 'cursor-claude'
    | 'agents';
  section: 'fable' | 'more';
  url: string;
  embeddable: boolean;
  externalReason?: string;
  description: string;
  howToPlay: string;
  about: string[];
  // Verified making-of material only (research report, repo README, or the
  // creator's own post). Omit the field when no public source exists.
  howItWasMade?: { text: string[]; prompt?: string };
  icon: string; // tabler icon name, verified in @iconify-json/tabler
  gradient: string; // key into GRADIENTS in GameCard.astro
  github?: string; // owner/repo
  license?: string;
  chineseUI?: boolean;
}

export const fableGames: FableGame[] = [
  // ---------- Fable 5.2 section ----------
  {
    name: 'Saltline',
    slug: 'saltline',
    author: 'Felix Rieseberg',
    handle: '@felixrieseberg',
    genre: 'First-Person Shooter',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://claude.ai/artifact/BGY1SztrAYcJQHSsnHHGmp',
    embeddable: false,
    externalReason:
      "Claude artifacts block embedding, so the official version opens on claude.ai in a new tab.",
    description:
      'Cut uplink relays in a rainy container port, fighting Gull drones and Hound robot dogs, then escape by boat. The launch-week flagship — a full FPS built in a single session.',
    howToPlay:
      'Move with WASD and aim with the mouse; cut the three uplink relays while fighting off Gull drones and Hound robot dogs, then reach the boat to finish the mission. Press Escape to release the mouse pointer at any time.',
    about: [
      'Saltline is the game that started the Fable 5.2 wave. Felix Rieseberg, an engineer at Anthropic, set out to test the model with one-shot prompts and no human feedback — and came back with a complete first-person shooter. By his own account it took about 8 hours and roughly $550 in API costs, with every model, sound, and texture generated in code.',
      'The game drops you into a rainy container port where the security system has turned on you. Your job is to cut three uplink relays while Gull drones and Hound robot dogs hunt you down, then run for the boat and get out. It is a compact single level, but it plays like a slice of a much bigger game: real objectives, real enemies, and a proper ending.',
      'Saltline runs as a Claude artifact, which means it cannot be embedded here — the official version opens on claude.ai in a new tab. It is still the first game to play on this page if you want to understand what the launch week was about.',
    ],
    howItWasMade: {
      text: [
        'Rieseberg wanted to test Fable 5.2 with one-shot prompts and no human feedback — and he kept the very first draft. The model then worked for about 8 hours on its own, generating every model, sound, and texture in code. According to the creator, the run used about 445 million input tokens and 2.7 million output tokens, heavily cached, at a cost of roughly $550 at API prices.',
        'He also noted that his claude.md instruction file was empty, so no project rules shaped the result — the prompt below was the whole brief.',
      ],
      prompt:
        'You know, you should also build me a FPS. Insanely detailed quality pls, something that looks visually like it can keep up with AAA. Make it small in scope (like a tiny level) but otherwise impressive photorealistic graphics.',
    },
    icon: 'crosshair',
    gradient: 'slate',
  },
  {
    name: 'Tidewright',
    slug: 'tidewright',
    author: 'Felix Rieseberg',
    handle: '@felixrieseberg',
    genre: 'Sailing Adventure',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://claude.ai/artifact/JTgyEMn7sn1q2riWrMb7D4',
    embeddable: false,
    externalReason:
      "Claude artifacts block embedding, so the official version opens on claude.ai in a new tab.",
    description:
      'A sailing adventure from the creator of Saltline — take the helm and explore open waters in a world built with Claude Fable 5.2.',
    howToPlay:
      'Open the game on Claude and follow the on-screen guidance to sail. Check the game’s own start screen for its controls.',
    about: [
      'Tidewright is another Fable 5.2 game from Felix Rieseberg, the Anthropic engineer behind Saltline. Where Saltline was a tense shooter in a rainy port, Tidewright trades gunfire for open water: a sailing adventure you play right in the browser.',
      'Like Saltline it is published as a Claude artifact, so it plays on claude.ai rather than inside this page. It is a good second stop after Saltline — the same creator, the same model, a completely different kind of game.',
    ],
    howItWasMade: {
      text: [
        'Tidewright was published alongside Saltline as part of a Three Games collection — The Clockmaker’s Heart, Saltline, and Tidewright — with the footer note “First drafts, no human feedback.” Like Saltline, it is a first draft kept exactly as the model produced it.',
      ],
    },
    icon: 'ship',
    gradient: 'sky',
  },
  {
    name: 'Oil Paint',
    slug: 'oil-paint',
    author: 'Blendi Byl',
    handle: '@BlendiByl',
    genre: 'Walking Exploration',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://patch.gg/blendi/oil-paint',
    embeddable: true,
    description:
      'As a lantern-carrying wanderer, take slow walks through a snow ridge under the aurora to a cabin, and an autumn wood. No objectives — atmosphere is the game. Code MIT, art CC0.',
    howToPlay:
      'Move with WASD and look with the mouse. There are no objectives — pick a route and walk. Give the painted world a moment to load.',
    about: [
      'Oil Paint is a game about walking, and nothing else. As a lantern-carrying wanderer you take two slow routes: a snow ridge under the aurora that ends at a cabin, and an autumn wood. The whole scene is rendered like a painting in motion, brush strokes and all.',
      'It is also the cleanest licensing story on this page: the creator states the code is MIT and the art is CC0, so the game is genuinely open. If you want a quiet five minutes after the shooters and racers, start here.',
    ],
    howItWasMade: {
      text: [
        'According to the creator, Oil Paint was made in under an hour. He also claims the game renders about 1.5 million brush strokes per frame at 200 frames per second.',
      ],
    },
    icon: 'walk',
    gradient: 'amber',
  },
  {
    name: 'What the Water Keeps',
    slug: 'what-the-water-keeps',
    author: 'Kevin Ngo',
    handle: '@kevin_t_ngo',
    genre: 'Meditative Boat Ride',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://what-the-water-keeps.vercel.app/',
    embeddable: true,
    description:
      'Drift by lantern light through dreamlike realms in one night; steer and paddle, or let the current carry you. Nothing to win or lose.',
    howToPlay:
      'Steer and paddle, or let the current carry you — there is nothing to win or lose. The ride takes you through eight dreamlike realms in a single night.',
    about: [
      'What the Water Keeps is the most-shared “vibe” game of the Fable 5.2 launch week: one night, one river, one lantern. You drift through eight very different places from sunset to first light, and the game never asks anything of you beyond being there.',
      'It was made by Kevin Ngo, who shipped two games in the same launch week that could not be more different — this slow boat ride, and Evensong, a souls-like boss fight. Play them back to back and you get the full range of what one person and one model produced in a few days.',
    ],
    icon: 'sailboat',
    gradient: 'cyan',
  },
  {
    name: 'Evensong',
    slug: 'evensong',
    author: 'Kevin Ngo',
    handle: '@kevin_t_ngo',
    genre: 'Dark-Fantasy Boss Fight',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://evensong-phi.vercel.app/',
    embeddable: true,
    description:
      'Fight a boss in a drowned cathedral with lock-on, dodge rolls, a healing flask and blocking. A souls-like duel in a single arena.',
    howToPlay:
      'Lock on to the boss, dodge-roll through its attacks, block when you must, and drink from your healing flask to recover. One arena, one boss — learn its patterns and win.',
    about: [
      'Evensong is a souls-like boss fight in a drowned cathedral: lock-on targeting, dodge rolls, a healing flask, and blocking, all in a single arena. It is the opposite end of the spectrum from its creator’s other launch-week game, the meditative boat ride What the Water Keeps.',
      'The duel is short but demanding — the boss has real attack patterns to learn, and the flask only carries you so far. If you like the “one more try” loop of souls games, this is the Fable 5.2 game for you.',
    ],
    icon: 'sword',
    gradient: 'violet',
  },
  {
    name: 'CROSSTOWN',
    slug: 'crosstown',
    author: 'Matt Shumer',
    handle: '@mattshumer_',
    genre: 'Open-World City',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://nyc.somethingbig.ai/',
    embeddable: true,
    description:
      'Explore an open-world New York in this early preview — only part of the city is in so far, and the build is still growing.',
    howToPlay:
      'Explore the open-world New York preview — walk or drive through the parts of the city that are built so far. Press B to leave feedback for the creator.',
    about: [
      'CROSSTOWN is an open-world New York, built in public and still growing. Only part of the city is in so far — this is an early preview, not a finished game — but you can already wander its streets and see where the project is headed.',
      'Its creator, Matt Shumer, put the ambition plainly: “Rockstar took 8 years. Fable 5.2 is gonna do it in 7 days.” Come back in a week and the city will look different.',
    ],
    howItWasMade: {
      text: [
        'Shumer is building CROSSTOWN in public, a little at a time, with Fable 5.2. His stated ambition for the project: “Rockstar took 8 years. Fable 5.2 is gonna do it in 7 days.”',
      ],
    },
    icon: 'building-skyscraper',
    gradient: 'sky',
  },
  {
    name: 'Portals: Endless Worlds',
    slug: 'portals-endless-worlds',
    author: 'Ethan Mollick',
    handle: '@emollick',
    genre: 'Portal-Hopping Explorer',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://portals-endless-worlds.netlify.app/',
    embeddable: true,
    description:
      'Drift through portals linking a sprawling network of code-only 3D worlds inspired by books, art and places.',
    howToPlay:
      'Walk through portals to drift between worlds — each one is a different 3D scene inspired by books, art, and places. There is no goal beyond seeing what is through the next door.',
    about: [
      'Portals: Endless Worlds is the largest-scale build of the Fable 5.2 launch week: hundreds of code-only 3D worlds, linked by portals, each one inspired by a book, a work of art, or a place. You drift from world to world with no goal beyond curiosity.',
      'It was made by Ethan Mollick, who also shipped the reverse horror-comedy I Would Have Gotten Away With It in the same week. If you like the feeling of opening a door and not knowing what is behind it, this game is built entirely out of that feeling.',
    ],
    icon: 'world',
    gradient: 'fuchsia',
  },
  {
    name: 'LANTERNFALL',
    slug: 'lanternfall',
    author: 'loktar00',
    handle: '@loktar00',
    genre: '3D Auto-Battler',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://loktar00.github.io/lanternfall/',
    embeddable: true,
    description:
      'Build your team and watch it fight in a 3D auto-battler — animations and models all generated by Fable.',
    howToPlay:
      'Build your team, position your fighters, and watch the battle play out — your job is the strategy, not the sword swings.',
    about: [
      'LANTERNFALL is a 3D auto-battler: you build the team and set the strategy, then watch your fighters do the work. The animations and models were all generated by Fable, which makes it a good test of whether an AI model can carry a whole game’s art direction as well as its code.',
      'Auto-battlers live or die on team composition, so experiment — a lineup that loses badly can win easily with one swap.',
    ],
    icon: 'swords',
    gradient: 'amber',
  },
  {
    name: 'Mist-Locked Mountain Gate',
    slug: 'mist-locked-mountain-gate',
    author: 'op7418',
    handle: '@op7418',
    genre: 'Xianxia Action',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://op7418.github.io/guizang-game-skill/',
    embeddable: true,
    description:
      'Climb a misty mountain gate, fight guards and duel a general in a top-down xianxia action game.',
    howToPlay:
      'Climb the misty mountain gate, fight the guards, and duel the general at the top. Check the start screen for the exact controls.',
    about: [
      'Mist-Locked Mountain Gate (雾锁山门) is a top-down xianxia action game: a misty mountain climb, guards to fight, and a general waiting at the top. It is the most technically unusual game on this page — the whole thing is a single 30 MB HTML file.',
      'Its creator, op7418, is also known as 归藏. If you enjoy wuxia and xianxia settings, this is the Fable 5.2 game that speaks that language.',
    ],
    icon: 'mountain',
    gradient: 'emerald',
  },
  {
    name: 'Tennis',
    slug: 'tennis',
    author: 'photonstorm',
    handle: '@photonstorm',
    genre: 'Arcade Tennis',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://tennis.sixfingerpunch.com/',
    embeddable: true,
    description:
      "Asked to 'go wild,' Fable returned what looks like a Pong clone — until you play it.",
    howToPlay:
      "It looks like Pong — until you play it. Use the on-screen prompts and see what Fable does when told to “go wild.”",
    about: [
      'Tennis comes with the best origin story on this page: its creator asked Fable to “go wild,” and the model returned something that looks like a Pong clone — until you actually play it. We will not spoil the surprise.',
      'The creator is photonstorm, the developer behind the Phaser game framework — so when a joke game comes from someone who builds game engines for a living, it is worth a few minutes of your time.',
    ],
    icon: 'ball-tennis',
    gradient: 'lime',
  },
  {
    name: 'Gilt & Gutter',
    slug: 'gilt-and-gutter',
    author: 'Kevin Ngo',
    handle: '@kevin_t_ngo',
    genre: 'FPS Demo',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://gilt-and-gutter.vercel.app/',
    embeddable: true,
    description:
      'A head-to-head FPS demo — pick a character and duel in a moody arena.',
    howToPlay:
      'Pick a character and duel head-to-head in a moody arena. First-person controls — WASD to move, mouse to aim.',
    about: [
      'Gilt & Gutter is Kevin Ngo’s third launch-week game: a head-to-head FPS demo with two playable characters dueling in a moody arena. It is a demo, not a full game — but it shows how quickly Fable can stand up a working shooter with distinct characters.',
      'Play it after Saltline if you want to compare two very different answers to the same question: what does an AI-built FPS look like?',
    ],
    icon: 'target',
    gradient: 'rose',
  },
  {
    name: 'Turbo Tails',
    slug: 'turbo-tails',
    author: 'Peter Yang',
    handle: '@petergyang',
    genre: '3D Kart Racer',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://turbo-tails.vercel.app/',
    embeddable: true,
    description:
      'Race karters with drifting, ramps and items, single-player or multiplayer; coins speed you up, drifts and tricks fill the turbo meter.',
    howToPlay:
      'Race with drifting, ramps, and items — coins speed you up, and drifts and tricks fill the turbo meter. Play solo or against others. The game is heavy, so give it a moment to load.',
    about: [
      'Turbo Tails is a full 3D kart racer: six karters on the track, drifting, ramps, items, and a turbo meter you fill with drifts and tricks. It plays single-player or multiplayer, and it is the most complete racer of the Fable 5.2 launch week.',
      'Fair warning: the game is a heavy page, so let it load fully before you judge it. Once it is running, it is one of the most immediately fun games here.',
    ],
    icon: 'car',
    gradient: 'rose',
  },
  {
    name: 'I Would Have Gotten Away With It',
    slug: 'i-would-have-gotten-away-with-it',
    author: 'Ethan Mollick',
    handle: '@emollick',
    genre: 'Reverse Horror-Comedy Stealth',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://i-would-have-gotten-away-with-it.netlify.app/',
    embeddable: true,
    description:
      'Reverse Scooby-Doo — you are the villain scaring off meddling kids in a manor.',
    howToPlay:
      'You are the villain. Lurk, scheme, and scare the meddling kids out of your manor before they unmask you.',
    about: [
      'I Would Have Gotten Away With It flips the script: instead of unmasking the monster, you are the monster. A reverse Scooby-Doo set in a manor, where your job is to scare the meddling kids off before they pull your mask off.',
      'It is Ethan Mollick’s second launch-week game, after the sprawling Portals: Endless Worlds — proof that the same model can do a joke and an epic in the same week.',
    ],
    icon: 'ghost',
    gradient: 'violet',
  },
  {
    name: "Aiden's Revenge",
    slug: 'aidens-revenge',
    author: 'Lex Toumbourou',
    handle: '',
    genre: "Beat 'Em Up",
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://aidens-revenge.pages.dev/',
    embeddable: true,
    description:
      "A beat 'em up built from the creator's nephew's hand-drawn designs, with controller support.",
    howToPlay:
      'Fight through side-scrolling levels, beat up enemies, and face the bosses. Controllers are supported — plug one in for the full arcade feel.',
    about: [
      "Aiden's Revenge is a 12-level beat 'em up built from the creator's nephew's hand-drawn designs — a kid's drawings, turned into a playable arcade game by Fable 5.2. It has 18 characters and 4-player controller support.",
      'It reached the front page of Hacker News in launch week, and it is easy to see why: the game has a heart that no amount of polish can fake. Bring a controller if you have one.',
    ],
    howItWasMade: {
      text: [
        'A June prototype of the game already existed, built with Opus 4.8 and Fable 5 — but Fable 5.2 did an overnight rewrite, and the November 9–10 version is the Fable 5.2 one. According to the launch-week roundups, the build used about 340 million tokens and produced around 175 images and 140 audio clips.',
      ],
    },
    icon: 'flame',
    gradient: 'amber',
  },
  {
    name: 'Bayhaven',
    slug: 'bayhaven',
    author: 'fablestar',
    handle: '',
    genre: 'Open-World Crime Comedy',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://fablestar.games/play/',
    embeddable: true,
    description:
      'Play Mags, a retired getaway driver, and Teo in a sunny neon coastal city; steal cars, outrun a sheriff, with police heat measured in livestream viewers.',
    howToPlay:
      'Play Mags and Teo in a sunny neon coastal city — steal cars, outrun the sheriff, and watch your heat. The game is still growing in public, so expect new content.',
    about: [
      'Bayhaven is an open-world crime comedy: you play Mags, a 61-year-old ex-getaway driver, and Teo in a sunny neon coastal city. Steal cars, outrun a sheriff — and keep an eye on your police heat, which is measured in livestream viewers.',
      'The game is being built live in public, one Fable session a day, with a full release planned for November 19, 2026. Its source is public under the MIT license, so you can watch — or join — the build as it grows.',
    ],
    howItWasMade: {
      text: [
        'Bayhaven is being built live in public, one Fable session a day, with a full release planned for November 19, 2026. Its source is public under the MIT license, so the build is open for anyone to follow.',
      ],
    },
    icon: 'mask',
    gradient: 'fuchsia',
    github: 'fablestar/bayhaven',
    license: 'MIT',
  },
  {
    name: 'Starry Nightrider',
    slug: 'starry-nightrider',
    author: 'Ebby Amir',
    handle: '@ebbyamir',
    genre: 'Artistic 3D Exploration',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://starrynightrider.com/',
    embeddable: false,
    externalReason:
      "The creator's site blocks embedding, so this game opens on the original site in a new tab.",
    description:
      "Ride a bicycle through Van Gogh's Starry Night, collect orbs and carry them into the steeple; do tricks and fly.",
    howToPlay:
      'Ride your bicycle through Van Gogh’s Starry Night, collect orbs, and carry them into the steeple. Tap Space three times to fly.',
    about: [
      'Starry Nightrider is the most-loved game of the Fable 5.2 launch week: a bicycle ride through Van Gogh’s Starry Night, collecting orbs and carrying them into the steeple. Do tricks. Fly. It was built in 6–8 hours by Ebby Amir.',
      'The creator’s site blocks embedding, so the game opens on starrynightrider.com in a new tab. It is worth the click — few games on this page are as beautiful.',
    ],
    howItWasMade: {
      text: [
        'Ebby Amir built Starry Nightrider in 6–8 hours, according to the launch-week roundups — a single evening’s work that became one of the most-loved games of the Fable 5.2 launch week.',
      ],
    },
    icon: 'palette',
    gradient: 'sky',
  },
  {
    name: 'Mirror Earth',
    slug: 'mirror-earth',
    author: 'Matt Shumer',
    handle: '@mattshumer_',
    genre: 'Voxel Planet Sandbox',
    tool: 'Claude Fable 5.2',
    toolKey: 'fable52',
    section: 'fable',
    url: 'https://www.spawn.co/@mattshumer/earth?room=local',
    embeddable: false,
    externalReason:
      "The creator's site blocks embedding, so this game opens on the original site in a new tab.",
    description:
      'Play with the whole planet as a destructible voxel game world; in-game weather matches real Earth in real time.',
    howToPlay:
      'Sculpt and smash a whole voxel planet — dig, build, and reshape the world. In-game weather matches real Earth in real time.',
    about: [
      'Mirror Earth turns the whole planet into a destructible voxel game world. Dig through continents, reshape terrain, and watch the weather — in-game conditions match real Earth in real time.',
      'It is Matt Shumer’s second launch-week world, alongside the open-world city CROSSTOWN. The game runs on the Spawn platform, which only allows its own site to embed it, so it opens on spawn.co in a new tab.',
    ],
    icon: 'cube',
    gradient: 'emerald',
  },

  // ---------- More AI-built games ----------
  {
    name: 'World of ClaudeCraft',
    slug: 'world-of-claudecraft',
    author: 'levy-street',
    handle: '',
    genre: 'Browser MMORPG',
    tool: 'Claude Fable 5',
    toolKey: 'fable5',
    section: 'more',
    url: 'https://worldofclaudecraft.com/',
    embeddable: false,
    externalReason:
      "The game's own site blocks embedding, so it opens on the original site in a new tab.",
    description:
      'A classic-style browser MMORPG — nine classes, quests, dungeons, raids, and PvP in a shared world. The closest thing to a complete online game AI has built so far.',
    howToPlay:
      'Pick one of nine classes, create your character, and step into the shared world — take quests, run dungeons with other players, and test yourself in PvP.',
    about: [
      'World of ClaudeCraft is the most complete AI-built online game in this collection: a classic World of Warcraft-style browser MMORPG with nine classes, quests, dungeons, raids, PvP, and guilds — all in a shared world you can self-host. It was built with Claude Fable 5, with the first playable version made in about 48 hours in June 2026.',
      'The project is MIT open source and actively maintained, with more than 2,300 stars on GitHub — and it even supports training AI agents into the game. Note that the project also offers an optional crypto token; playing the game does not require it.',
    ],
    howItWasMade: {
      text: [
        'Levy Street, a Wellington AI engineering studio, set out to answer a simple question: could an AI coding model build a real, living game world in a single weekend? According to the studio, the first playable version took about 48 hours with Claude Fable 5 — the repository was created on June 10, 2026, and the game went public on June 12.',
        'The first commit, co-authored by Claude Fable 5, already contained a 16,589-line game: a Three.js client, an authoritative multiplayer server, and a headless environment for training agents. It picked up 406 GitHub stars on launch day. In a strange twist, the Fable 5 model that seeded the game was publicly available for just three days, June 9–12, and is now offline.',
      ],
    },
    icon: 'users',
    gradient: 'indigo',
    github: 'levy-street/world-of-claudecraft',
    license: 'MIT',
  },
  {
    name: 'Battle Drones',
    slug: 'battle-drones',
    author: 'Simon Willison',
    handle: '@simonw',
    genre: 'Browser RTS',
    tool: 'Claude Code / Opus 5.5',
    toolKey: 'opus55',
    section: 'more',
    url: 'https://simonw.github.io/battledrones/',
    embeddable: true,
    description:
      'A Command & Conquer-style browser RTS — command drone armies in multiplayer or AI battles on randomly generated maps.',
    howToPlay:
      'Build your base, raise a drone army, and destroy the enemy — play against the AI or take on other players on random maps.',
    about: [
      'Battle Drones is a Command & Conquer-style real-time strategy game that runs entirely in the browser: base building, drone armies, multiplayer and AI opponents, and randomly generated maps for every match.',
      'It was built by Simon Willison over 321 agent commits, mostly with Claude Code and Opus 5.5 — one of the longest sustained AI coding sessions behind any game here. The code is Apache 2.0 open source.',
    ],
    howItWasMade: {
      text: [
        'Simon Willison built Battle Drones over 321 commits, mostly with Claude Code and Opus 5.5, and wrote up the process on his blog in October 2026. The project’s README notes that the rest of the document after its opening was written by Claude itself.',
      ],
    },
    icon: 'map',
    gradient: 'emerald',
    github: 'simonw/battledrones',
    license: 'Apache 2.0',
  },
  {
    name: 'NeoMud',
    slug: 'neomud',
    author: 'roomsmith-games',
    handle: '',
    genre: 'Multiplayer Dungeon (MUD)',
    tool: 'Claude Code',
    toolKey: 'claude-code',
    section: 'more',
    url: 'https://neomud.app/',
    embeddable: true,
    description:
      'A 1990s-style MUD — a multiplayer dungeon with room maps and sprites, 100% vibe-coded with Claude Code.',
    howToPlay:
      "Explore the dungeon with text commands — move between rooms, fight monsters, and team up with other players. Type 'help' in game if you are new to MUDs.",
    about: [
      'NeoMud is a 1990s-style MUD brought back to life: a multiplayer dungeon you explore with text commands, now with room maps and sprites to go with the classic feel. It is 100% vibe-coded with Claude Code.',
      'If you have never played a MUD, this is a friendly way in — and if you grew up on them, it is a nostalgia trip with other real players in the dungeon alongside you.',
    ],
    howItWasMade: {
      text: [
        'NeoMud’s README describes it as “a love letter to the MUDs of the ’90s, built with modern tools and vibes. 100% vibe-coded with AI.” It launched on June 12, 2026 — four months to the day after the first commit.',
      ],
    },
    icon: 'terminal',
    gradient: 'slate',
    github: 'roomsmith-games/NeoMud',
  },
  {
    name: 'Three Kingdoms SLG',
    slug: 'three-kingdoms-slg',
    author: 'athlan20',
    handle: '',
    genre: 'Strategy Sandbox',
    tool: 'AI agents (Claude / GPT)',
    toolKey: 'agents',
    section: 'more',
    url: 'https://slg.yuntianyou.cc/',
    embeddable: true,
    description:
      'A classic Three Kingdoms strategy sandbox — play it yourself, or let an AI agent take the wheel. Chinese and English UI.',
    howToPlay:
      'Command your faction on the strategy map — expand, defend, and outmaneuver rival warlords. You can play by hand or hand control to an AI agent. The interface is available in Chinese and English and follows your browser language.',
    about: [
      'Three Kingdoms SLG (三国 SLG) is a classic Three Kingdoms strategy sandbox: factions, territory, and warlords on a shared map. It is designed so AI agents — Claude, GPT, and others — can operate it directly, so you can play it yourself or sit back and watch an agent run your faction.',
      'The game is MIT open source, and its interface is available in both Chinese and English — it follows your browser language and can be switched at any time.',
    ],
    howItWasMade: {
      text: [
        'Three Kingdoms SLG was built as a game for AI agents first: its README calls it “a web Three Kingdoms strategy game born for AI agents.” Agents connect over WebSocket with a token, play by the same protocol and server rules as humans — no backdoors, no shortcuts — and report their plans, battle commentary, and daily summaries while you are away.',
      ],
    },
    icon: 'chess',
    gradient: 'rose',
    github: 'athlan20/slg',
    license: 'MIT',
  },
  {
    name: 'Tiny Skies',
    slug: 'tiny-skies',
    author: '',
    handle: '',
    genre: 'Cozy Exploration',
    tool: 'Cursor',
    toolKey: 'cursor',
    section: 'more',
    url: 'https://tinyskies.vercel.app/',
    embeddable: true,
    description:
      'Cozy multiplayer exploration of a tiny world by biplane, magic carpet, or boat. Vibe Jam 2026 Most Polished award.',
    howToPlay:
      'Fly a biplane, ride a magic carpet, or sail a boat around a tiny world — alone or with other players. There is no rush; the world is the point.',
    about: [
      'Tiny Skies is a cozy multiplayer exploration game: a tiny world you cross by biplane, magic carpet, or boat, with other players drifting around alongside you. It won the Most Polished award at Vibe Jam 2026.',
      'Built with Cursor and Three.js, it is the calmest game in this collection — a good palate cleanser between the shooters and strategy games.',
    ],
    icon: 'cloud',
    gradient: 'cyan',
  },
  {
    name: 'Bash Fighter',
    slug: 'bash-fighter',
    author: '',
    handle: '',
    genre: 'Platform Fighter',
    tool: 'Claude',
    toolKey: 'claude',
    section: 'more',
    url: 'https://bashfighter.com/',
    embeddable: true,
    description:
      'Smash-style platform fighter where up to 20 players and bots knock each other off one arena, on phone or desktop.',
    howToPlay:
      'Knock your rivals off the arena — up to 20 players and bots in one match, on phone or desktop. Last one standing wins.',
    about: [
      'Bash Fighter is a Smash-style platform fighter: up to 20 players and bots brawling on a single arena, trying to knock each other off the edge. It works on phone or desktop, and it is open source.',
      'The game was built and run end to end by an AI agent, with Claude and PixiJS. Chaotic with a full lobby — and that is the point.',
    ],
    icon: 'bolt',
    gradient: 'amber',
  },
  {
    name: "Fanto's Mega-Mart",
    slug: 'fantos-mega-mart',
    author: '',
    handle: '',
    genre: 'Multiplayer Shopping Race',
    tool: 'Codex',
    toolKey: 'codex',
    section: 'more',
    url: 'https://fantos-megamart.vercel.app/',
    embeddable: true,
    description:
      'Multiplayer shopping race at rocket speed through a haunted grocery store, with ghost replays. Vibe Jam 2026 2nd place.',
    howToPlay:
      'Race through a haunted grocery store at rocket speed, grabbing what you need before your rivals do. Ghost replays let you chase your own best run.',
    about: [
      "Fanto's Mega-Mart is a multiplayer shopping race through a haunted grocery store — rocket-speed aisles, ghost replays, and rivals everywhere. It took 2nd place at Vibe Jam 2026.",
      'Built with Codex and Three.js, it is one of the silliest premises in this collection — and one of the most fun to actually play.',
    ],
    icon: 'shopping-cart',
    gradient: 'lime',
  },
  {
    name: 'The Great Taxi Assignment',
    slug: 'the-great-taxi-assignment',
    author: '',
    handle: '',
    genre: 'Taxi Driving',
    tool: 'Cursor + Claude 3.7 Sonnet',
    toolKey: 'cursor-claude',
    section: 'more',
    url: 'https://great-taxi-assignment.netlify.app/',
    embeddable: true,
    description:
      'GTA-style taxi game where you ferry passengers across a 3D city before time runs out. Vibe Jam 2025 winner.',
    howToPlay:
      'Pick up passengers and ferry them across a 3D city before time runs out. Drive fast, but not so fast you miss the fare.',
    about: [
      'The Great Taxi Assignment is a GTA-style taxi game: ferry passengers across a 3D city against the clock. It won Vibe Jam 2025, and it is still one of the most replayable games in this collection — every fare is a small race of its own.',
      'It was built with Cursor and Claude 3.7 Sonnet, on Three.js. A good pick if you like driving games with a job to do.',
    ],
    icon: 'route',
    gradient: 'sky',
  },
];

export function getGame(slug: string): FableGame | undefined {
  return fableGames.find((g) => g.slug === slug);
}

export function getRelated(game: FableGame, count = 3): FableGame[] {
  const same = fableGames.filter((g) => g.section === game.section && g.slug !== game.slug);
  const other = fableGames.filter((g) => g.section !== game.section);
  return [...same, ...other].slice(0, count);
}

export const fableSection = fableGames.filter((g) => g.section === 'fable');
export const moreSection = fableGames.filter((g) => g.section === 'more');
