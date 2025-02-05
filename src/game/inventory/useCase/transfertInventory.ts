import { getInventoryItem } from "@/src/game/inventory/useCase/getInventoryItem"
import { CanBeInventoryItemInterface } from "@/src/game/inventory/InventoryItemInterface"
import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { getInventory } from "@/src/game/inventory/useCase/getInventory"

export function transfertInventory(
  source: CanBeInventoryInterface,
  target: CanBeInventoryInterface,
  inventoryType: CanBeInventoryItemInterface,
  quantity: number,
): number | 0 {
  const inventorySource = getInventory(source)
  const inventoryTarget = getInventory(target)

  const sourceItem = getInventoryItem(inventorySource, inventoryType)
  const targetItem = getInventoryItem(inventoryTarget, inventoryType)
  const sourceQuantity = sourceItem.quantity

  const transferableQuantity = Math.min(sourceQuantity, quantity)

  sourceItem.quantity -= transferableQuantity
  targetItem.quantity += transferableQuantity

  return transferableQuantity
}
