import { removeEntityToGame } from "@/packages/game/entity/useCase/removeEntityToGame"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { updateNextTick } from "@/packages/game/action/updateNextTick"

export const theDeathActionResource = createActionResource({
  ["@id"]: "the-death",
  onFrame: ({ game, action }) => {
    updateNextTick(game, action, 20)

    const entities = entityQuery(game, { "@type": "entity" }).filter((entity) => {
      return entity.life <= 0
    })

    entities.forEach((entity) => removeEntityToGame(game, entity))
  },
})
