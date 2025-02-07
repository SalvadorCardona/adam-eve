import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import {
  InventoryItemMetadataInterface,
  InventoryItemRequest,
} from "@/src/game/inventory/InventoryItemInterface"

export function createInventoryItem(inventoryItemRequest: InventoryItemRequest) {
  const metaData = getMetaData<InventoryItemMetadataInterface>(
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
