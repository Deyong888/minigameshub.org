---
publishDate: 2026-10-27T00:00:00Z
title: "Switch Games Natively on iPhone: How nxnative and D2R Mobile Work"
excerpt: "An open-source project called nxnative now runs your own Nintendo Switch games natively on iPhone — no emulator, no cloud. It builds on the same approach as D2R Mobile, which already runs Diablo II: Resurrected at 60 fps on phones. Here is how both work, what you need, and the honest catches."
category: Browser Games
tags:
  - switch games on iphone
  - nxnative
  - diablo 2 resurrected mobile
  - d2r mobile
  - mobile games
  - nintendo switch
metadata:
  title: "Switch Games Natively on iPhone: nxnative and D2R Mobile Explained | MiniGamesHub"
  description: "nxnative turns your own Nintendo Switch games into native iPhone apps — no emulator, no streaming. How it works, the 80 tested games, requirements, and how D2R Mobile proved the idea first."
---

Tears of the Kingdom on an iPhone home screen, as its own app, with its own icon. Mario Kart 8 Deluxe, Super Mario Odyssey, Metroid Dread — running on Apple hardware, not streamed from a server, not emulated. That is what an open-source project called **nxnative** does, and in the two weeks since it appeared it has picked up about 7,100 GitHub stars (as of October 27, 2026) and a tested-games list that already runs to 80 titles.

The headline is not just that it works. It is *how* it works — and the fact that the idea was already proven by a single game first. D2R Mobile, the project that runs Diablo II: Resurrected natively on phones, is the direct ancestor: nxnative's own README says it started as a copy of D2R Mobile's generic parts. This guide explains both, in one place.

**TL;DR**

