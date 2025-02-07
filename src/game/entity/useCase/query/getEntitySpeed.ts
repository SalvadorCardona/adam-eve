import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"

export function getEntitySpeed(entity: EntityInterface): number {
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  return entityMetaData.propriety?.speed ?? 0.1
}
