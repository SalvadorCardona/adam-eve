import { getResource } from "@/packages/resource/ResourceInterface"
import {
  InventoryItemRequest,
  InventoryResource,
} from "@/packages/game/inventory/InventoryResource"

export function createInventoryItem(inventoryItemRequest: InventoryItemRequest) {
  const metaData = getResource<InventoryResource>(inventoryItemRequest.inventoryItem)
  return metaData.create({
    item: { quantity: inventoryItemRequest?.quantity ?? 0 },
  })
}
