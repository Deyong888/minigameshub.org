---
publishDate: 2026-10-24T00:00:00Z
title: How to Play Diablo 2: Resurrected Natively on iPhone & Android
excerpt: There is no official D2R mobile app — but an open-source compatibility layer called D2R Mobile runs your own Switch copy of Diablo II: Resurrected natively on iPhone, iPad and Android at 60 fps. Here's what you need and exactly how to set it up.
image: https://github.com/jhaizhou-ops/d2r-mobile/releases/download/assets/hero_en.jpg
category: Browser Games
tags:
  - diablo 2 resurrected
  - diablo 2 mobile
  - d2r mobile
  - mobile games
  - action rpg
metadata:
  title: Diablo 2: Resurrected on Mobile — Native iPhone & Android Guide
  description: Play Diablo 2: Resurrected natively on iPhone and Android with the open-source D2R Mobile layer — no streaming, no emulator. Requirements, iOS and Android setup steps, performance, controller support and fixes.
---

Every guide to "Diablo 2: Resurrected on mobile" used to give you the same disappointing answer: there is no mobile app, so stream it from a PC and live with the lag. That changed in October 2026. An open-source project called **D2R Mobile** now runs Diablo II: Resurrected *natively* on iPhone, iPad and Android — the actual game code, executing on your phone, fully offline, with touch controls built for it and a measured 60 fps on modern hardware.

No cloud, no emulator, no subscription. The catch — and there is one — is that you have to bring your own game: the Nintendo Switch copy you bought, expansion included. This guide walks through exactly what you need, the setup for iOS and Android, how well it really runs, and how to fix the problems most people hit.

**TL;DR**

- **Yes, D2R runs natively on phones now.** D2R Mobile is a free, open-source compatibility layer (MIT license) on GitHub that runs the Switch version of Diablo II: Resurrected — with the Reign of the Warlock expansion — directly on iPhone, iPad and Android.
- **It is the real game, not a port or a stream.** Your own game files execute on the device itself. Every class, Runeword, Terror Zone and drop rule is identical to the original — because it *is* the original program.
- **You must own the game.** The project contains and distributes zero game content. You supply files from your own Switch copy, updated to version 1.0.34.0. We don't link to game file downloads, and neither does the project.
- **Hardware bar:** iPhone/iPad with an A14 chip or later (smoothest on iPhone 15 Pro and up); Android phones with ARM64, Android 12+ and a Vulkan 1.1 GPU.
- **The honest catches:** it's offline-only (no multiplayer), and on iOS you build and sign the app yourself — a free Apple ID works, but the app must be re-signed every 7 days.

Not ready for a project this size? You can still scratch the dungeon-crawler itch in ten seconds with <a href="https://minigameshub.org/">free browser games</a> that need no setup at all — and come back here when you're ready for the real thing.

<img src="https://github.com/jhaizhou-ops/d2r-mobile/releases/download/assets/hero_en.jpg" alt="Diablo II: Resurrected running natively in full screen on an iPhone with D2R Mobile" loading="lazy" style="width:100%;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.15);margin:1rem 0" />

## What Is D2R Mobile? (And What It Isn't)

D2R Mobile is a **compatibility layer**, and that phrase matters. The Nintendo Switch version of Diablo II: Resurrected is an ARM program — and your phone is an ARM machine too. So instead of emulating a foreign processor, the layer lets the game's own code execute directly on your device. Only the handful of instructions that can't run unchanged under Apple's or Android's kernel are rewritten; every other byte of the program stays exactly as it shipped.

Around that program, the project provides the platform services the game expects — system calls, file system, audio, input — and reimplements the game's graphics API from scratch: on **Metal** for Apple devices, on **Vulkan** for Android. The game's shaders are translated offline ahead of time, so nothing compiles mid-game when you walk into a new area. That's the whole trick behind the speed numbers you'll see below.

Just as important is what it is **not**:

- **Not an emulator.** No CPU emulation anywhere in the chain.
- **Not cloud gaming or streaming.** Nothing runs on a server; the game is on your phone and works in airplane mode.
- **Not a source of game content.** There is no game program, art, text or data in the repository. All of it is generated on your own machine, from your own files.
- **Not online.** There is no multiplayer and no Battle.net. The game runs fully offline and needs no account.

## Native vs Streaming vs Diablo Immortal: Three Different Things Called "Diablo on Mobile"

Players searching for Diablo on a phone are usually offered three very different things. Here's how they actually compare:

