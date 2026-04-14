import { CanBeInventoryInterface } from "@/packages/game/inventory/InventoryInterface"
import { getTotalQuantityInInventory } from "@/packages/game/inventory/useCase/getTotalQuantityInInventory"
import { getInventory } from "@/packages/game/inventory/useCase/getInventory"

export function freeSpaceInInventory(
  canBeInventory: CanBeInventoryInterface,
): number {
  const inventory = getInventory(canBeInventory)
  const quantity = getTotalQuantityInInventory(canBeInventory)

  return inventory.size - quantity
}
