import {
  CanBeInventoryInterface,
  InventoryAbleInterface,
  InventoryInterface,
} from "@/src/game/inventory/InventoryInterface"
import { appLdType } from "@/src/AppLdType"
import { createInventory } from "@/src/game/inventory/useCase/createInventory"
import EntityInterface from "@/src/game/entity/EntityInterface"

export function getInventory(
  inventory: CanBeInventoryInterface,
): InventoryInterface {
  if ("@type" in inventory && inventory["@type"] === appLdType.inventory) {
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
