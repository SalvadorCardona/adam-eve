import EntityInterface from "@/src/game/entity/EntityInterface"
import { Vector3Interface } from "@/src/utils/math/vector"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"

export function getEntitySize(entity: EntityInterface): Vector3Interface {
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface

  return entityMetaData?.propriety?.size
    ? {
        x: entityMetaData.propriety.size.x ?? 0,
        y: entityMetaData.propriety.size.y ?? 0,
        z: entityMetaData.propriety.size.z ?? 0,
      }
    : { x: 0, y: 0, z: 0 }
}
