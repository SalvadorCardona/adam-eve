import EntityInterface from "@/src/game/entity/EntityInterface"
import {
  bounding3ToBounding2,
  BoundingBox2DOBBInterface,
  boundingBox2DObbToAabb,
  BoundingBoxAABBInterface,
} from "@/src/utils/math/boudingBox"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Vector3Interface } from "@/src/utils/math/Vector"

export function entityToBoundingBox(
  entity: EntityInterface,
): BoundingBox2DOBBInterface {
  const metaDataEntitySource = getMetaData<EntityMetaDataInterface>(entity)

  return bounding3ToBounding2({
    position: entity.position,
    size: metaDataEntitySource.propriety.size as Vector3Interface,
  })
}

export function entityToBoundingOBB(
  entity: EntityInterface,
): BoundingBoxAABBInterface {
  const boundingObb = entityToBoundingBox(entity)
  return boundingBox2DObbToAabb(boundingObb)
}
