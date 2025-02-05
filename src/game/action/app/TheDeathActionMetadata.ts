import { createJsonLd } from "@/src/utils/jsonLd/jsonLd"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { removeEntityToGame } from "@/src/game/entity/useCase/removeEntityToGame"
import { appLdType } from "@/src/AppLdType"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"

export const theDeathActionMetadata: ActionMetadataInterface<any> = {
  ["@type"]: appLdType.theDeathAction,
  onFrame: ({ game, action }) => {
    action.nextTick = game.time + 50

    const entities = entityQuery(game, { "@typeIn": appLdType.entity }).filter(
      (entity) => {
        return entity.life <= 0
      },
    )

    entities.forEach((entity) => removeEntityToGame(game, entity))
  },
  factory: () => {
    return createJsonLd(theDeathActionMetadata["@type"], {})
  },
}
