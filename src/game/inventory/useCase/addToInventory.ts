import { getInventoryItem } from "@/src/game/inventory/useCase/getInventoryItem"
import { CanBeInventoryItemInterface } from "@/src/game/inventory/InventoryItemInterface"
import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { inventoryIsFull } from "@/src/game/inventory/useCase/inventoryIsFull"
import { freeSpaceInInventory } from "@/src/game/inventory/useCase/freeSpaceInInventory"

export function addToInventory(
  canBeInventory: CanBeInventoryInterface,
  inventoryType: CanBeInventoryItemInterface,
  quantity: number = 0,
): number {
  const currentItem = getInventoryItem(canBeInventory, inventoryType)

  if (quantity > 0) {
    if (inventoryIsFull(canBeInventory)) return 0

    const freeSpace = freeSpaceInInventory(canBeInventory)

    if (quantity > freeSpace) quantity = freeSpace
  }

  if (quantity < 0) {
    if (currentItem.quantity < Math.abs(quantity)) quantity = -currentItem.quantity
  }

  currentItem.quantity += quantity

  return quantity
}
