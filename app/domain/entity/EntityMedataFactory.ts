import { entityFactory } from "@/app/domain/entity/entityFactory"
import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"

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
