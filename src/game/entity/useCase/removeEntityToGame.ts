import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { updateEntityInGame } from "@/src/game/game/useCase/command/updateEntityInGame"
import { ContainerAction } from "@/packages/jsonLd/jsonLd"
import { getMetaData } from "@/packages/metadata/MetadataInterface"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"

export function removeEntityToGame(
  game: GameInterface,
  entity: EntityInterface,
): boolean {
  const entityMetaDataInterface = getMetaData<EntityResourceInterface>(entity)

  if (entityMetaDataInterface.onDeath)
    entityMetaDataInterface.onDeath({ game, entity })

  updateEntityInGame(game, entity, ContainerAction.remove)

  return true
}
