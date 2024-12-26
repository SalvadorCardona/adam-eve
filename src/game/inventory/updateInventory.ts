import {
  InventoryBagInterface,
  InventoryItemInterface,
} from "@/src/game/inventory/InventoryItemInterface"

export function updateInventory(
  inventory: InventoryBagInterface,
  item: InventoryItemInterface,
): void {
  inventory[item["@type"]] = item
}
