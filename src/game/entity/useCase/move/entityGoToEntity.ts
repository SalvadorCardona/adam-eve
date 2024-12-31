import EntityInterface from "@/src/game/entity/EntityInterface"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import GameInterface from "@/src/game/game/GameInterface"
import { getByLdType } from "@/src/container/container"
import { consumePathCoordinate } from "@/src/utils/3Dmath/pathCoordinate/consumePathCoordinate"
import { findShortestPath } from "@/src/utils/3Dmath/findShortestPath"
import { vector2ToVector3, vector3ToVector2 } from "@/src/utils/3Dmath/Vector"
import { interpolateSteps } from "@/src/utils/3Dmath/interpolateSteps"
import { GroundEntityInterface } from "@/src/game/entity/entityGround/GroundEntityInterface"
import { grassGroundEntityMetadata } from "@/src/game/entity/app/ground/grass/GrassGroundEntityMetadata"

let ground: GroundEntityInterface | undefined = undefined

export function entityGoToEntity(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
  game: GameInterface,
) {
  if (!ground) {
    ground = getByLdType<GroundEntityInterface>(
      game.entities,
      grassGroundEntityMetadata["@type"],
    )[0]
  }

  const path = findShortestPath(
    vector3ToVector2(entitySource.position),
    vector3ToVector2(entityTarget.position),
    ground.roadNetwork.find((e) => !e.hasBuilding),
  )

  if (!path?.totalDistance) {
    return {
      isFinish: true,
    }
  }

  const positions = path?.path.map((e) => e.position)
  if (!positions) {
    return {
      isFinish: true,
    }
  }

  const steps = path.totalDistance / (entitySource.speed / 100)

  const pathCoordinate = interpolateSteps({ positions: positions, stepSize: steps })

  const consumePathCoordinateResult = consumePathCoordinate({
    position: entitySource.position,
    pathCoordinate: pathCoordinate.map((e) => vector2ToVector3(e)),
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
