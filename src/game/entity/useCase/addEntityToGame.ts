import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { updateContainer } from "@/src/container/container"
import { hasCollisionInGame } from "@/src/game/entity/hasCollision"

export function addEntityToGame(game: GameInterface, entity: EntityInterface): void {
  entity.position.y = 0.01
  const collision = hasCollisionInGame(game, entity)
  if (!collision) {
    updateContainer(game.entities, entity)

    return
  }

  console.warn("Has a collision with", collision)
}
