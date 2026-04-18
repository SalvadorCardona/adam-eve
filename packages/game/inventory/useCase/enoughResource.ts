import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import { CanBeInventoryInterface } from "@/packages/game/inventory/InventoryInterface"
import { getInventory } from "@/packages/game/inventory/useCase/getInventory"

export function enoughResource(
  inventorySource: CanBeInventoryInterface,
  inventoryTarget: CanBeInventoryInterface,
): boolean {
  const currentInventorySource = getInventory(inventorySource)
  const currentInventoryTarget = getInventory(inventoryTarget)

  return Object.values(currentInventorySource.member ?? {}).every((resource) => {
    if (!resource["@type"]) return true
    const resourceTarget = getInventoryItem(
      currentInventoryTarget,
      resource["@type"],
    )

    return resource.quantity <= resourceTarget.quantity
  })
}
