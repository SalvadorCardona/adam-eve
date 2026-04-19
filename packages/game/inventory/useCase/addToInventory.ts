import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import { CanBeInventoryItemInterface } from "@/packages/game/inventory/InventoryItemInterface"
import { CanBeInventoryInterface } from "@/packages/game/inventory/InventoryInterface"
import { inventoryIsFull } from "@/packages/game/inventory/useCase/inventoryIsFull"
import { freeSpaceInInventory } from "@/packages/game/inventory/useCase/freeSpaceInInventory"

export function addToInventory(
  canBeInventory: CanBeInventoryInterface,
  inventoryType: CanBeInventoryItemInterface,
  quantity: number = 0,
): number {
  const currentItem = getInventoryItem(canBeInventory, inventoryType)
  console.log(canBeInventory)
  if (quantity > 0) {
    if (inventoryIsFull(canBeInventory)) return 0

    const freeSpace = freeSpaceInInventory(canBeInventory)

    if (quantity > freeSpace) quantity = freeSpace
  }

  if (quantity < 0) {
    if (currentItem.quantity < Math.abs(quantity)) {
      quantity = currentItem.quantity === 0 ? 0 : -currentItem.quantity
    }
  }

  currentItem.quantity += quantity

  return quantity
}
