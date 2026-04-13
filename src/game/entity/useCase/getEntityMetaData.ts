import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import { getMetaData } from "@/packages/metadata/MetadataInterface"

export function getEntityMetaData(entity: EntityInterface): EntityResourceInterface {
  return getMetaData<EntityResourceInterface>(entity)
}
