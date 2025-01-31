import EntityInterface from "@/src/game/entity/EntityInterface"
import { Vector3Interface } from "@/src/utils/math/vector"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import { vectorMoveToVector } from "@/src/utils/math/vectorMoveToVector"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { entitiesToMatrix } from "@/src/game/entity/transformer/entitiesToMatrix"
import { getEntitiesInGame } from "@/src/game/game/useCase/query/getEntitiesInGame"
import { findPathAStar } from "@/src/utils/math/findPath"

interface EntityGoPositionParams {
  entity: EntityInterface
  target: EntityInterface
}

interface EntityGoPositionOutput {
  distance: number
  isFinish: boolean
}

export function entityGoToEntity({
  entity,
  target,
}: EntityGoPositionParams): EntityGoPositionOutput {
  const targetPosition: Vector3Interface = target.position
  const entityPosition: Vector3Interface = entity.position
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface

  const result = vectorMoveToVector(
    entityPosition,
    targetPosition,
    entityMetaData.propriety?.speed ?? 0.1,
  )

  entity.position = result.position
  entity.rotation = result.rotation

  return {
    distance: result.distance,
    isFinish: entityHasCollision(entity, target),
  }
}

interface EntityGoPositionParamsWithGround {
  entity: EntityInterface
  target: EntityInterface
  game: GameInterface
}

export function entityGoToEntityWithCollision({
  game,
  entity,
  target,
}: EntityGoPositionParamsWithGround): EntityGoPositionOutput {
  const targetPosition: Vector3Interface = target.position
  const entityPosition: Vector3Interface = entity.position
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  const entitySpeed = entityMetaData.propriety?.speed ?? 0.1
  const gameMatrix = entitiesToMatrix(getEntitiesInGame(game))
  const path = findPathAStar(gameMatrix, entityPosition, targetPosition)

  if (!path) {
    return {
      distance: 0,
      isFinish: true,
    }
  }
  return {
    distance: result.distance,
    isFinish: entityHasCollision(entity, target),
  }
}
