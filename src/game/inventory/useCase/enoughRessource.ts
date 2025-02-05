import { getInventoryItem } from "@/src/game/inventory/useCase/getInventoryItem"
import { CanBeInventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { getInventory } from "@/src/game/inventory/useCase/getInventory"

export function enoughRessource(
  inventorySource: CanBeInventoryInterface,
  inventoryTarget: CanBeInventoryInterface,
): boolean {
  const currentInventorySource = getInventory(inventorySource)
  const currentInventoryTarget = getInventory(inventoryTarget)

  return Object.values(currentInventorySource).every((ressource) => {
    const ressourceTarget = getInventoryItem(
      currentInventoryTarget,
      ressource["@type"],
    )

    return ressource.quantity <= ressourceTarget.quantity
  })
}
