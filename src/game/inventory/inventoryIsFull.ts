import EntityInterface from "@/src/game/entity/EntityInterface"
import { getTotalQuantityInInventory } from "@/src/game/inventory/getTotalQuantityInInventory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getMetaData } from "@/src/game/game/app/getMetaData"

export function inventoryIsFull(entity: EntityInterface): boolean {
  const metaData = getMetaData<EntityMetaDataInterface>(entity)
  const quantity = getTotalQuantityInInventory(entity)

  if (
    metaData.propriety.inventorySize &&
    metaData.propriety.inventorySize > quantity
  ) {
    return true
  }

  return false
}
