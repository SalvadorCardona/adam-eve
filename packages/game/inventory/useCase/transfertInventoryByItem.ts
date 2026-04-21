import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import {
  CanBeInventoryItemInterface,
  InventoryInterface,
} from "@/packages/game/inventory/InventoryResource"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"

export function transfertInventoryByItem(
  source: InventoryInterface,
  target: InventoryInterface,
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