- **nxnative is a compatibility layer, not an emulator.** Your own Switch game files are repackaged into an iPhone app; the game's own ARM64 code runs directly on the Apple chip, with Switch graphics rebuilt on Metal.
- **80 games tested so far** (per the project's README, October 27, 2026), including Mario Kart 8 Deluxe, The Legend of Zelda: Tears of the Kingdom (60 fps with update 1.4.3), Breath of the Wild (60 fps with 1.9.0), Super Mario Odyssey, Metroid Dread, Super Smash Bros. Ultimate and Monster Hunter Rise. The list grows almost daily, so check the README for the current count.
- **You must own the games.** You supply files from your own Switch copies plus your own console keys. The project contains no game content, and neither does this site — we do not link to game file downloads.
- **The hardware bar is high:** iOS / iPadOS 26 or later, an iPhone 15 Pro or newer (A17 Pro chip or later), or an iPad with an M1 chip or later. A Mac with Xcode is needed to build the app, which you then sideload.
- **D2R Mobile proved this approach first** — our [full D2R Mobile guide](https://minigameshub.org/how-to-play-diablo-2-resurrected-on-mobile) covers a single game running natively at a measured 60 fps on an iPhone 17 Pro Max. If you want one game working today rather than a whole library, start there.

Not ready for a project this size? You can still play right now with <a href="https://minigameshub.org/">free browser games</a> that need no setup at all — and come back here when you are ready for the real thing.

## What Is nxnative?

nxnative ([seedds/nxnative on GitHub](https://github.com/seedds/nxnative)) takes a folder of your own Nintendo Switch game files (NSP format) and turns it into an unsigned IPA — an iPhone app you sideload. Each game becomes its own app on your home screen.

The key sentence from the project: *"It is not an emulator: the game's own code runs directly on the Apple chip, with Switch graphics rebuilt on Metal."* Nothing from any game is in the repository, and the project is not affiliated with Nintendo or any game publisher.

Why it works at all comes down to the chips. The Nintendo Switch and modern Apple devices both run on ARM processors, so a Switch game's instructions are already compatible with an iPhone's chip. On a PC, a port would first have to translate the code; on an iPhone, that step mostly disappears. Only the Nintendo-specific parts need replacing.

## How It Actually Works (the Short Version)

Three pieces do the work:

1. **An NSO rewriter** — rewrites the small number of instructions in the game's program that cannot run unchanged under Apple's kernel. Everything else in the program executes exactly as it shipped.
2. **A Horizon host** — a small program that stands in for the Switch's operating system, providing the system calls, file system, audio and input services the game expects.
3. **NVN-to-Metal graphics** — the game's graphics API is reimplemented from scratch on Apple's Metal. Shaders are translated ahead of time using components from the Ryujinx project, so nothing compiles mid-game.

That is the same recipe D2R Mobile used for Diablo II: Resurrected, and nxnative's README credits it directly: D2R Mobile (MIT) "developed this native-execution approach," and nxnative started as a copy of its generic parts — the NSO rewriter, the host, the NVN-on-Metal layer and the iOS app shell — with fixes flowing both ways.

## D2R Mobile: the Proof It Works

D2R Mobile matters here because it is the same idea, already running, with measured numbers instead of promises. It runs the Switch version of Diablo II: Resurrected (with the Reign of the Warlock expansion) natively on iPhone, iPad and Android. Our [complete D2R Mobile guide](https://minigameshub.org/how-to-play-diablo-2-resurrected-on-mobile) walks through the full setup; the headline figures, all the project's own on-device measurements, are:

- **60 fps, steady**, on an iPhone 17 Pro Max, with whole-device power draw of about 3.8 W — roughly 5 hours of play per charge.
- **44 iPhones and iPads** in the closed test group all finished Normal, Nightmare and Hell. The weakest device, an iPhone 14 Pro Max (A16), held a flawless 60 fps once the Legacy texture pack was applied.
- On Android, a Redmi K50 Ultra (Snapdragon 8+ Gen 1) ran at a **median 60 fps**.

The pattern is the same in both projects: ARM code runs directly, the platform layer is rebuilt, and the performance follows. The difference is scope — D2R Mobile is one game, done deeply; nxnative is the general route, applied to a whole library.

## Native vs Streaming vs Emulator: Three Different Things

| | Native layer (nxnative / D2R Mobile) | Streaming (Steam Link / GeForce NOW) | Emulator |
|---|---|---|---|
| What runs where | The real game, on your phone | The game on a PC or cloud server, video sent to your phone | The game inside a virtual console, on your phone |
| Internet needed | No — fully offline once installed | Yes, fast and stable | No |
| Input | Touch controls or controller, per game | Controller or generic touch overlay | Controller or touch overlay |
| What you need to own | Your own Switch copy of each game | The game on PC (and your PC on, for Steam Link) | Your own game files |
| Performance | Native speed; some games jump from 30 to 60 fps | Depends on your connection | Slower — the CPU itself is being simulated |

If what you want is *your* game running on your phone with no connection, the native route is the only one that delivers it. Streaming works with zero setup, and emulation covers more devices — they are just different trade-offs.

## What You Need Before You Start (nxnative)

- **Your own Switch games, and your own console keys.** The project takes NSP files from copies you own, plus the `prod.keys` from your own console. It distributes no game content. We do not link to game file downloads either — only to the project's own repository.
- **A Mac with Xcode and Homebrew** to run the build. The project's README gives the exact commands: clone the repository, install the build tools, then run the pack script against your game folder. The first build alone can take up to about an hour, according to early reports.
- **A recent Apple device:** iOS / iPadOS 26 or later, iPhone 15 Pro or newer (A17 Pro or later), or an iPad with an M1 chip or later. The bar is higher than D2R Mobile's (A14 and up), because Switch games use BC-compressed textures that older iPhones cannot read.
- **Patience for sideloading.** The output is an unsigned IPA you install yourself. With a free Apple ID, expect to re-sign every 7 days — the same limit D2R Mobile users already know.

The most likely place to get stuck is the build environment: getting Xcode, the tools and the game files all in the right place on the Mac. Once the IPA exists, installing it is the easy part.

For the single-game route instead, D2R Mobile's setup is documented step by step in our [D2R Mobile guide](https://minigameshub.org/how-to-play-diablo-2-resurrected-on-mobile) — including a no-Mac route and the Android version, which nxnative does not have.

## The Honest Catches

- **Compatibility varies by game.** The README lists 80 tested titles, but "tested" does not mean flawless — per-game notes track progress and known issues, and some games need a specific update to reach 60 fps (Tears of the Kingdom needs 1.4.3; Breath of the Wild needs 1.9.0). Other games are not supported yet; the script still tries to pack them, but the result may not start.
- **These are big apps.** Tears of the Kingdom is about 17 GB, Breath of the Wild about 16 GB, Smash Ultimate about 17.5 GB. Budget storage accordingly.
- **Single-player, offline.** Like D2R Mobile, there is no online multiplayer here — these are your games, running locally.
- **Performance figures are the projects' own measurements, not ours.** We have not run these games on our own devices. Treat the 60 fps notes as the projects' reports from their test setups.
- **It is early.** The project is weeks old and moving fast: the game list, the star count and the requirements may all have changed since this article was written. Check the [nxnative README](https://github.com/seedds/nxnative) for the current state before you start.

> **The legality bit, plainly:** you must own legitimate copies of the games you run. nxnative is an independent, non-commercial open-source project; it provides tools only, distributes no game content, and does not endorse anyone who does. MiniGamesHub does not provide or link to game file downloads either. Use only files from copies you own.

## FAQ

### Is nxnative an emulator?

No. The Switch build of a game is ARM code, phones run ARM processors, and the original program executes directly on the device — only a few instructions that clash with the phone's kernel are rewritten, and the graphics are rebuilt natively on Metal. Nothing is emulated at the CPU level, and nothing is streamed from another machine.

### Do I need to own the games?

Yes — your own Nintendo Switch copies, plus the keys from your own console. The project ships no game content at all. Neither the project nor this site provides game file downloads.

### Will it run on my iPhone 14?

No — nxnative needs an iPhone 15 Pro or newer (A17 Pro or later) on iOS 26, or an M1 iPad or later. The cutoff is the BC texture format. D2R Mobile is more forgiving (A14 and up) — see our [D2R Mobile guide](https://minigameshub.org/how-to-play-diablo-2-resurrected-on-mobile) if your phone is older.

### Is Tears of the Kingdom really 60 fps on iPhone?

That is what the project's tested-games list reports — 60 fps with game update 1.4.3. It is the project's measurement, not ours, and it needs that specific update. The Switch itself caps the game at 30 fps.

### Is there an Android version?

Not for nxnative — it is Apple devices only. D2R Mobile does have an Android version, covered in our [D2R Mobile guide](https://minigameshub.org/how-to-play-diablo-2-resurrected-on-mobile).

### What does it cost?

The compatibility layer itself is free and open source. The games are not — you bring your own legally owned copies. On iOS, signing with a free Apple ID works, with the 7-day re-sign catch described above.

## The Bottom Line

Two weeks ago, "Switch games on iPhone" meant an emulator or a stream. nxnative is the first time it means the actual games — your Switch copies, running natively in your pocket, offline, some of them faster than on the Switch itself. The price of admission is real: you need the games, a recent iPhone or iPad, a Mac to build with, and an evening's worth of setup patience. If you have all four, there is currently nothing else like it — and if you want to see the idea working in one game first, D2R Mobile is the proof, documented step by step in our [D2R Mobile guide](https://minigameshub.org/how-to-play-diablo-2-resurrected-on-mobile).

While your first build runs — or if your phone is a generation too old — the itch can still be scratched in seconds: try our <a href="https://minigameshub.org/">free browser games</a>, including <a href="https://minigameshub.org/category/rpg">RPG browser games</a> that run instantly with no downloads, no sign-ups and nothing to sign, re-sign or recompile.

*MiniGamesHub is an unofficial fan site and is not affiliated with Nintendo. Nintendo Switch, The Legend of Zelda, Mario Kart, Super Mario and Metroid are trademarks of Nintendo. Diablo and Diablo II: Resurrected are trademarks of Blizzard Entertainment, Inc. nxnative and D2R Mobile are independent open-source projects; this guide is provided for players who own legitimate copies of the games.*
