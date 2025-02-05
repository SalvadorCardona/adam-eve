import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { getTotalQuantityInInventory } from "@/src/game/inventory/useCase/getTotalQuantityInInventory"

export function freeSpaceInInventory(
  canBeInventory: CanBeInventoryInterface,
): number {
  const metaData = getMetaData<EntityMetaDataInterface>(
    canBeInventory as EntityInterface,
  )

  const quantity = getTotalQuantityInInventory(canBeInventory)
  const inventorySize = metaData.propriety.inventorySize ?? Infinity

  return inventorySize - quantity
}
