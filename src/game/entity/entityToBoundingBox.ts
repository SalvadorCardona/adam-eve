import EntityInterface from "@/src/game/entity/EntityInterface"
import { BoundingInterface, createBoundingByOBB } from "@/src/utils/math/boudingBox"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Vector3Interface, vector3ToVector2 } from "@/src/utils/math/Vector"

export function entityToBoundingBox(entity: EntityInterface): BoundingInterface {
  const metaDataEntitySource = getMetaData<EntityMetaDataInterface>(entity)

  return createBoundingByOBB({
    position: vector3ToVector2(entity.position),
    size: vector3ToVector2(metaDataEntitySource.propriety.size as Vector3Interface),
    id: entity["@id"],
  })
}
