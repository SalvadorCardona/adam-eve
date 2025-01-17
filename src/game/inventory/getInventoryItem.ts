import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { updateInventory } from "@/src/game/inventory/updateInventory"
import {
  InventoryBagInterface,
  InventoryItemInterface,
  InventoryMetadataInterface,
} from "@/src/game/inventory/InventoryItemInterface"
import { getMetaData } from "@/src/game/game/app/getMetaData"

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
