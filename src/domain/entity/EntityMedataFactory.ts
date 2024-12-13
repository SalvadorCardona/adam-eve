import { entityFactory } from "@/src/domain/entity/entityFactory"
import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"

export function entityMedataFactory(
  entityMetaData: Partial<EntityMetaDataInterface>,
): EntityMetaDataInterface {
  if (!entityMetaData["@type"]) {
    throw new Error("Type is not defined, is recommended to use factory")
  }

  return {
    factory: entityFactory,
    ...entityMetaData,
  }
}