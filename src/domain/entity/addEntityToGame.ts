import GameInterface from "@/src/domain/game/GameInterface"
import EntityInterface from "@/src/domain/entity/EntityInterface"
import { updateContainer } from "@/packages/container/container"

export function addEntityToGame(game: GameInterface, entity: EntityInterface): void {
  entity.position.y = 0.01
  updateContainer(game.entities, entity)
}
