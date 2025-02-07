import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { removeEntityToGame } from "@/src/game/entity/useCase/removeEntityToGame"
import { appLdType } from "@/src/AppLdType"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
import { actionMetaDataFactory } from "@/src/game/action/actionMetaDataFactory"
import { updateNextTick } from "@/src/game/action/updateNextTick"

export const theDeathActionMetadata = actionMetaDataFactory({
  ["@type"]: createJsonLdType(appLdType.typeAction, "TheDeathActionMetadata"),
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
