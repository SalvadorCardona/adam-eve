import EntityInterface, {
  isGroundEntity,
} from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { ContainerAction, updateContainer } from "@/packages/jsonLd/jsonLd"
import { updateGameWorld } from "@/packages/game/game/useCase/command/updateGameWorld"
import { invalidateSpatialIndex } from "@/packages/game/game/useCase/query/spatialIndex"

export function updateEntityInGame(
  game: GameInterface,
  entity: EntityInterface,
  action: ContainerAction = ContainerAction.update,
): void {
  if (!isGroundEntity(entity)) {
    updateContainer(game.entities, entity, action)
  }
  updateGameWorld(game, entity, action)
  invalidateSpatialIndex()
}
