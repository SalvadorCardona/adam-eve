import EntityInterface, {
  isBuildingEntity,
  isGroundEntity,
} from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { entityToBoundingBox } from "@/packages/game/entity/transformer/entityToBoundingBox"
import { mergeBounding } from "@/packages/math/boudingBox"
import { updateGame } from "@/packages/game/game/updateGame"
import { ContainerAction } from "@/packages/jsonLd/jsonLd"
import {
  applyBuildingToMatrices,
  applyGroundToMatrices,
} from "@/packages/game/entity/transformer/applyEntityToMatrix"

export function updateGameWorld(
  game: GameInterface,
  entity: EntityInterface,
  action: ContainerAction = ContainerAction.update,
): void {
  if (!isGroundEntity(entity) && !isBuildingEntity(entity)) return

  if (action !== ContainerAction.remove) {
    const boundingEntity = entityToBoundingBox(entity)
    game.gameWorld.bounding = mergeBounding(game.gameWorld.bounding, boundingEntity)
  }

  if (isGroundEntity(entity)) {
    applyGroundToMatrices(game, entity, action)
  } else {
    applyBuildingToMatrices(game, entity, action)
  }

  updateGame(game, game.gameWorld)
}
