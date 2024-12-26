import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { getInventoryItem } from "@/src/game/inventory/getInventoryItem"

export function enoughRessource(
  inventorySource: InventoryBagInterface,
  inventoryTarget: InventoryBagInterface,
): boolean {
  return Object.values(inventorySource).every((ressource) => {
    const ressourceTarget = getInventoryItem(inventoryTarget, ressource["@type"])

    return ressource.quantity <= ressourceTarget.quantity
  })
}
