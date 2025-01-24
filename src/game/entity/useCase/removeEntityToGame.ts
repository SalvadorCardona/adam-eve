import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { updateEntityInGame } from "@/src/game/entity/useCase/updateEntityInGame"
import { ContainerAction } from "@/src/utils/jsonLd/jsonLd"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"

export function removeEntityToGame(
  game: GameInterface,
  entity: EntityInterface,
): boolean {
  const entityMetaDataInterface = getMetaData<EntityMetaDataInterface>(entity)
  entityMetaDataInterface.onDeath &&
    entityMetaDataInterface.onDeath({ game, entity })
  updateEntityInGame(game, entity, ContainerAction.remove)

  return true
}
