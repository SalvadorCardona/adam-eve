import EntityInterface from "@/src/game/entity/EntityInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import { getTotalQuantityInInventory } from "@/src/game/inventory/getTotalQuantityInInventory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"

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
