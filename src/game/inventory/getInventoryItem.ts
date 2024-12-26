import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { getMetaData } from "@/src/game/game/app/configGame"
import { updateInventory } from "@/src/game/inventory/updateInventory"
import {
  InventoryBagInterface,
  InventoryItemInterface,
  InventoryMetadataInterface,
} from "@/src/game/inventory/InventoryItemInterface"

export function getInventoryItem(
  inventory: InventoryBagInterface,
  inventoryType: JsonLdType,
): InventoryItemInterface {
  const item = inventory[inventoryType]
  if (item) return item

  const metaData = getMetaData<InventoryMetadataInterface>(inventoryType)

  const newItem =
    inventory[inventoryType] ??
    metaData.factory({
      quantity: 0,
    })

  updateInventory(inventory, newItem)

  return newItem
}
