import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { hasCollisionInGame } from "@/src/game/entity/useCase/entityHasCollision"
import { updateEntityInGame } from "@/src/game/entity/useCase/updateEntityInGame"

export function addEntityToGame(
  game: GameInterface,
  entity: EntityInterface,
): boolean {
  const collision = hasCollisionInGame(game, entity)
  if (!collision) {
    updateEntityInGame(game, entity, "create")

    return true
  }

  updateEntityInGame(game, entity, "create")

  console.warn("Has a collision with", collision)
  return false
}
