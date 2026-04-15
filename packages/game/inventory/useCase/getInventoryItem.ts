import { updateInventory } from "@/packages/game/inventory/useCase/updateInventory"
import {
  CanBeInventoryItemInterface,
  InventoryItemInterface,
} from "@/packages/game/inventory/InventoryItemInterface"
import { CanBeInventoryInterface } from "@/packages/game/inventory/InventoryInterface"
import { getInventory } from "@/packages/game/inventory/useCase/getInventory"
import { getLdType } from "@/packages/jsonLd/jsonLd"
import { createInventoryItem } from "@/packages/game/inventory/useCase/createInventoryItem"

export function getInventoryItem(
  canBeInventory: CanBeInventoryInterface,
  inventoryType: CanBeInventoryItemInterface,
): InventoryItemInterface {
  const inventory = getInventory(canBeInventory)
  const type = getLdType(inventoryType)
  const item = inventory.member[type]

  if (item) return item

  const newItem = createInventoryItem({
    inventoryItem: type,
    quantity: 0,
  })

  updateInventory(inventory, newItem)

  return newItem
}
