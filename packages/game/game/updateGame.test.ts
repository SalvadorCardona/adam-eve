import { describe, expect, it } from "vitest"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { updateGame } from "@/packages/game/game/updateGame"
import { createJsonLd } from "@/packages/jsonLd/jsonLd"

describe("updateGame", () => {
  it("stores the item under its @type on the game root", () => {
    const game = gameFactory()
    const item = createJsonLd("camera", {
      zoom: 99,
      position: { x: 1, y: 2, z: 3 },
    })

    updateGame(game, item)

    expect((game as unknown as Record<string, unknown>)["camera"]).toBe(item)
  })

  it("bumps @version on the item", () => {
    const game = gameFactory()
    const item = createJsonLd("test-type", {})
    const before = item["@version"] ?? 0

    updateGame(game, item)

    expect(item["@version"]).toBe(before + 1)
  })
})
