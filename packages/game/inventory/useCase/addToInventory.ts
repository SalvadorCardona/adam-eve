import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import {
  CanBeInventoryItemInterface,
  InventoryInterface,
} from "@/packages/game/inventory/InventoryResource"
import { inventoryIsFull } from "@/packages/game/inventory/useCase/inventoryIsFull"
import { freeSpaceInInventory } from "@/packages/game/inventory/useCase/freeSpaceInInventory"
import { updateInventory } from "@/packages/game/inventory/useCase/updateInventory"

export function addToInventory(
  inventory: InventoryInterface,
  inventoryType: CanBeInventoryItemInterface,
  quantity: number = 0,
): number {
  console.log(inventoryType)
  const currentItem = getInventoryItem(inventory, inventoryType)
  if (quantity > 0) {
    if (inventoryIsFull(inventory)) return 0

    const freeSpace = freeSpaceInInventory(inventory)

    if (quantity > freeSpace) quantity = freeSpace
  }

  if (quantity < 0 && currentItem.quantity < Math.abs(quantity)) {
    quantity = currentItem.quantity === 0 ? 0 : -currentItem.quantity
  }

  currentItem.quantity += quantity

  updateInventory(inventory, currentItem)

  return quantity
}
