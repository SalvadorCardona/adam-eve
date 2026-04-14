import { InventoryItemInterface } from "@/packages/game/inventory/InventoryItemInterface"
import { InventoryInterface } from "@/packages/game/inventory/InventoryInterface"
import { updateCollectionOfType } from "@/packages/jsonLd/jsonLd"

export function updateInventory(
  inventory: InventoryInterface,
  item: InventoryItemInterface,
): void {
  updateCollectionOfType(inventory, item)
}
