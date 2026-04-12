import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getMetaData } from "@/packages/metadata/MetadataInterface"

export function getEntityMetaData(entity: EntityInterface): EntityMetaDataInterface {
  return getMetaData<EntityMetaDataInterface>(entity)
}
