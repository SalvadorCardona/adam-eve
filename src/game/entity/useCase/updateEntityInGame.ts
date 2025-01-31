import EntityInterface, { isGroundEntity } from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { updateGroundWithGame } from "@/src/game/entity/useCase/updateGround"
import { ContainerAction, updateContainer } from "@/src/utils/jsonLd/jsonLd"

export function updateEntityInGame(
  game: GameInterface,
  entity: EntityInterface,
  action: ContainerAction = ContainerAction.update,
): void {
  updateContainer(game.entities, entity, action)

  if (isGroundEntity(entity)) {
    updateGroundWithGame({ game })
  }
}
