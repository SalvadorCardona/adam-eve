import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import { getMetaData } from "@/packages/metadata/MetadataInterface"

export function getEntitySpeed(entity: EntityInterface): number {
  const entityMetaData = getMetaData(entity) as EntityResourceInterface
  return entityMetaData.propriety?.speed ?? 0.1
}
