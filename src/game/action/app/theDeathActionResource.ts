import { removeEntityToGame } from "@/src/game/entity/useCase/removeEntityToGame"
import { appLdType } from "@/app/AppLdType"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
import { actionResourceFactory } from "@/src/game/action/actionResourceFactory"
import { updateNextTick } from "@/src/game/action/updateNextTick"

export const theDeathActionResource = actionResourceFactory({
  ["@id"]: "action/the-death",
  onFrame: ({ game, action }) => {
    updateNextTick(game, action, 20)

    const entities = entityQuery(game, { "@typeIn": appLdType.entity }).filter(
      (entity) => {
        return entity.life <= 0
      },
    )

    entities.forEach((entity) => removeEntityToGame(game, entity))
  },
})
