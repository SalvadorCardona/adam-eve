import { InventoryInterface } from "@/packages/game/inventory/InventoryResource"

export function getTotalQuantityInInventory(inventory: InventoryInterface): number {
  let totalQuantity = 0

  for (const item of Object.values(inventory.member)) {
    totalQuantity += item.quantity
  }

  return totalQuantity
}
