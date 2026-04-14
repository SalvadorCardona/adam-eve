import EntityInterface from "@/packages/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { getResource } from "@/packages/metadata/MetadataInterface"

export function getEntityMetaData(entity: EntityInterface): EntityResourceInterface {
  return getResource<EntityResourceInterface>(entity)
}
