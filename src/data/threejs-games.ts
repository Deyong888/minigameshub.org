// Curated Three.js 3D browser games for the Three.js topic hub.
// Sources: threejs.cc/topic/3d-games/ (parsed 2026-11-16). URLs copied
// verbatim from that page — never guess or reconstruct a URL.
//
// Every game here was verified live on 2026-11-16: origin HTTP 200 with no
// X-Frame-Options / CSP frame-ancestors blocking, and its cover poster 200
// (hotlinked from threejs.cc, verified with a minigameshub.org Referer).
// Games blocked from embedding (Tokyo Drift, Astral War, all wavedash.com
// titles) were excluded, not linked out.
//
// Covers are screenshots hosted by threejs.cc; games are hosted by their
// own creators. We do not own these games or claim credit for them.

import type { FableGame } from './fable-games';

export type ThreeJsGame = FableGame;

export const threeJsGames: ThreeJsGame[] = [
  {
    name: 'Wok-ing Dead',
    slug: 'wok-ing-dead',
    author: 'Dash',
    handle: '',
    genre: 'Action',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://wok.huang.co/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/wok-ing-dead-fable-52.webp',
    description:
      'Cook takeout orders in a rainy Chinatown night market while zombies close in. Finish three orders, take down the boss, and get out alive.',
    howToPlay:
      'Work the wok to complete takeout orders while fighting off waves of zombies. Finish all three orders, defeat the boss, and escape the night market.',
    about: [
      'Wok-ing Dead is a cooking game crossed with a zombie shooter — and it works better than it has any right to. You run a night-market stall in a rainy Chinatown, frying up takeout orders while the undead shuffle in from the dark. Every order you finish is a small victory; every zombie you drop buys you another few seconds at the stove.',
      'The game is a playful rework of the Saltline shooter demo, rebuilt around a wok instead of a rifle. It keeps the first-person action but swaps the container port for steam, neon, and the smell of stir-fry. Finish three orders, beat the boss, and make your escape.',
    ],
    icon: 'chef-hat',
    gradient: 'amber',
  },
  {
    name: 'Morro Abaixo',
    slug: 'morro-abaixo',
    author: '',
    handle: '',
    genre: 'Racing',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://ulam.ai/fable52-downhill',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/morro-abaixo-fable-52.webp',
    description:
      'Ride a BMX down a blocky hillside town all the way to the beach, jumping barriers and gaps on the way down.',
    howToPlay:
      'Steer your BMX downhill, jump over barriers and gaps, and ride the fastest line from the hilltop to the beach.',
    about: [
      'Morro Abaixo is a downhill BMX run through a voxel hillside town. The course drops from the rooftops to the sand in one long, fast descent, with barriers and gaps placed exactly where you least want them.',
      'It is a short game with a simple hook: find the fastest line down. The blocky town, the ocean at the bottom, and the speed of the descent make every run feel like a small vacation that ends in a crash or a clean landing.',
    ],
    icon: 'bike',
    gradient: 'lime',
  },
  {
    name: 'Dread & District',
    slug: 'dread-and-district',
    author: '',
    handle: '',
    genre: 'Strategy',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://dread-and-district.netlify.app/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/dread-district-fable-52.webp',
    description:
      'Plan transit lines between fantasy towns and keep passengers moving — even when dragons make a mess of the schedule.',
    howToPlay:
      'Draw transit routes between towns, connect passengers to their destinations, and reroute around dragon-caused disruptions.',
    about: [
      'Dread & District is a transit-planning game with a fantasy twist: you run the transport network for a cluster of towns, and the biggest threat to your timetable is dragons. Draw the lines, move the passengers, and keep the whole district running.',
      'It plays like a cozy management game until a dragon shows up — then it becomes a rerouting puzzle. A good pick if you like Mini Motorways-style planning with a sense of humor.',
    ],
    icon: 'bus',
    gradient: 'emerald',
  },
  {
    name: 'Yard Clash',
    slug: 'yard-clash',
    author: '',
    handle: '',
    genre: 'Sports',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://yardclash.vercel.app/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/yard-clash-fable-52.webp',
    description:
      'Seven-on-seven street American football. Train solo, take on the computer, or clash with friends online.',
    howToPlay:
      'Run plays, pass, and tackle in fast 7v7 street football. Start with solo training, then challenge the computer or play friends online.',
    about: [
      'Yard Clash brings American football to the street: seven players a side, no pads, no stadium — just a yard, a ball, and a lot of running. The smaller teams make every play matter, and games stay fast from kickoff to the final whistle.',
      'You can train on your own, play against the computer, or take the game online against friends. It is the most complete football game in this collection, and the only one where the crowd is the neighborhood.',
    ],
    icon: 'ball-american-football',
    gradient: 'sky',
  },
  {
    name: 'Graveyard Shift',
    slug: 'graveyard-shift',
    author: '',
    handle: '',
    genre: 'Action',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://zombies.ethanplus.ai/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/graveyard-shift-fable-52.webp',
    description:
      'Hold a lonely highway gas station through the night as waves of zombies roll in. Survive until sunrise.',
    howToPlay:
      'Defend the gas station from wave after wave of zombies. Aim, shoot, and keep the horde from overrunning your post.',
    about: [
      'Graveyard Shift is a wave-defense shooter set at the worst possible workplace: a gas station on a dark highway, at night, during a zombie outbreak. The waves keep coming, the ammo does not, and the only thing between you and the horde is a counter and a flashlight.',
      'It is a simple loop done well — aim, shoot, reload, survive — with the tension of a night shift that never seems to end. How many waves can you hold?',
    ],
    icon: 'gas-station',
    gradient: 'slate',
  },
  {
    name: 'Save the World',
    slug: 'save-the-world',
    author: '',
    handle: '',
    genre: 'Action',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://save-the-world-fable.vercel.app/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/save-the-world-fable-52.webp',
    description:
      'Run rescue missions through city streets — reach people in trouble and get them out safely.',
    howToPlay:
      'Move through the streets and complete rescue objectives. Follow the on-screen guidance to reach each person in need.',
    about: [
      'Save the World trades shooting for saving: you move through city streets on rescue missions, reaching people in trouble and getting them out safely. It is an action game where the win condition is helping, not hitting.',
      'The street-level setting and mission structure make it a gentle entry point to this collection — no twitch reflexes required, just a clear head and a quick route.',
    ],
    icon: 'lifebuoy',
    gradient: 'cyan',
  },
  {
    name: 'Cozy Lisbon',
    slug: 'cozy-lisbon',
    author: '',
    handle: '',
    genre: 'Flying',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://cozylisbon.vercel.app/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/cozy-lisbon-fable-52.webp',
    description:
      'Fly a little plane over Lisbon at golden hour and collect postcards scattered across the city. No timers, no enemies — just flying.',
    howToPlay:
      'Pilot your plane over Lisbon and collect every postcard. Fly low over landmarks and enjoy the view.',
    about: [
      'Cozy Lisbon is a flying game with no fail state: a small plane, a golden-hour city, and postcards to collect. There is nothing chasing you and nothing to beat — the game is the flying itself, and Lisbon from the air.',
      'It is the calmest game in this collection, and a good palate cleanser between the racers and shooters. Take the slow route; the postcards are not going anywhere.',
    ],
    icon: 'plane',
    gradient: 'fuchsia',
  },
  {
    name: 'Backrooms: Dimension 9',
    slug: 'backrooms-dimension-9',
    author: '',
    handle: '',
    genre: 'Horror',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://dimension9.space/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/dimension9-space.webp',
    description:
      'A first-person horror exploration of the shifting Backrooms. Map the endless yellow halls with a flashlight and scanner — alone, or with friends and proximity voice chat.',
    howToPlay:
      'Explore the ever-changing Backrooms with your flashlight, scanner, and map. Find your way through Dimension 9 — and watch for what else is in there with you. Multiplayer and proximity voice chat are supported.',
    about: [
      'Backrooms: Dimension 9 drops you into the internet’s most unsettling liminal space: endless yellow halls, humming lights, and rooms that rearrange when you are not looking. Your tools are a flashlight, a scanner, and a map — and your nerve.',
      'The game supports multiplayer with proximity voice chat, so you can explore with friends and hear each other only when you are close. That makes it scarier, not safer. Headphones recommended, lights on optional.',
    ],
    icon: 'ghost',
    gradient: 'amber',
  },
  {
    name: 'FormulaZero',
    slug: 'formulazero',
    author: '',
    handle: '',
    genre: 'Racing',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://playformula0.com/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/playformula0-com.webp',
    description:
      'Time-attack racing in a hybrid formula car. Manage your energy, nail every corner, and chase the global leaderboard — keyboard or gamepad.',
    howToPlay:
      'Drive time-attack laps in a hybrid formula car, managing energy through each corner. Beat your best lap and climb the global leaderboard.',
    about: [
      'FormulaZero is a time-attack racer with a twist: your formula car is a hybrid, so every lap is a balancing act between speed and energy. Push too hard and you run dry before the finish; hold back too much and the leaderboard leaves you behind.',
      'With global leaderboards and gamepad support, it is the most competitive racer in this collection — and the one most likely to eat an afternoon one more lap at a time.',
    ],
    icon: 'gauge',
    gradient: 'rose',
  },
  {
    name: 'Doodle Shooter',
    slug: 'doodle-shooter',
    author: '',
    handle: '',
    genre: 'Action',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://doodleshooter.vercel.app/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/clear-6a0a54e84cd14f-226557bcb1.webp',
    description:
      'A hand-drawn action game where you swing through the district on a grappling hook, jumping and shooting in sketchy line art.',
    howToPlay:
      'Swing with the grappling hook, jump between rooftops, and shoot your way through the district. Full keyboard, mouse, and gamepad controls are listed on the game page.',
    about: [
      'Doodle Shooter looks like it was sketched in a notebook during class — hand-drawn lines, wobbly buildings, and a hero who swings through it all on a grappling hook. The art style is the joke, but the movement is the game: swinging, jumping, and shooting flow together fast.',
      'It supports keyboard and mouse as well as gamepad, with the controls listed on the game’s own page. A short, stylish action game that does not take itself seriously at all.',
    ],
    icon: 'brush',
    gradient: 'violet',
  },
  {
    name: 'HexGL',
    slug: 'hexgl',
    author: 'Thibaut Despoulain',
    handle: '',
    genre: 'Racing',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://hexgl.bkcore.com/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/hexgl-bkcore-com.jpg',
    description:
      'The classic browser anti-gravity racer. Pilot a futuristic ship through tunnel circuits at breakneck speed — the Three.js game that set the standard.',
    howToPlay:
      'Race your anti-gravity ship through tunnel circuits. Steer with the arrow keys or A/D, boost on the straights, and beat the clock.',
    about: [
      'HexGL is the game that showed the web what Three.js could do: a full anti-gravity racer running in the browser, with tunnel circuits, speed boosts, and a sense of velocity that still holds up years later. It is the benchmark every browser racer since has been measured against.',
      'By Thibaut Despoulain, HexGL is the oldest game in this collection — and still one of the fastest. If you only play one racer here, make it this one.',
    ],
    icon: 'rocket',
    gradient: 'indigo',
  },
  {
    name: 'putt.day',
    slug: 'putt-day',
    author: '',
    handle: '',
    genre: 'Sports',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://putt.day/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/clear-af2978af5304c5-ba0fe26d1e.webp',
    description:
      'A new mini-golf hole every day, the same for everyone. Drag to charge your putt, release, and sink it in as few strokes as you can.',
    howToPlay:
      'Drag the ball back to charge your shot and release to putt. One new hole drops daily — clear it in as few strokes as possible.',
    about: [
      'putt.day is daily mini-golf: one new hole every day, the same hole for every player in the world. The low-poly floating-island courses mix ramps, slopes, and obstacles, so each day’s hole is a small puzzle as much as a putting challenge.',
      'Because everyone plays the same hole, it is made for comparing scores with friends. Come back tomorrow — there will be a new one waiting.',
    ],
    icon: 'golf',
    gradient: 'lime',
  },
  {
    name: 'GameBlocks Tower Defense',
    slug: 'gameblocks-tower-defense',
    author: '',
    handle: '',
    genre: 'Tower Defense',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://gb-tower-defense.vercel.app/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/clear-322753a87f8539-05096c3c65.webp',
    description:
      'Place towers along a winding path and hold the line as waves of enemies push through. A clean, classic tower defense in 3D.',
    howToPlay:
      'Place towers along the enemy path and upgrade them between waves. Stop every unit before it reaches the end of the line.',
    about: [
      'GameBlocks Tower Defense is the genre in its purest form: a winding path, a set of towers, and waves of enemies testing your layout. Place well, upgrade smart, and watch the path do the rest.',
      'Part of the GameBlocks series of small 3D games, it is a tidy, no-nonsense tower defense — easy to start, and just hard enough to make you rethink your placements.',
    ],
    icon: 'building-castle',
    gradient: 'slate',
  },
  {
    name: 'SURVIVE 10 WAVES',
    slug: 'survive-10-waves',
    author: '',
    handle: '',
    genre: 'Action',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://www.survive10waves.com/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/clear-77c0ed236928f9-ed0c4d7654.webp',
    description:
      'A top-down survival shooter in a shrinking arena. Hold off ten waves, spend your earnings on better gear, and stay alive.',
    howToPlay:
      'Fight off waves of enemies in an arena that keeps shrinking. Spend what you earn on upgrades between waves and survive all ten.',
    about: [
      'SURVIVE 10 WAVES tells you the whole deal in the name: ten waves, one shrinking arena, and whatever gear you can afford between rounds. The shrinking space keeps the pressure rising — there is nowhere to run by wave eight.',
      'The upgrade loop is the hook: every kill earns the gear that keeps you alive for the next wave. Ten waves sounds short. It is not.',
    ],
    icon: 'swords',
    gradient: 'rose',
  },
  {
    name: 'Starship Dogfight',
    slug: 'starship-dogfight',
    author: '',
    handle: '',
    genre: 'Action',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://starshipdogfight.netlify.app/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/clear-874b3355a5fe8a-b465189f90.webp',
    description:
      'Dogfight through colorful nebulae, asteroid fields, and ringed planets. Chain combos, ride out the waves, and keep your shields up.',
    howToPlay:
      'Pilot your starship through asteroid fields and nebulae, chaining combo kills across waves. Watch your shields — and the rocks.',
    about: [
      'Starship Dogfight is a 3D space combat game set in some of the prettiest scenery in this collection: colorful nebulae, drifting asteroids, and ringed planets sliding past while you fight. The HUD tracks your combos, waves, and shields as the action heats up.',
      'It is an arcade space shooter first and a screensaver second — fast, bright, and easy to lose twenty minutes to.',
    ],
    icon: 'planet',
    gradient: 'indigo',
  },
  {
    name: 'Dustfall',
    slug: 'dustfall',
    author: '',
    handle: '',
    genre: 'RPG',
    tool: 'Three.js',
    toolKey: 'threejs',
    section: 'threejs',
    url: 'https://dustfalls.netlify.app/',
    embeddable: true,
    cover: 'https://threejs.cc/assets/posters/dustfall-fable-52.webp',
    description:
      'Ride horseback through a dusty western town and its ranches, with story scenes and gunfights along the trail.',
    howToPlay:
      'Ride through the western town and ranch country on horseback. Follow the story, explore the town, and be ready for a gunfight.',
    about: [
      'Dustfall is a western on horseback: a dusty town, open ranch country, and a story told in scenes and gunfights along the trail. The riding itself is the pleasure — slow, open, and sun-bleached.',
      'It is the most story-driven game in this collection, and the only one where the best move is sometimes just to ride and look around.',
    ],
    icon: 'horse',
    gradient: 'amber',
  },
];

export function getThreeJsGame(slug: string): ThreeJsGame | undefined {
  return threeJsGames.find((g) => g.slug === slug);
}

export function getThreeJsRelated(game: ThreeJsGame, count = 3): ThreeJsGame[] {
  const sameGenre = threeJsGames.filter((g) => g.genre === game.genre && g.slug !== game.slug);
  const other = threeJsGames.filter((g) => g.genre !== game.genre);
  return [...sameGenre, ...other].slice(0, count);
}
