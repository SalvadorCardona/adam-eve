import { jsonLdFactory, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { getByLdType } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { removeEntityToGame } from "@/src/game/entity/useCase/removeEntityToGame"
import { appLdType } from "@/src/AppLdType"

export const theDeathActionMetadata: ActionMetadataInterface<any> = {
  ["@type"]: JsonLdTypeFactory(appLdType.action, "TheDeathActionMetadata"),
  onFrame: ({ game, action }) => {
    action.nextTick = game.time + 50

    const entities = getByLdType<EntityInterface>(game.entities, "entity").filter(
      (entity) => {
        return entity.life <= 0
      },
    )

    entities.forEach((entity) => removeEntityToGame(game, entity))
  },
  factory: () => {
    return jsonLdFactory(theDeathActionMetadata["@type"], {})
  },
}
