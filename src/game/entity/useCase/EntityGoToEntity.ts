import EntityInterface from "@/src/game/entity/EntityInterface"
import { consumePathCoordinate } from "@/src/game/3D/pathCoordinate/consumePathCoordinate"
import { entityHasCollision } from "@/src/game/entity/entityHasCollision"
import { aStarPathfinding } from "@/src/game/3D/findClosestWithGround"
import GameInterface from "@/src/game/game/GameInterface"
import { generatePathCoordinates } from "@/src/game/3D/pathCoordinate/generatePathCoordinates"

export function entityGoToEntity(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
  game?: GameInterface,
) {
  let pathCoordinate = game
    ? aStarPathfinding(entitySource.position, entityTarget.position, game, 5)
    : generatePathCoordinates(entitySource.position, entityTarget.position)
  if (!pathCoordinate) {
    throw new Error("problem path")
  }

  const consumePathCoordinateResult = consumePathCoordinate({
    position: entitySource.position,
    pathCoordinate: pathCoordinate,
  })

  if (consumePathCoordinateResult.isFinish) {
    return consumePathCoordinateResult
  }

  entitySource.rotation = consumePathCoordinateResult.rotation
  entitySource.position = consumePathCoordinateResult.position

  if (entityHasCollision(entitySource, entityTarget)) {
    consumePathCoordinateResult.isFinish = true
  }

  return consumePathCoordinateResult
}
