import EntityInterface from "@/packages/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { getResource } from "@/packages/metadata/MetadataInterface"

export function getEntitySpeed(entity: EntityInterface): number {
  const entityMetaData = getResource(entity) as EntityResourceInterface
  return entityMetaData.propriety?.speed ?? 0.1
}
