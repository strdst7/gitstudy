<div align="center">

# Git Study Guide

**Learn Git by seeing it move.**

An interactive, browser-based study guide to version control — from the three trees and Git objects to branching, merging, remotes, and a 17-question self-test.

[![Live demo](https://img.shields.io/badge/live_demo-git--miii--fundamentals.vercel.app-d1522b?style=flat-square&logo=vercel&logoColor=white)](https://git-miii-fundamentals.vercel.app)
[![MIT License](https://img.shields.io/badge/license-MIT-657a5b?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Last commit](https://img.shields.io/github/last-commit/strdst7/gitstudy?style=flat-square&color=d1522b)](https://github.com/strdst7/gitstudy/commits/main)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-2ea44f?style=flat-square)](https://github.com/strdst7/gitstudy/pulls)

[Live demo](https://git-miii-fundamentals.vercel.app) · [What's inside](#whats-inside) · [Tech stack](#tech-stack) · [Getting started](#getting-started) · [Contributing](#contributing)

</div>

---

## Overview

Git Study Guide is a single-page React app that teaches Git the way it actually behaves: as a set of moving parts. Instead of a wall of commands, it pairs short explanations with diagrams, runnable mental models, and hands-on labs you can poke at.

It is organised as a ten-chapter course across four parts — **Foundations**, **Daily practice**, **Collaboration**, and **Reference** — and ends with a self-test so you can find out what stuck.

> “Version control is a tool that tracks every version of your files — so you never keep a pile of folders called final, final2, final_v3.”

| Chapters | Commands | Self-test questions | Hands-on labs | Backend |
| :------: | :------: | :-----------------: | :-----------: | :-----: |
|    10    |    54    |         17          |       2       |  None   |

## Live demo

**[git-miii-fundamentals.vercel.app](https://git-miii-fundamentals.vercel.app)**

No sign-up, no install, no tracking. Open the link and start reading.

## Features

### A complete, ordered curriculum

- **Foundations** — what version control is, where Git came from, the three trees, the four object types, SHA-1 hashing, and file status.
- **Daily practice** — configuration, `init`, `status`, staging, committing, reading history, diffs, amending, resetting, and the reflog.
- **Collaboration** — tags, `HEAD`, branches, merges, divergent history, conflict resolution, remotes, GitHub, SSH keys, and forks.
- **Reference** — a filterable command index and a flashcard self-test.

Every chapter includes a reading estimate, section navigation, and a completion toggle.

### Learn by manipulating, not memorising

- **Staging lab** — a live three-column model of the working directory, index, and repository. Edit a file, run `git add .`, commit, unstage, or discard, and watch files move between trees while a mock terminal narrates each command.
- **Hash playground** — type two inputs and compare their SHA-1 digests side by side. Presets make it obvious that a one-character change produces a completely different hash.
- **Flashcard deck** — 17 questions with reveal-first answers, “got it” / “review again” grading, a progress meter, and a jump-to-question strip. Scores persist locally.
- **Searchable cheat sheet** — 54 commands grouped by task, with instant filtering, category chips, and copy-to-clipboard buttons.

### Built for actual studying

- **Command palette** — press `⌘K` / `Ctrl+K` to search chapters, commands, and self-test questions from anywhere. Arrow keys to browse, `Enter` to jump, `Esc` to close.
- **Progress that remembers** — completed chapters are saved in `localStorage`, with a percentage bar in the header and a per-chapter status in the sidebar.
- **Reading aids** — sticky section rail with scroll-spy, previous/next chapter links, deep-linkable `#chapter` URLs, and a “back to top” control.
- **Responsive layout** — a persistent sidebar on desktop, a drawer on mobile, and a single-column reading view at every size.
- **Keyboard and screen-reader friendly** — visible focus rings, labelled dialogs and controls, `aria-current` navigation state, and reduced-motion support.

### Private by default

There is no backend, no account system, and no analytics. All progress and quiz scores live in your browser. Clearing site data resets the guide.

## What's inside

| #  | Chapter | Part | What you'll learn | Time |
| :- | :------ | :--- | :---------------- | :--- |
| 01 | **Orientation** | Foundations | How the guide works and the mental model to carry through it | 4 min |
| 02 | **Why Git** | Foundations | The problem version control solves, a short history, local vs. central vs. distributed, and why a clone is not a download | 6 min |
| 03 | **Architecture** | Foundations | The three trees, the staging lab, blobs/trees/commits/tags, hashing and IDs, and reading file status | 9 min |
| 04 | **Setup & daily commands** | Daily practice | Identity configuration, creating a repository, `status`, `add`, and `commit` | 7 min |
| 05 | **History & diffs** | Daily practice | `log`, `show`, comparing working tree/index/commits, and pager mode | 5 min |
| 06 | **Undoing things** | Daily practice | `restore`, unstaging, `commit --amend`, `reset`, and recovering work with `reflog` | 8 min |
| 07 | **Branches & merging** | Collaboration | Tags, `HEAD`, branches, fast-forward and true merges, divergent history, and conflicts | 9 min |
| 08 | **Remotes & GitHub** | Collaboration | `remote`, `origin`, `fetch` vs. `pull`, first push with `-u`, SSH keys, and the fork workflow | 9 min |
| 09 | **Cheat sheet** | Reference | All 54 commands in one searchable, copyable index | 4 min |
| 10 | **Self-test** | Reference | 17 flashcards plus an expandable answer key with links back to the relevant chapter | 10 min |

Roughly **70 minutes** end to end — or pick the chapter you need and come back later.

## Tech stack

| Layer | Technology | Version | Role |
| :---- | :--------- | :------ | :--- |
| UI | [React](https://react.dev) | 19.2.6 | Component model and state |
| Language | [TypeScript](https://www.typescriptlang.org) | 5.9.3 | Strict typing across content and components |
| Build tool | [Vite](https://vite.dev) | 7.3.7 | Dev server and production bundling |
| Styling | [Tailwind CSS](https://tailwindcss.com) | 4.1.17 | Utility-first layout and the custom design system |
| Tailwind plugin | [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite) | 4.1.17 | Tailwind 4 integration |
| Icons | [`lucide-react`](https://lucide.dev) | 1.77 | Interface and chapter iconography |
| Class utilities | [`clsx`](https://github.com/lukeed/clsx) + [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) | 2.1.1 / 3.4.0 | The `cn()` helper for conditional classes |
| Packaging | [`vite-plugin-singlefile`](https://github.com/richardtallent/vite-plugin-singlefile) | 2.3.0 | Inlines JS and CSS into one deployable HTML file |
| Hashing | Custom SHA-1 implementation | — | Powers the hash playground with no runtime dependency |
| Typefaces | Instrument Serif, Inter, JetBrains Mono | — | Loaded from Google Fonts |

**Architecture in one line:** a static React SPA with content-as-data, hash-based routing, `localStorage` persistence, and zero server dependencies.

## Project structure

```text
.
├── LICENSE
├── README.md
└── git-version-control-fundamentals/
    ├── index.html                  # Document shell, meta tags, favicon
    ├── package.json                # Dependencies and scripts
    ├── package-lock.json
    ├── tsconfig.json               # Strict TS + "@/*" path alias
    ├── vite.config.ts              # React, Tailwind, single-file build
    ├── public/
    │   └── favicon.svg
    └── src/
        ├── main.tsx                # React entry point
        ├── App.tsx                 # Shell, routing, progress, layout
        ├── index.css               # Theme tokens, base styles, utilities
        ├── lib/
        │   ├── guide.ts            # Chapters, commands, quiz data (single source of truth)
        │   └── sha1.ts             # Dependency-free SHA-1 implementation
        ├── utils/
        │   └── cn.ts               # clsx + tailwind-merge helper
        └── components/
            ├── ui.tsx              # Shared primitives: code blocks, callouts, tables, graphs
            ├── Sidebar.tsx         # Desktop sidebar and mobile drawer
            ├── SearchPalette.tsx   # ⌘K command palette
            ├── StagingLab.tsx      # Three-trees interactive lab
            ├── HashLab.tsx         # SHA-1 comparison playground
            ├── CheatSheet.tsx      # Filterable command index
            ├── Quiz.tsx            # Flashcard deck and answer key
            └── chapters/
                ├── Foundations.tsx # Orientation, Why Git, Architecture
                ├── Practice.tsx    # Setup, History & diffs, Undo
                ├── Collaboration.tsx # Branching, Remotes
                └── Reference.tsx   # Cheat sheet and quiz wrappers
```

## Getting started

### Prerequisites

- **Node.js 20.19+** or **22.12+** (required by Vite 7)
- **npm** 10+ (or a compatible package manager)

### Install and run

```bash
git clone https://github.com/strdst7/gitstudy.git
cd gitstudy/git-version-control-fundamentals
npm install
npm run dev
```

Open the URL printed by Vite — usually <http://localhost:5173>.

### Production build

```bash
npm run build
npm run preview
```

`npm run build` writes a self-contained `dist/index.html` with the JavaScript and CSS inlined. You can open that file directly or drop it on any static host.

### Available scripts

| Script | Command | Purpose |
| :----- | :------ | :------ |
| `dev` | `vite` | Start the development server with hot module replacement |
| `build` | `vite build` | Type-check-free production build (Vite transpiles TS) into `dist/` |
| `preview` | `vite preview` | Serve the production build locally |

> There is no separate type-check script. Run `npx tsc --noEmit` if you want a standalone TypeScript check.

## How it works

- **Content is data.** `src/lib/guide.ts` defines the `ChapterId` union, chapter metadata, grouped commands, and quiz questions. The sidebar, search palette, cheat sheet, quiz, and stats all derive from those exports, so adding a command or question updates the whole app.
- **Hash routing, no router.** `App.tsx` reads `window.location.hash`, validates it against the chapter list, and pushes state on navigation. Deep links such as `/#branching` work without server rewrites.
- **Local-first state.** Chapter completion (`gitguide.completed.v1`) and quiz scores (`gitguide.quiz.v1`) are stored in `localStorage` with defensive parsing. Nothing is sent anywhere.
- **A small design system.** Tailwind 4 `@theme` tokens define the paper/ink palette, serif display face, mono accents, and animations. Shared primitives in `ui.tsx` keep code blocks, callouts, tables, and diagrams consistent.
- **Single-file output.** `vite-plugin-singlefile` inlines the bundle, making the production artifact portable and easy to host.
- **Accessibility is part of the build.** Semantic landmarks, labelled controls, a modal search dialog with keyboard navigation, `aria-live` terminal output, focus-visible styling, and `prefers-reduced-motion` handling.

## Deployment

The live site is deployed on **Vercel** at [git-miii-fundamentals.vercel.app](https://git-miii-fundamentals.vercel.app).

To deploy your own copy:

1. Import the repository into Vercel.
2. Set **Root Directory** to `git-version-control-fundamentals`.
3. Use the detected **Vite** preset, or set **Build Command** to `npm run build` and **Output Directory** to `dist`.
4. Deploy.

Because routing is hash-based, no SPA rewrite rule is needed. The same `dist/` output works on GitHub Pages, Netlify, Cloudflare Pages, or any static file server.

## Contributing

Contributions that make the guide clearer are welcome. A few good entry points:

- **Add a command** — append it to the right group in `commandGroups` inside `src/lib/guide.ts`. It automatically appears in the cheat sheet, search palette, and command count.
- **Add a self-test question** — append to `quizQuestions` with a `chapter` and `section` so the “read the chapter” and “review in context” links resolve.
- **Add or edit a chapter** — extend the `ChapterId` union and `chapters` array, then add the content component and a case in `App.tsx`.
- **Fix an explanation or diagram** — chapter copy lives in `src/components/chapters/`.

Before opening a pull request:

```bash
cd git-version-control-fundamentals
npm install
npm run build
```

Keep content in `guide.ts` rather than duplicating it across components, and match the existing visual language (paper background, ink text, serif headings, mono for commands).

## License

Released under the [MIT License](LICENSE). © 2026 Nur Amirah Mohd Kamil.

## Credits

- Written and built by **KDherstacks · aimirah. miii**.
- Icons by [Lucide](https://lucide.dev).
- Typefaces: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif), [Inter](https://fonts.google.com/specimen/Inter), and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono).
- Built with [React](https://react.dev), [Vite](https://vite.dev), and [Tailwind CSS](https://tailwindcss.com).

<div align="center">

**Built for studying, not memorising.**

</div>
