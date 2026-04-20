# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server (Vite)
pnpm build        # TypeScript type-check + production build
pnpm run lint     # type-check only (tsc, no emit)
make test         # run all tests once (vitest run)
make test-watch   # vitest in watch mode
make coverage     # vitest with v8 coverage
make watch        # tsc + vitest + vite all in parallel
```

Run a single test file:
```bash
pnpm vitest run app/scenarios.test.ts
```

Path alias `@` maps to the repo root (configured in `vite.config.ts`).

### Testing conventions

- Unit tests live next to the file under test as `<name>.test.ts`.
- Engine tests are in `packages/**/*.test.ts`; gameplay/scenario tests in `app/*.test.ts`.
- Prefer `gameFactory()` + `createCharacter`/`createBuilding` helpers over editing JSON fixtures.
- When testing `onFrame` and actions, build a throwaway resource in the test file rather than spying on a real content resource (real resources often have no default `onFrame` to spy on).
- `containerPubSub` is a module-level singleton — always `unsubscribe()` in tests, and use unique `@id`s when asserting on channel delivery.

## Architecture

### Two-layer split: engine vs. content

- **`packages/`** — framework/engine code that knows nothing about specific game content:
  - `game/` — core data model, game loop, entity/action/inventory use cases
  - `ui/` — React + Pixi.js rendering, hooks, provider
  - `jsonLd/` — JSON-LD typed data structures + reactive pub/sub
  - `resource/` — global resource registry (`getResource` / `createResource`)
  - `math/` — vectors, matrices, bounding boxes, pathfinding

- **`app/`** — all game-specific content (entities, actions, scenarios):
  - `entity/` — one folder per entity type (building, character, resource, ground, attack, effect)
  - `actionUser/` — user-interaction actions (select, create, remove)
  - `action/` — game-logic actions (harvest, build, death, attack…)
  - `resourceList.ts` — central registry bootstrap; **every new resource must be added here**

### JSON-LD data model

All game objects (`GameInterface`, `EntityInterface`, `ActionInterface`, `InventoryInterface`, etc.) are JSON-LD items: plain objects with `@id`, `@type`, and `@version` fields.

`updateItem(item)` in `packages/jsonLd/jsonLd.ts` increments `@version` and publishes to two channels: `item["@id"]` and `item["@type"]`. This is the sole reactivity mechanism — React components subscribe via `containerPubSub.subscribe(channel, callback)` (wrapped in `useGamePubSub`).

`updateEntityInGame(game, entity)` is the standard way to mutate an entity and trigger UI updates.

### Mutation contract (important)

State is mutated **in place** — there are no immutable copies. React re-renders are driven exclusively by the pub/sub above, **not** by reference equality. Rules:

1. After changing any field on a JSON-LD item, call `updateItem(item)` (or a wrapper like `updateEntityInGame`, `updateContainer`, `updateGame`) so subscribers see the change.
2. Forgetting to call `updateItem` will cause silent stale UI — the mutation happens, but components never re-render.
3. Subscribe on the narrowest channel that works: an `@id` for a single entity, a `@type` for a class of items (e.g. `"userControl"`, `"gameOption"`).
4. `GameProvider.updateGame(game)` publishes on both the game's channels *and* the broadcast `pubSub` consumed by `useGameFrame`. Call it when something outside the tick loop mutates the game root.

### Resource registry pattern

Resources are metadata descriptors (not instances). Call `createResource()` (or the typed helpers like `createBuilding`, `createCharacter`, `createHarvestable`, `createEntityResource`) to register a descriptor. `getResource(entityOrIri)` looks up by `@id` first, then `@type`.

`EntityResourceInterface` is the key descriptor shape:
- `propriety` — static config (health, speed, inventorySize, attack, work, resourceForConstruction…)
- `onFrame({entity, game})` — called every tick for each live entity of this type
- `create(payload)` — factory that produces a new entity instance
- `canBeBuild({entity, game})` — placement validation
- `component` — optional custom Pixi.js React component for rendering

### Game loop

`GameProvider` (`packages/ui/provider/GameProvider.tsx`) runs `gameProcessor(game)` in a `setInterval` at ~45 fps × `gameOption.gameSpeed`. `gameProcessor`:
1. Increments `game.time`
2. Processes global `game.actions` bag
3. For each entity: calls `entityMetaData.onFrame` then processes `entity.actions`
4. Calls `gameResource.persistItem(game)` (save to localStorage)

Each tick the provider then calls `updateGame(game)`, which calls `updateItem(game)` (bumps `@version`, publishes on the game's `@id` and `@type`) and also broadcasts through the context-level `pubSub` consumed by `useGameFrame`. The interval is re-created when `gameOption["@version"]` changes (e.g. `gameSpeed` toggled).

### Entity selection & UI

Click/drag on the map (Pixi.js `SelectOnMap`) calls `onSelectEntityUserActionMetadata.onSelectZone`, which populates `game.userControl.entitiesSelected` and calls `updateGame(game, game.userControl)`. Components subscribe to `"userControl"` to react. `EntityModal` (`packages/ui/entity-modal.tsx`) renders the first selected entity's stats and inventory.

### Inventory

`InventoryInterface` extends `JsonLdTypeCollection<InventoryItemInterface>`: items live in `inventory.member` keyed by `@type`. Core use cases are in `packages/game/inventory/useCase/` (`addToInventory`, `transfertInventoryByItem`, `getInventoryItem`, `enoughResource`, etc.). The global `game.inventory` holds the player's shared resource pool (wood, water, wheat, gold, knowledge).

### Adding a new entity type

1. Create a resource file using `createBuilding` / `createCharacter` / `createHarvestable`
2. Register it in `app/resourceList.ts`
3. Optionally add a Pixi.js `component` for custom rendering or `onFrame` for per-tick logic

### Keyboard input

`packages/ui/keysState.ts` exports a shared `keysPressed: Record<string, boolean>` map.
- `ControlKeyboard.tsx` populates it on `keydown`/`keyup`/`wheel` events.
- Any entity `onFrame` can import and read it directly — no event listeners needed.

Current key assignments:
| Keys | Action |
|------|--------|
| WASD | Camera movement |
| Arrow keys | Player movement (consumed by `playerEntityResource.onFrame`) |
| Space / F | Player attack |
| G | Toggle grid |
| R | Rotate building placement |
| P | Pause / resume |
| Escape | Cancel current action / deselect |
| Scroll wheel | Zoom in/out |
| N | New game |

### Player entity (`resource/player`)

Located at `app/entity/character/player/`.

- **Movement**: reads `keysPressed` in `onFrame`, updates `entity.position` directly, calls `updateEntityInGame`.
- **Attack**: `playerAttackActionResource` — Space/F, finds nearest enemy via `entityQueryFindOne` with `circleSearch`, calls `entityAttackEntity`.
- **Rendering**: `PlayerComponent` switches between three SVG sprites based on `entity.life / 100`:
  - `player_healthy.svg` → > 50 HP
  - `player_hurt.svg` → 25–50 HP
  - `player_critical.svg` → < 25 HP
- Stats: 100 HP, 5 damage, 1.5 attack range, 20-slot inventory, speed 0.08.

### SVG assets for entities

Import SVGs as URLs with the `?url` suffix:
```ts
import mySvg from "./my-asset.svg?url"
```
Use them in a custom `component` via `<Sprite image={mySvg} options={{ width: size.x, height: size.y }} />`.
For health-dependent or state-dependent visuals, switch the `image` prop — `useTexture` reacts to URL changes.

### Faction system

- `EntityFaction.self` — player-side (workers, player character)
- `EntityFaction.enemy` — hostile (zombies)

Set via `defaultEntity: () => ({ faction: EntityFaction.enemy })` in the resource descriptor.
Use `entityQueryFindOne(game, { faction: EntityFaction.enemy, circleSearch: { center, radius } })` to find nearby enemies.

### Action resources

An action resource is a descriptor with an `onFrame` callback registered in `resourceList.ts`.  
Attach it to an entity at spawn time via `propriety.defaultActions: [actionResource["@type"]!]`.  
Use `updateNextTick(game, action, ticks)` inside `onFrame` to throttle execution (skip N ticks before next call).

```ts
export const myAction = createActionResource({
  ["@id"]: "action/my-action",
  onFrame: ({ game, entity, action }) => {
    updateNextTick(game, action, 60) // run every ~1.3 s at 45 fps
    // ... logic
  },
})
```
