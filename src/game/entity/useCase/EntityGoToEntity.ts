import EntityInterface from "@/src/game/entity/EntityInterface"
import { generatePathCoordinates } from "@/src/game/3D/pathCoordinate/generatePathCoordinates"
import { consumePathCoordinate } from "@/src/game/3D/pathCoordinate/consumePathCoordinate"
import { entityHasCollision } from "@/src/game/entity/entityHasCollision"

export function entityGoToEntity(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
) {
  const pathCoordinate = generatePathCoordinates(
    entitySource.position,
    entityTarget.position,
  )

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
