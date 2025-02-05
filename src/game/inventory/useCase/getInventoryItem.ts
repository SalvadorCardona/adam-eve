import { updateInventory } from "@/src/game/inventory/useCase/updateInventory"
import {
  CanBeInventoryItemInterface,
  InventoryItemInterface,
  InventoryItemMetadataInterface,
} from "@/src/game/inventory/InventoryItemInterface"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { getInventory } from "@/src/game/inventory/useCase/getInventory"
import { getLdType } from "@/src/utils/jsonLd/jsonLd"

export function getInventoryItem(
  canBeInventory: CanBeInventoryInterface,
  inventoryType: CanBeInventoryItemInterface,
): InventoryItemInterface {
  const inventory = getInventory(canBeInventory)
  const type = getLdType(inventoryType)
  const item = inventory.collection[type]

  if (item) return item

  const metaData = getMetaData<InventoryItemMetadataInterface>(type)

  const newItem = metaData.factory({
    quantity: 0,
  })

  updateInventory(inventory, newItem)

  return newItem
}