| | D2R Mobile (native) | Streaming (Steam Link / GeForce NOW) | Diablo Immortal |
|---|---|---|---|
| What runs where | The real D2R, on your phone | D2R on a PC or cloud server, video sent to your phone | A separate game built for mobile |
| Internet needed | No — fully offline | Yes, fast and stable | Yes |
| Input | Touch controls rebuilt for this game + full controller support | Controller or generic touch overlay | Touch, designed for phones |
| What you need to own | D2R on Switch, incl. Reign of the Warlock | D2R on PC (and your PC on, for Steam Link) | Nothing — free to play |
| The game itself | The exact Switch build of D2R | The exact PC build of D2R | A different game, with its own systems |

If what you want is *your* Diablo II — your characters, the real loot rules, no connection required — the native route is the only one that delivers it. If you want zero setup, streaming works, and Immortal is a fine game in its own right; they're just not this game. And if you'd rather play something Diablo-flavored *right now* with no installs at all, there are <a href="https://minigameshub.org/category/rpg">free action RPG games that run right in your browser</a> while you decide.

## What You Need Before You Start

Work through this checklist first — every failed install we've seen traced back to one of these boxes being empty.

- **Your own Switch copy of Diablo II: Resurrected, including the Reign of the Warlock expansion.** It has to be the Switch version — that's the build the layer runs. The game must be updated to **Switch version 1.0.34.0** (which corresponds to PC version 3.3.94012): the project's tools accept only that version by default. Running without the expansion is not supported and hasn't been verified.
- **The game files, prepared from your own copy.** The project's `docs/GAME_FILES.md` spells out which files you need, how to get them from your own console, and where they go. Plan on roughly **5.6 GB** of game resources living on your phone, plus a small app package (a little over 100 MB).
- **A computer.** An Apple silicon Mac for the main iPhone/iPad route; any Windows, Linux or Mac computer for making the Android pack or for the no-Mac iPhone route.
- **For iOS, an Apple ID for signing.** A paid developer account gives you everything. A free Apple ID works too — with two limits spelled out below (re-signing every 7 days, no iCloud save sync).

> **The legality bit, plainly:** you must own a legitimate copy of the game, expansion included. The D2R Mobile project is independent and non-commercial; it provides tools and an empty install shell only, distributes no game content, and does not endorse anyone who does. MiniGamesHub doesn't provide or link to game file downloads either. Use only files from a copy you own.

**Which devices can actually play it?**

| Device | Verdict |
|---|---|
| iPhone 15 Pro and later, iPhone 16/17 series, iPads with M-series chips | The main route. iOS 26 uses the default build; iOS 18–25 uses the older-API build |
| iPhone 14 family, iPhone 15 / 15 Plus, iPhone 13 series (A15/A16) | Playable, with one extra step: a Legacy Device Pack made from your own game files. An iPhone 14 Pro Max was measured at a flawless 60 fps |
| iPads with 4 GB of RAM (iPad mini 6, iPad Air 4) | It runs, but memory is very tight — the system may close the game in busy scenes |
| iPhone 11 and older (A13 and earlier) | **Not supported.** These GPUs don't support Metal 3, which the graphics layer needs |
| Android phones | ARM64, Android 12 or later, Vulkan 1.1 GPU. A Snapdragon 8+ Gen 1 phone was measured at a median 60 fps (details below) |

The hard floor on Apple devices is an **A14 / M1 chip or later** — that's where Metal 3 support starts.

## How to Play Diablo 2: Resurrected on iPhone & iPad

There are two routes. If you have an Apple silicon Mac, take Route A — it's the one the whole project is built and tested around. No Mac? Route B works on Windows or Linux.

