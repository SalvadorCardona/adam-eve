import EntityInterface from "@/packages/game/entity/EntityInterface"
import {
  createVector2,
  extendVectorByDistance,
  Vector2Interface,
  Vector3Interface,
  vector3ToVector2,
  vectorAddition,
} from "@/packages/math/vector"
import { entityHasCollision } from "@/packages/game/entity/useCase/entityHasCollision"
import { vector3MoveToVector } from "@/packages/math/vector3MoveToVector"
import GameInterface from "@/packages/game/game/GameInterface"
import { findPathAStar } from "@/packages/math/findPath"
import { roundVector } from "@/packages/math/round"
import { getEntitySpeed } from "@/packages/game/entity/useCase/query/getEntitySpeed"
import {
  consumePath,
  ConsumablePathInterface,
  createConsumablePath,
  PathInterface,
  PathResponseInterface,
} from "@/packages/math/path"
import { matrixDirection } from "@/packages/math/matrix"
import { distanceBetweenVector2 } from "@/packages/math/distanceBetweenVector3"

interface EntityGoPositionParams {
  entity: EntityInterface
  target: EntityInterface
  game?: GameInterface
}

export function entityGoToEntity({
  entity,
  target,
  game,
}: EntityGoPositionParams): PathResponseInterface {
  const targetPosition: Vector3Interface = target.position
  const entityPosition: Vector3Interface = entity.position

  const result = vector3MoveToVector(
    entityPosition,
    targetPosition,
    getEntitySpeed(entity, game),
  )

  entity.position.x = result.position.x
  entity.position.z = result.position.z
  entity.rotation = result.rotation

  return {
    distance: result.distance,
    isFinish: entityHasCollision(entity, target),
    unreachable: false,
  }
}

interface EntityGoPositionParamsWithGround {
  entity: EntityInterface
  target: EntityInterface
  game: GameInterface
}

function pathHash(
  entity: EntityInterface,
  target: EntityInterface,
  targetPositionRounded: Vector2Interface,
): string {
  return [
    entity["@id"],
    target["@id"],
    targetPositionRounded.x,
    targetPositionRounded.y,
  ].join("|")
}

function applyConsumablePath(
  entity: EntityInterface,
  path: ConsumablePathInterface,
): void {
  consumePath(path)
  entity.position.x = path.currentPosition.x
  entity.position.z = path.currentPosition.y
  if (path.currentRotation !== undefined) {
    entity.rotation = path.currentRotation
  }
}

export function entityGoToEntityWithGround({
  game,
  entity,
  target,
}: EntityGoPositionParamsWithGround): PathResponseInterface {
  const targetPosition = vector3ToVector2(target.position)
  const entityPosition = vector3ToVector2(entity.position)

  if (distanceBetweenVector2(entityPosition, targetPosition) < 1) {
    return entityGoToEntity({ entity, target, game })
  }

  const targetPositionRounded = roundVector(targetPosition)
  const entityPositionRounded = roundVector(entityPosition)
  const hash = pathHash(entity, target, targetPositionRounded)

  if (entity.currentPath && entity.currentPath.hash === hash) {
    applyConsumablePath(entity, entity.currentPath)
    return entity.currentPath
  }

  const directions: Vector2Interface[] = [
    createVector2(0, 0),
    ...Object.values(matrixDirection),
  ]
  let path: PathInterface | null = null

  for (const direction of directions) {
    path = findPathAStar(
      game.gameWorld.entitiesMatrix,
      entityPositionRounded,
      vectorAddition(direction, targetPositionRounded),
    )
    if (path) break
  }

  if (!path) {
    return {
      unreachable: true,
      distance: 0,
      isFinish: false,
    }
  }

  const pathExtended = extendVectorByDistance(path, getEntitySpeed(entity, game))
  entity.currentPath = createConsumablePath(pathExtended)
  entity.currentPath.hash = hash

  applyConsumablePath(entity, entity.currentPath)
  return entity.currentPath
}
