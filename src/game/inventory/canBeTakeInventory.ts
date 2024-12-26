import {
  InventoryBagInterface,
  InventoryType,
} from "@/src/game/inventory/InventoryItemInterface"
import { getInventoryItem } from "@/src/game/inventory/getInventoryItem"

export function canBeTakeInventory(
  source: InventoryBagInterface,
  inventoryType: InventoryType,
  quantity: number,
): boolean {
  const sourceItem = getInventoryItem(source, inventoryType)

  return sourceItem.quantity >= quantity
}
