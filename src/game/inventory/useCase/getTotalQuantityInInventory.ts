import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { getInventory } from "@/src/game/inventory/useCase/getInventory"

export function getTotalQuantityInInventory(
  canBeInventory: CanBeInventoryInterface,
): number {
  const inventory = getInventory(canBeInventory)

  let totalQuantity = 0

  for (const item of Object.values(inventory.collection)) {
    totalQuantity += item.quantity
  }

  return totalQuantity
}
