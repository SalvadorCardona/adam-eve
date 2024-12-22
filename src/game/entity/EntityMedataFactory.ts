import { entityFactory } from "@/src/game/entity/entityFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"

export function entityMedataFactory<
  T extends EntityMetaDataInterface = EntityMetaDataInterface,
>(entityMetaData: Partial<T>): T {
  if (!entityMetaData["@type"]) {
    throw new Error("Type is not defined, is recommended to use factory")
  }

  return {
    "@type": "union",
    factory: entityFactory,
    ...entityMetaData,
  } as T
}
