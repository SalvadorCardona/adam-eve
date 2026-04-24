import { createActionResource } from "@/packages/game/action/createActionResource"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"

export const AGING_INTERVAL = 10000

export const agingActionResource = createActionResource({
  ["@id"]: "aging",
  onFrame: ({ game, action }) => {
    updateNextTick(game, action, AGING_INTERVAL)

    Object.values(game.entities).forEach((entity) => {
      entity.age = (entity.age ?? 0) + 1
      updateEntityInGame(game, entity)
    })
  },
})
