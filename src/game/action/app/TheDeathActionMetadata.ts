import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { getByTypeInContainer } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { removeEntityToGame } from "@/src/game/entity/useCase/removeEntityToGame"

export const theDeathActionMetadata: ActionMetadataInterface<any> = {
  ["@type"]: "action/TheDeathActionMetadata",
  onFrame: ({ game }) => {
    const entities = getByTypeInContainer<EntityInterface>(
      game.entities,
      "entity",
    ).filter((entity) => {
      return entity.life < 0
    })

    entities.forEach((entity) => removeEntityToGame(game, entity))
  },
  factory: (payload) => {
    return jsonLdFactory(theDeathActionMetadata["@type"], {})
  },
}
