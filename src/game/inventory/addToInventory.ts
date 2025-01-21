import {
  InventoryBagInterface,
  InventoryType,
} from "@/src/game/inventory/InventoryItemInterface"
import { getInventoryItem } from "@/src/game/inventory/getInventoryItem"

export function addToInventory(
  inventory: InventoryBagInterface,
  inventoryType: InventoryType,
  quantity: number,
): void {
  const currentItem = getInventoryItem(inventory, inventoryType)
  currentItem.quantity += quantity
}
