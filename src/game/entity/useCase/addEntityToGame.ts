import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { hasCollisionInGame } from "@/src/game/entity/entityHasCollision"
import { updateEntityInGame } from "@/src/game/entity/useCase/updateEntityInGame"

export function addEntityToGame(game: GameInterface, entity: EntityInterface): void {
  const collision = hasCollisionInGame(game, entity)
  if (!collision) {
    updateEntityInGame(game, entity, "create")

    return
  }

  console.warn("Has a collision with", collision)
}
