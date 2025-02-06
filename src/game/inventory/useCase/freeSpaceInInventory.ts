import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { getTotalQuantityInInventory } from "@/src/game/inventory/useCase/getTotalQuantityInInventory"
import { getInventory } from "@/src/game/inventory/useCase/getInventory"

export function freeSpaceInInventory(
  canBeInventory: CanBeInventoryInterface,
): number {
  const inventory = getInventory(canBeInventory)
  const quantity = getTotalQuantityInInventory(canBeInventory)

  return inventory.size - quantity
}
