import GameInterface from "@/app/domain/game/GameInterface"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { updateContainer } from "@/packages/container/container"

export function addEntityToGame(game: GameInterface, entity: EntityInterface): void {
  entity.position.y = 0.2
  updateContainer(game.entities, entity)
}
