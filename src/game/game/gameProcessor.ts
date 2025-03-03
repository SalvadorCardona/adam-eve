import GameInterface from "@/src/game/game/GameInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { BuildingEntityInterface } from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { gameMetadata } from "@/src/game/game/GameMetaData"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import { updateEntityInGame } from "@/src/game/game/useCase/command/updateEntityInGame"
import { getEntitiesInGame } from "@/src/game/game/useCase/query/getEntitiesInGame"
import { ActionMetadataInterface } from "@/src/game/action/ActionMetadataInterface"

export function gameProcessor(game: GameInterface) {
  game.time++
  const metaData = gameMetadata
  actionProcesseur(game.actions, game)

  getEntitiesInGame(game).forEach((entity) => {
    const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
    entityMetaData.onFrame && entityMetaData.onFrame({ entity, game })
    entity?.actions &&
      actionProcesseur(entity.actions, game, entity as BuildingEntityInterface)
  })

  metaData.persistItem(game)

  return game
}

function actionProcesseur(
  actionBag: ActionBagInterface,
  game: GameInterface,
  entity?: BuildingEntityInterface,
): void {
  Object.values(actionBag).forEach((action) => {
    if (action?.nextTick && action.nextTick > game.time) {
      return
    }

    action.nextTick = undefined
    const actionMeta = getMetaData<ActionMetadataInterface>(action)
    actionMeta.onFrame({ entity, action, game })
    if (entity) {
      updateEntityInGame(game, entity)
    }
  })
}
