import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { updateContainer } from "@/src/container/container"

export function removeEntityToGame(
  game: GameInterface,
  entity: EntityInterface,
): void {
  updateContainer(game.entities, entity, "remove")
}
