import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { freeSpaceInInventory } from "@/src/game/inventory/useCase/freeSpaceInInventory"

export function inventoryIsFull(canBeInventory: CanBeInventoryInterface): boolean {
  return freeSpaceInInventory(canBeInventory) <= 0
}
