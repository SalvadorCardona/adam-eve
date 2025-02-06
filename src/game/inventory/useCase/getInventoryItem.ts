import { updateInventory } from "@/src/game/inventory/useCase/updateInventory"
import {
  CanBeInventoryItemInterface,
  InventoryItemInterface,
} from "@/src/game/inventory/InventoryItemInterface"
import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { getInventory } from "@/src/game/inventory/useCase/getInventory"
import { getLdType } from "@/src/utils/jsonLd/jsonLd"
import { createInventoryItem } from "@/src/game/inventory/useCase/createInventoryItem"

export function getInventoryItem(
  canBeInventory: CanBeInventoryInterface,
  inventoryType: CanBeInventoryItemInterface,
): InventoryItemInterface {
  const inventory = getInventory(canBeInventory)
  const type = getLdType(inventoryType)
  const item = inventory.collection[type]

  if (item) return item

  const newItem = createInventoryItem({
    inventoryItem: type,
    quantity: 0,
  })

  updateInventory(inventory, newItem)

  return newItem
}
