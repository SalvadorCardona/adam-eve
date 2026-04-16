import GameInterface from "@/packages/game/game/GameInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { ContainerAction } from "@/packages/jsonLd/jsonLd"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"

export function removeEntityToGame(
  game: GameInterface,
  entity: EntityInterface,
): boolean {
  const entityMetaDataInterface = getResource<EntityResourceInterface>(entity)

  if (entityMetaDataInterface.onDeath)
    entityMetaDataInterface.onDeath({ game, entity })

  updateEntityInGame(game, entity, ContainerAction.remove)

  return true
}
