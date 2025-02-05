import { getInventoryItem } from "@/src/game/inventory/useCase/getInventoryItem"
import { CanBeInventoryItemInterface } from "@/src/game/inventory/InventoryItemInterface"
import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { inventoryIsFull } from "@/src/game/inventory/useCase/inventoryIsFull"
import { freeSpaceInInventory } from "@/src/game/inventory/useCase/freeSpaceInInventory"

export function addToInventory(
  canBeInventory: CanBeInventoryInterface,
  inventoryType: CanBeInventoryItemInterface,
  quantity: number,
): void {
  const currentItem = getInventoryItem(canBeInventory, inventoryType)

  if (inventoryIsFull(canBeInventory)) return

  const freeSpace = freeSpaceInInventory(canBeInventory)

  if (quantity > freeSpace) quantity = freeSpace

  currentItem.quantity += quantity
}
