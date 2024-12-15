import GameInterface from "@/src/domain/game/GameInterface"
import EntityInterface from "@/src/domain/entity/EntityInterface"
import { updateContainer } from "@/packages/container/container"
import { hasCollisionInGame } from "@/src/domain/entity/hasCollision"

export function addEntityToGame(game: GameInterface, entity: EntityInterface): void {
  entity.position.y = 0.01
  if (!hasCollisionInGame(game, entity)) {
    updateContainer(game.entities, entity)

    return
  }

  console.warn("Has a collision")
}
