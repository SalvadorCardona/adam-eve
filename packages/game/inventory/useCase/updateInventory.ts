import {
  InventoryInterface,
  InventoryResource,
} from "@/packages/game/inventory/InventoryResource"
import {
  ContainerAction,
  JsonLDItem,
  JsonLdTypeCollection,
  updateContainerByType,
  updateItem,
} from "@/packages/jsonLd/jsonLd"

export function updateInventory(
  inventory: InventoryInterface,
  item: InventoryResource,
): void {
  updateCollectionOfType(inventory, item)
}

function updateCollectionOfType(
  collection: JsonLdTypeCollection,
  item: JsonLDItem<any>,
  action: ContainerAction = ContainerAction.update,
): JsonLDItem<any> {
  updateContainerByType(collection.member, item, action)
  collection.totalItems = Object.keys(collection.member).length
  return updateItem(collection, action)
}
