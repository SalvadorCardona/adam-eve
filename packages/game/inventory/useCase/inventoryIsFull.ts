import { InventoryInterface } from "@/packages/game/inventory/InventoryResource"
import { freeSpaceInInventory } from "@/packages/game/inventory/useCase/freeSpaceInInventory"

export function inventoryIsFull(inventory: InventoryInterface): boolean {
  return freeSpaceInInventory(inventory) <= 0
}
