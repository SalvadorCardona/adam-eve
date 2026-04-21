import { InventoryInterface } from "@/packages/game/inventory/InventoryResource"
import { getTotalQuantityInInventory } from "@/packages/game/inventory/useCase/getTotalQuantityInInventory"

export function freeSpaceInInventory(inventory: InventoryInterface): number {
  const quantity = getTotalQuantityInInventory(inventory)

  return inventory.size - quantity
}
