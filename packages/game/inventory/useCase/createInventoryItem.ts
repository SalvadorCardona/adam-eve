import { getResource } from "@/packages/resource/ResourceInterface"
import {
  InventoryItemRequest,
  InventoryResource,
} from "@/packages/game/inventory/InventoryItemInterface"

export function createInventoryItem(inventoryItemRequest: InventoryItemRequest) {
  const metaData = getResource<InventoryResource>(inventoryItemRequest.inventoryItem)

  return metaData.factory({
    quantity: inventoryItemRequest?.quantity ?? 0,
  })
}

export function createInventoryItemByList(
  inventoryItemRequests: InventoryItemRequest[],
) {
  return inventoryItemRequests.map(createInventoryItem)
}
