import {
  CanBeInventoryInterface,
  InventoryAbleInterface,
  InventoryInterface,
} from "@/packages/game/inventory/InventoryInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import EntityInterface from "@/packages/game/entity/EntityInterface"

export function getInventory(
  inventory: CanBeInventoryInterface,
): InventoryInterface {
  if ("@type" in inventory && inventory["@type"] === "inventory") {
    return inventory
  }

  if ("inventory" in inventory) {
    return inventory.inventory as InventoryInterface
  }

  ;(inventory as InventoryAbleInterface).inventory = createInventory({
    entity: inventory as EntityInterface,
  })

  return (inventory as InventoryAbleInterface).inventory as InventoryInterface
}
