import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { updateEntityInGame } from "@/src/game/entity/useCase/updateEntityInGame"

export function addEntityToGame(game: GameInterface, entity: EntityInterface): void {
  updateEntityInGame(game, entity, "create")
}
