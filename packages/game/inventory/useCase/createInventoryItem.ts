import { getResource } from "@/packages/resource/ResourceInterface"
import {
  InventoryItemInterface,
  InventoryItemRequest,
  InventoryResource,
} from "@/packages/game/inventory/InventoryItemInterface"

export function createInventoryItem(
  inventoryItemRequest: InventoryItemRequest,
): InventoryItemInterface {
  const metaData = getResource<InventoryResource>(inventoryItemRequest.inventoryItem)
  return metaData.create({
    item: { quantity: inventoryItemRequest?.quantity ?? 0 },
  })
}
