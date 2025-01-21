import EntityInterface, { isGroundEntity } from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { updateGroundWithGame } from "@/src/game/entity/entityGround/updateGround"
import { ContainerAction, updateContainer } from "@/src/utils/jsonLd/jsonLd"

export function updateEntityInGame(
  game: GameInterface,
  entity: EntityInterface,
  action: ContainerAction = ContainerAction.update,
): void {
  if (isGroundEntity(entity)) {
    updateGroundWithGame({ game })
  }
  updateContainer(game.entities, entity, action)
}
