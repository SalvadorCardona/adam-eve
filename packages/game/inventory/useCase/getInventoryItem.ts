import {
  CanBeInventoryItemInterface,
  InventoryInterface,
  InventoryItem,
} from "@/packages/game/inventory/InventoryResource"
import { getLdIri } from "@/packages/jsonLd/jsonLd"
import { createInventoryItem } from "@/packages/game/inventory/useCase/createInventoryItem"

export function getInventoryItem(
  inventory: InventoryInterface,
  inventoryType: CanBeInventoryItemInterface,
): InventoryItem {
  const type = getLdIri(inventoryType)

  const item = inventory.member[type]

  if (item) return item

  const newItem = createInventoryItem({
    inventoryItem: type,
    quantity: 0,
  })

  return newItem
}
