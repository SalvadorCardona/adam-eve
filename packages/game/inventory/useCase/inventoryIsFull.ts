import { CanBeInventoryInterface } from "@/packages/game/inventory/InventoryInterface"
import { freeSpaceInInventory } from "@/packages/game/inventory/useCase/freeSpaceInInventory"

export function inventoryIsFull(canBeInventory: CanBeInventoryInterface): boolean {
  return freeSpaceInInventory(canBeInventory) <= 0
}
