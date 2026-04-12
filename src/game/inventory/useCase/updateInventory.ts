import { InventoryItemInterface } from "@/src/game/inventory/InventoryItemInterface"
import { InventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { updateCollectionOfType } from "@/packages/jsonLd/jsonLd"

export function updateInventory(
  inventory: InventoryInterface,
  item: InventoryItemInterface,
): void {
  updateCollectionOfType(inventory, item)
}
