import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { deleteContainerKey } from "@/src/container/container"

export function removeEntityToGame(
  game: GameInterface,
  entity: EntityInterface,
): void {
  deleteContainerKey(game.entities, entity["@id"])
}
