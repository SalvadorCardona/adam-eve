import { getResource } from "@/packages/metadata/MetadataInterface"
import {
  InventoryItemMetadataInterface,
  InventoryItemRequest,
} from "@/packages/game/inventory/InventoryItemInterface"

export function createInventoryItem(inventoryItemRequest: InventoryItemRequest) {
  const metaData = getResource<InventoryItemMetadataInterface>(
    inventoryItemRequest.inventoryItem,
  )

  return metaData.factory({
    quantity: inventoryItemRequest?.quantity ?? 0,
  })
}

export function createInventoryItemByList(
  inventoryItemRequests: InventoryItemRequest[],
) {
  return inventoryItemRequests.map(createInventoryItem)
}
