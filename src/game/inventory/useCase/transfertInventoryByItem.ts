import { getInventoryItem } from "@/src/game/inventory/useCase/getInventoryItem"
import { CanBeInventoryItemInterface } from "@/src/game/inventory/InventoryItemInterface"
import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { addToInventory } from "@/src/game/inventory/useCase/addToInventory"

export function transfertInventoryByItem(
  source: CanBeInventoryInterface,
  target: CanBeInventoryInterface,
  inventoryType: CanBeInventoryItemInterface,
  quantity: number,
): number | 0 {
  const sourceItem = getInventoryItem(source, inventoryType)
  const sourceQuantity = sourceItem.quantity

  const transferableQuantity = Math.min(sourceQuantity, quantity)

  addToInventory(source, inventoryType, -transferableQuantity)
  addToInventory(target, inventoryType, transferableQuantity)

  return transferableQuantity
}