The project itself lives here: [jhaizhou-ops/d2r-mobile on GitHub](https://github.com/jhaizhou-ops/d2r-mobile). Everything below follows its documentation.

### Route A: With a Mac (three steps)

**Step 1 — Put your game files in the workspace.** Following `docs/GAME_FILES.md`, place your extracted game files so the Update folder looks like this (default workspace is `~/dm-work`, or set `DM_ROOT`):

```
~/dm-work/data/switch/3.3.94012/Update/ExeFS/    main, sdk, subsdk0
~/dm-work/data/switch/3.3.94012/Update/RomFS/    data/…
```

Got a whole game package instead (`.xci` / `.nsp`)? `./setup.sh <game package> <prod.keys>` extracts the files into place first and then carries on — you'll need hactool installed. If the base game and the update are separate packages, pass both.

**Step 2 — Prepare the workspace.** Run:

```
./setup.sh
source ~/dm-work/build/cache/dm/venv/bin/activate
```

Setup checks your tools, rewrites the game program, and translates the game's shaders to Metal. The first run takes a while; later runs skip whatever is already done. Run everything after this inside the Python environment it prepared. (Run `./setup.sh` again after every project update, and `./setup.sh check` any time you want a health check — it reports the state of your computer, tools, game files and signing setup item by item, and tells you the next command for anything missing. It changes nothing.)

**Step 3 — Fill in your signing details and build.**

```
cp dm/ios/local.env.example dm/ios/local.env
```

Set `DM_TEAM_ID` and `DM_BUNDLE_ID` in `local.env`. With a free Apple ID, also set `DM_FREE_ACCOUNT=1` and `DM_IOS_UDID`, and keep the phone connected while building. Then:

```
cd dm/ios && ./run.sh build
```

That targets iPhone and iPad by default (for iPhone only: `DM_DEVICE_FAMILY=1 ./run.sh build`). The first time you open the app, it asks for the **"game resource folder"** — the 18 resource archives from your game files; `docs/GAME_FILES.md` shows where they belong.

One thing to know about self-built packages: three extras from the project's test builds aren't included — iCloud save sync (it needs a signing entitlement a self-signed package doesn't have), in-app downloading of packs and resources, and new-version notices. The game itself and everything added to it are identical.

On an **A16 or older device** (iPhone 14 family, 15/15 Plus, 13 series), there's one extra ingredient: older chips don't support the game's original compressed texture format, so make a **Legacy Device Pack** from your own game files as described in `docs/LEGACY_DEVICES.md` and include it when you make the install package. Skip it and the app will greet you with a "One More Step for This Device" dialog — that's the fix it is asking for.

### Route B: Without a Mac (Windows / Linux)

1. Download the prebuilt **shell** package from the project's [Releases page](https://github.com/jhaizhou-ops/d2r-mobile/releases) — `D2RMobile-shell-build-input.zip`, or the `ios18` variant if your device runs iOS 18–25. The shell contains no game content; installed as-is it only shows a dialog.
2. Add your own game files with the packaging tool to make the install package, following `docs/NO_XCODE.md`.
3. Sign and install it with a sideloading tool.

Two honest notes from the project's own documentation: making the package on Windows has been verified end to end, but the final step — signing with a sideloading tool — is the one step the team lists as *not yet tried*, so budget a little patience there. And because a non-Mac computer has no Apple shader compiler, the **first launch** on the phone spends about 7 minutes compiling shaders (once, with a progress bar). A package built with Xcode doesn't have this step.

Whichever route you took: with a free Apple ID, expect to **re-sign and reinstall every 7 days**. Updating the app touches neither your saves nor the game resources.

## How to Play Diablo 2: Resurrected on Android

The Android version arrived in v2.0 as a community port, built on the same host with the graphics layer swapped to Vulkan. No Mac, no adb, and no building the APK yourself — any computer will do.

1. **Prepare your game files**, the same as for Apple devices (`docs/GAME_FILES.md`).
2. **Make the import pack on your computer:**

   ```
   python3 dm/tools/d2rm_android.py <Update directory of your game files> <output directory>
   ```

   This produces an `android` folder: the rewritten game program, every Vulkan shader bundle, the touch overlay and a few data tables.
3. **Copy it to the phone.** Over USB, copy the `android` folder it made, together with the game resource folder (`data`), to `Download/S2X/D2R Mobile/` on the phone.
4. **Install the app.** Download `D2RMobile-android.apk` from the project's [Releases page](https://github.com/jhaizhou-ops/d2r-mobile/releases), install it, open it and allow **"All files access"**. The app imports the pack with a progress screen and starts the game.

The pack and the APK must come from the **same release** — when a new release lands, replace both; your saves stay put. Full steps and troubleshooting live in the project's `docs/ANDROID.md`.

Fair warning on polish: compared with iOS, a few Android touch details are still unfinished — the empty-skill-slot menu, the stat-point overlay, and the item image that follows your finger while dragging in a shop. The core game, controls and performance work are in place.

## Performance: How Well Does It Actually Run?

Short answer: far better than a "compatibility layer" has any right to — on the right hardware. All figures below are the project's own on-device measurements, not ours, and we've kept their conditions attached because that's how performance claims should travel.

**On iPhone** (measured on an iPhone 17 Pro Max):

- **60 fps in game**, steady, with no drops once the device warms up.
- About **1 second** from the main menu into a game; app launch is 0.15 s.
- Whole-device power draw of about **3.8 W** at 60 fps (in camp, 50% brightness) — the project calculates nearly **5 hours of continuous play** from a full charge based on that draw.
- The **30 fps power saver mode** draws about **1.85 W** — roughly half — for about twice the battery life.

<img src="https://github.com/jhaizhou-ops/d2r-mobile/releases/download/assets/en_boss.jpg" alt="A boss fight in D2R Mobile with the boss health bar pinned to the top of the screen" loading="lazy" style="width:100%;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.15);margin:1rem 0" />

The closed beta is the more convincing evidence: all **44 iPhones and iPads** in the test group finished Normal, Nightmare and Hell with multiple characters. The weakest device on the list, an **iPhone 14 Pro Max (A16, 6 GB)**, held a flawless 60 fps once the Legacy texture pack was applied.

**On Android** (measured by the port's authors): on a Redmi K50 Ultra (Snapdragon 8+ Gen 1), the camp, a Den of Evil fight and a Cow Level fight all ran at a **median 60 fps**. The Android build caps its 3D render scale at 0.85 by default and lowers it dynamically when frames drop — a sensible trade that keeps motion smooth. A OnePlus 13 was also playable, with one known glitch: brief black squares occasionally flash when a particular light effect appears in the camp (under investigation).

Set expectations like a player, not a brochure: a modern flagship holding 60 fps is documented; a 4 GB RAM device surviving a screen full of cows and effects is *not* promised anywhere, and the project is upfront that memory on those devices is tight. If your phone is older, the 30 fps power saver mode is the realistic target — and still a perfectly good way to play Diablo II.

## Touch Controls and Controller Support

This isn't a gamepad UI pasted onto glass. The control scheme was rebuilt for fingers under one rule: keep the original interface language, use gestures instead of adding buttons.

<img src="https://github.com/jhaizhou-ops/d2r-mobile/releases/download/assets/touch_game.jpg" alt="D2R Mobile touch controls: virtual stick, skill buttons and potion belt" loading="lazy" style="width:100%;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.15);margin:1rem 0" />

- **Movement:** a virtual stick with precise diagonals — or tap an NPC or the ground and your character paths there. Doors, portals and cave entrances are tappable across their whole surface.
- **Combat:** press a skill button to cast, hold to keep casting, **drag to aim at any angle**. Nearby monsters are targeted automatically, and there are two skill sets. Skills on your swap weapons cast with one tap — the game swaps, casts, and swaps back — and the boss health bar stays pinned to the top of the screen.
- **Items:** tap, double-tap, long-press and drag all work the way your fingers expect. Double-tap gear to equip or unequip it, drag an item onto the vendor panel to sell it, long-press an empty inventory slot to sort everything.
- **The screen is actually used:** edge-to-edge on iPhone (clear of the notch), true full screen on iPad.

Prefer a pad? **Connect a controller and press any button** — the interface switches to the original controller layout with button prompts, and inventory, stash, skill tree and settings are fully navigable, with the same button mapping as on Switch. An Xbox controller automatically gets the PC/Xbox layout and icons; a DualSense or DualShock 4 gets the game's own PlayStation icons. Touch the screen and you're instantly back to touch controls. Nothing to configure.

<img src="https://github.com/jhaizhou-ops/d2r-mobile/releases/download/assets/en_pad_combat.jpg" alt="Playing D2R Mobile with a connected game controller" loading="lazy" style="width:100%;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.15);margin:1rem 0" />

## Bonus: Endgame Modes the Original Game Never Had

Because the layer runs the original program, the project could bolt new content on top of it without touching the original rules. Finishing Hell is the start here:

- **Greater Rift:** through the red portal in Harrogath after Hell. 100 levels of escalating monsters; fill the progress bar and kill the Rift Guardian within 15 minutes to clear. Every 2 levels grants +1 Skill Point and +5 Stat Points, and the skill level cap rises from 20 to 40.
- **Endgame Boss Rush:** 12 stages after Hell — stage 11 is the Diablo Clone, stage 12 is the three Uber bosses.
- **Elysium mode** (picked at character creation): Uniques drop at 5×, Sets at 3×, Runes at 5×, and bosses always drop as if on a first kill.
- **Chronicle stash:** every identified Unique and Set item gets its own fixed slot, shared across all your characters and searchable — plus quality-of-life touches like a Runeword helper (long-press a socketed base to list the Runewords it can make; socket them all in one tap when you have the runes), automatic buff recasts, auto-potion rules for you *and* your mercenary, and a loot filter that switches on from Nightmare.

All of it is optional, and most features can be toggled individually under Options → Custom.

## Troubleshooting: Fixes for the Most Common Problems

**The app says "One More Step for This Device."** Your phone can run the game — the install package was just made without the Legacy Device Pack. Make the pack from your own game files (`docs/LEGACY_DEVICES.md`), remake the install package with it included, and reinstall.

**The app says "Device Not Supported… iPhone 15 Pro and later can play."** That's old wording from before v1.0.9 — you're on an outdated build. Update to the latest release; if your device is A16 or earlier, then add the Legacy Device Pack as above.

**The game gets closed by the system in busy scenes (4 GB RAM devices).** Known territory: memory is very tight on devices like the iPad mini 6. Close other apps before playing and use the 30 fps power saver mode; the project is still working on reducing memory use.

**The app stopped opening after about a week (iOS).** That's the free Apple ID limit doing exactly what it says: free signing lasts 7 days. Re-sign and reinstall — your saves and game resources aren't touched.

**iCloud save sync is missing.** Expected on a self-built package: iCloud sync needs a signing entitlement that self-signed builds don't have. It requires building with a paid developer account.

**First launch sits on a progress bar for several minutes (no-Mac route).** Not a freeze — it's the one-time shader compilation (about 7 minutes) that replaces the Xcode step. Let it finish.

**Brief black squares flash in the camp (Android, OnePlus 13).** A known issue with one particular light effect; the port team has it under investigation. The game remains playable.

**The tools reject your game files.** Version check, almost every time: the tools accept Switch 1.0.34.0 (PC 3.3.94012) by default. Update the game — with the expansion installed — and prepare the files again.

**Something else is broken.** The project asks players to open an issue and attach the diagnostics file exported from **Share Diagnostics** in the pause menu — it helps them more than any description.

## FAQ

### Is there an official Diablo 2: Resurrected app for iPhone or Android?

No. Blizzard has never released one, which is why every older guide defaults to streaming. D2R Mobile is an independent, open-source, fan-made project — impressive, but not official and not endorsed by Blizzard.

### Is D2R Mobile an emulator?

No. The Switch build of the game is ARM code, phones run ARM processors, and the original program executes directly on the device — only a few instructions that clash with the phone's kernel are rewritten, and the graphics are rebuilt natively on Metal or Vulkan. Nothing is emulated at the CPU level, and nothing is streamed from another machine.

### Do I need to own the game? Which copy?

Yes — your own Nintendo Switch copy of Diablo II: Resurrected **including the Reign of the Warlock expansion**, updated to Switch version 1.0.34.0. The project ships no game content at all; everything game-related is generated from your files, on your machine. Neither the project nor this site provides game file downloads.

### Can I play online or with friends?

No. D2R Mobile is fully offline — no multiplayer, no Battle.net, no online account. Think of it as the ultimate single-player travel version of D2R.

### Will it run on my iPhone 13?

Yes — the iPhone 13 series (A15) is playable with a Legacy Device Pack made from your own game files; an iPhone 13 Pro Max has been played in the 30 fps mode, and the iPhone 14 Pro Max holds 60 fps. The cutoff is below that: iPhone 11 and older (A13 and earlier) can't run it, because their GPUs don't support Metal 3.

### How much storage and battery does it use?

Plan on about **5.6 GB** for the game resources, plus an app package of a little over 100 MB. On battery: the project's iPhone 17 Pro Max measurements put whole-device draw at about 3.8 W at 60 fps — roughly 5 hours of play per charge — and about half that in the 30 fps power saver mode.

### Is it free?

The compatibility layer itself is free and open source (MIT license). The game is not — you bring your own legally owned copy. On iOS, signing with a free Apple ID also works, with the 7-day re-sign catch described above.

## The Bottom Line

For years, "Diablo 2 on your phone" meant a video stream of a game running somewhere else. D2R Mobile is the first time it means the actual game — your Switch copy, running natively in your pocket, offline, at 60 fps, with touch controls that were clearly designed by someone who plays. The price of admission is real: you need the Switch version with the expansion, a recent phone, and an evening's worth of setup patience. If you've got all three, there is currently nothing else like it.

While your shaders compile — or if your phone is a generation too old — the dungeon itch can still be scratched in seconds: try our <a href="https://minigameshub.org/">free browser games</a>, including <a href="https://minigameshub.org/category/rpg">Diablo-like browser games</a> that run instantly with no downloads, no sign-ups and nothing to sign, re-sign or recompile.

*MiniGamesHub is an unofficial fan site and is not affiliated with Blizzard Entertainment or Nintendo. Diablo and Diablo II: Resurrected are trademarks of Blizzard Entertainment, Inc. D2R Mobile is an independent open-source project; this guide is provided for players who own a legitimate copy of the game.*
