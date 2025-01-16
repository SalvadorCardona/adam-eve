import EntityInterface, {
  isCharacterEntity,
} from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { ContainerAction, updateContainer } from "@/src/container/container"
import { updateGroundWithGame } from "@/src/game/entity/entityGround/updateGround"

export function updateEntityInGame(
  game: GameInterface,
  entity: EntityInterface,
  action: ContainerAction = ContainerAction.update,
): void {
  updateContainer(game.entities, entity, action)
  if (!isCharacterEntity(entity)) {
    updateGroundWithGame({ game })
  }
  // updateGameCalculated(game, entity)
}
