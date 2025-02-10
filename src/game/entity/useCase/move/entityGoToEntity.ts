import EntityInterface from "@/src/game/entity/EntityInterface"
import {
  createVector2,
  extendVectorByDistance,
  Vector2Interface,
  vector2ToVector3,
  Vector3Interface,
  vector3ToVector2,
  vectorAddition,
} from "@/src/utils/math/vector"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import { vectorMoveToVector } from "@/src/utils/math/vectorMoveToVector"
import GameInterface from "@/src/game/game/GameInterface"
import { findPathAStar } from "@/src/utils/math/findPath"
import { roundVector } from "@/src/utils/math/round"
import { getEntitySpeed } from "@/src/game/entity/useCase/query/getEntitySpeed"
import {
  consumePath,
  createConsumablePath,
  PathInterface,
  PathResponseInterface,
} from "@/src/utils/math/path"
import { matrixDirection } from "@/src/utils/math/matrix"
import { distanceBetweenVector2 } from "@/src/utils/math/distanceBetweenVector"

interface EntityGoPositionParams {
  entity: EntityInterface
  target: EntityInterface
}

export function entityGoToEntity({
  entity,
  target,
}: EntityGoPositionParams): PathResponseInterface {
  const targetPosition: Vector3Interface = target.position
  const entityPosition: Vector3Interface = entity.position

  const result = vectorMoveToVector(
    entityPosition,
    targetPosition,
    getEntitySpeed(entity),
  )

  entity.position = result.position
  entity.rotation = result.rotation

  return {
    distance: result.distance,
    isFinish: entityHasCollision(entity, target),
    unreachable: true,
  }
}

interface EntityGoPositionParamsWithGround {
  entity: EntityInterface
  target: EntityInterface
  game: GameInterface
}

export function entityGoToEntityWithGround({
  game,
  entity,
  target,
}: EntityGoPositionParamsWithGround): PathResponseInterface {
  const targetPosition = vector3ToVector2(target.position)
  const entityPosition = vector3ToVector2(entity.position)
  const hash = entity["@id"] + target["@id"] + JSON.stringify(targetPosition)
  const distance = distanceBetweenVector2(entityPosition, targetPosition)

  if (distance < 1) {
    return entityGoToEntity({ entity, target })
  }

  if (entity.currentPath && entity.currentPath.hash === hash) {
    consumePath(entity.currentPath)
    entity.position = vector2ToVector3(entity.currentPath.currentPosition)
    if (entity.currentPath.currentRotation) {
      entity.rotation = entity.currentPath.currentRotation
    }

    return entity.currentPath
  }

  const speed = getEntitySpeed(entity)
  const directions: Vector2Interface[] = [
    createVector2(0, 0),
    ...Object.values(matrixDirection),
  ]
  let path: PathInterface | null = null

  const targetPositionRounded = roundVector(targetPosition)
  const entityPositionRounded = roundVector(entityPosition)

  for (const direction of directions) {
    path = findPathAStar(
      game.gameWorld.entitiesMatrix,
      entityPositionRounded,
      vectorAddition(direction, targetPositionRounded),
    )
    if (path) {
      break
    }
  }

  if (!path) {
    return {
      unreachable: true,
      distance: 0,
      isFinish: false,
    }
  }

  const pathExtended = extendVectorByDistance(path, speed)
  entity.currentPath = createConsumablePath(pathExtended)
  entity.currentPath.hash = hash

  return entity.currentPath
}
