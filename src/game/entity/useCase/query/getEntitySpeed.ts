import EntityInterface from "@/src/game/entity/EntityInterface"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"

export function getEntitySpeed(entity: EntityInterface): number {
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  return entityMetaData.propriety?.speed ?? 0.1
}
