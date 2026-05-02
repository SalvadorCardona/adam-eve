---
name: generate-asset
description: Generate game assets (icon.png, model.png) for entities in this project using OpenAI's gpt-image-1. Use when the user asks to create, generate, or design a sprite, icon, or image for a building, character, ground tile, or resource. Examples — "génère une icône pour la ferme", "crée un sprite de zombie", "il me faut un model.png pour ce bâtiment".
---

# generate-asset

Generates 2D game assets via OpenAI's `gpt-image-1` model and saves them as PNG files following this project's asset conventions.

## Prerequisites

- `OPENAI_API_KEY` must be set in the environment (the script will refuse to run without it).
- `curl`, `jq`, and `base64` available on PATH.

## Project asset conventions

Each entity folder under `app/entity/<type>/<name>/` typically contains:
- `icon.png` (or `.svg`) — UI icon shown in `EntityModal` (small, readable, centered)
- `model.png` (or `.svg`) — sprite rendered on the Pixi.js map (top-down view, clean silhouette)

Existing reference sizes:
- icons: ~96×96 to 1024×1024 (downscaled by CSS)
- models: ~96×96 to 400×467

Always generate with **transparent background** unless the user explicitly says otherwise, so sprites composite cleanly onto the map.

## How to invoke

Call the helper script from the repo root:

```bash
.claude/skills/generate-asset/generate.sh <output-path> <prompt> [size] [background]
```

- `output-path` — repo-relative path, e.g. `app/entity/building/farm/icon.png`
- `prompt` — full text description (use the template below)
- `size` — `1024x1024` (default), `1024x1536`, `1536x1024`, or `auto`
- `background` — `transparent` (default) or `opaque`

## Prompt template

For **map sprites** (`model.png`):

> Pixel art top-down view of a {SUBJECT}, 2D game asset for a tile-based survival game, clean silhouette, transparent background, no ground shadow, isolated subject, consistent lighting from top-left, style similar to Stardew Valley / RimWorld.

For **UI icons** (`icon.png`):

> Pixel art icon of a {SUBJECT}, centered composition, simple readable shape, transparent background, suitable as a small UI icon at 64×64, vivid colors, no text, no border.

For **characters**:

> Pixel art top-down character sprite of a {SUBJECT}, 2D game asset, facing south, transparent background, clean outline, no shadow, idle pose.

## Workflow when the user requests an asset

1. **Confirm scope** — ask (or infer) the target entity folder and which file(s): `icon.png`, `model.png`, or both.
2. **Refine the prompt** — fill the appropriate template with concrete details (material, color palette, era, mood).
3. **Show the user** the prompt and target path before calling the script (one-line confirmation).
4. **Run the script** — typically generates in 5–15 s.
5. **Report** the saved path. Suggest a follow-up step if the asset needs to be wired into a resource file (`createBuilding`, `createCharacter`…) via its `asset.icon` / `asset.model` field.

## Notes

- gpt-image-1 returns base64-encoded PNG; the script decodes it to disk for you.
- Costs are billed to the OpenAI account tied to `OPENAI_API_KEY` — do not regenerate on a whim.
- If the user wants SVG instead of PNG, generate the PNG first then suggest a separate vectorisation step (this skill does not handle that).
