# Adam-Eve

**City builder** web 2D/isométrique rendu avec **Pixi.js 8** (canvas WebGL). Le joueur place des bâtiments sur un ground network, gère des ressources et des workers (voir `context.txt` pour le modèle de données : `GameInterface`, `EntityInterface`, `GroundInterface`).

Le `README.md` mentionne Next.js — **c'est obsolète**, le projet utilise Vite + TanStack Router.

## Stack

- **React 19** avec React Compiler (`babel-plugin-react-compiler`)
- **TanStack Router** (file-based, dossier `routes/`, `routeTree.gen.ts` auto-généré)
- **Vite 8** + **Vitest 4** (tests + coverage)
- **TypeScript 6** (strict) — `tsc --noEmit` sert de lint (`pnpm lint`)
- **Tailwind v4** + **Radix UI** + **shadcn-style** (`components.json`)
- **Pixi.js 8** pour le rendu du jeu
- **pnpm** (obligatoire, `packageManager` pinné dans `package.json`)

## Commandes

```bash
pnpm dev          # vite dev server
pnpm test         # vitest run (via Makefile: make test)
pnpm lint         # tsc --noEmit
make ci           # lint + test
pnpm deploy-gh    # build + publish sur GitHub Pages
```

## Structure

- `app/` — logique du jeu : `entity/`, `action/`, `inventory/`, `asset/`, `components/`, `main.tsx`
- `packages/` — libs réutilisables : `game/`, `math/`, `jsonLd/`, `react/`, `repository/`, `resource/`, `storage/`, `ui/`, `id/`, `array/`
- `routes/` — routes TanStack (`index.tsx`, `game.$gameIri.tsx`, `newGame.tsx`, `saveGame.$saveGameId.tsx`, `__root.tsx`). **Ne pas éditer `routeTree.gen.ts`** (généré).
- `public/`, `index.html`, `index.css`

## Conventions

- Alias path : `@/*` → racine du projet (voir `tsconfig.json` et `vite.config.ts`)
- Entités modélisées en **JSON-LD** (`@id`, `@type`, `BaseJsonLdInterface`) — voir `context.txt` pour les interfaces de référence (`GameInterface`, `EntityInterface`, `GroundInterface`, `Vector3Interface`)
- Prettier configuré (`.prettierrc.json`), ESLint avec `eslint-plugin-tailwindcss` et `eslint-plugin-prettier`

## Déploiement

GitHub Pages via `gh-pages`, base URL : `https://salvadorcardona.github.io/adam-eve/` (voir script `build-gh`). Workflow dans `.github/`.
