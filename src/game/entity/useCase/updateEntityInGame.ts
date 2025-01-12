import EntityInterface, {
  isCharacterEntity,
} from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { updateContainer } from "@/src/container/container"
import { updateGroundWithGame } from "@/src/game/entity/entityGround/updateGround"
import { updateGameCalculated } from "@/src/game/game/createGameCalculated"

export function updateEntityInGame(
  game: GameInterface,
  entity: EntityInterface,
  action: "update" | "remove" | "create" = "update",
): void {
  updateContainer(game.entities, entity, action)
  if (!isCharacterEntity(entity)) {
    updateGroundWithGame({ game })
  }
  updateGameCalculated(game, entity)
}
