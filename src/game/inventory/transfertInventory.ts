import {
  InventoryBagInterface,
  InventoryType,
} from "@/src/game/inventory/InventoryItemInterface"
import { getInventoryItem } from "@/src/game/inventory/getInventoryItem"

export function transfertInventory(
  source: InventoryBagInterface,
  target: InventoryBagInterface,
  inventoryType: InventoryType,
  quantity: number,
): number | 0 {
  const sourceItem = getInventoryItem(source, inventoryType)
  const targetItem = getInventoryItem(target, inventoryType)
  const sourceQuantity = sourceItem.quantity
  const targetQuantity = targetItem.quantity

  const transferableQuantity = Math.min(sourceQuantity, quantity)

  sourceItem.quantity -= transferableQuantity
  targetItem.quantity += transferableQuantity

  return transferableQuantity
}
