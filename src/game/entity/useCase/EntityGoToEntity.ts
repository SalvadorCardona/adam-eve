import EntityInterface from "@/src/game/entity/EntityInterface"
import { generatePathCoordinates } from "@/src/game/3D/pathCoordinate/generatePathCoordinates"
import { consumePathCoordinate } from "@/src/game/3D/pathCoordinate/consumePathCoordinate"

export function entityGoToEntity(
  entity1: EntityInterface,
  entity2: EntityInterface,
) {
  const pathCoordinate = generatePathCoordinates(entity1.position, entity2.position)

  const consumePathCoordinateResult = consumePathCoordinate({
    position: entity1.position,
    pathCoordinate: pathCoordinate,
  })

  if (consumePathCoordinateResult.isFinish) {
    return consumePathCoordinateResult
  }

  entity1.rotation = consumePathCoordinateResult.rotation
  entity1.position = consumePathCoordinateResult.position

  return consumePathCoordinateResult
}
