import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import { InventoryInterface } from "@/packages/game/inventory/InventoryResource"

export function enoughResource(
  inventorySource: InventoryInterface,
  inventoryTarget: InventoryInterface,
): boolean {
  return Object.values(inventorySource.member ?? {}).every((resource) => {
    if (!inventorySource["@type"] || !resource["@type"]) return true
    const resourceTarget = getInventoryItem(inventoryTarget, resource["@type"])

    return resource.quantity <= resourceTarget.quantity
  })
}
