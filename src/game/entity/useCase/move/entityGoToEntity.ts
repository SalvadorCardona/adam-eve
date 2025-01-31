import EntityInterface from "@/src/game/entity/EntityInterface"
import { Vector3Interface } from "@/src/utils/math/vector"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import { vectorMoveToVector } from "@/src/utils/math/vectorMoveToVector"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"

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
