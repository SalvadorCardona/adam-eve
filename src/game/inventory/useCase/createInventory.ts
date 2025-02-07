import { InventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { createJsonLdCollection } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { InventoryItemRequest } from "@/src/game/inventory/InventoryItemInterface"
import { addToInventory } from "@/src/game/inventory/useCase/addToInventory"

interface Params {
  size?: number
  entity?: EntityInterface
  items?: InventoryItemRequest[]
}

export function createInventory(params?: Params): InventoryInterface {
  const baseInventory: InventoryInterface = {
    ...createJsonLdCollection(appLdType.inventory),
    size: params?.size ?? Infinity,
  }

  if (params?.entity) {
    const metaData = getMetaData<EntityMetaDataInterface>(params.entity)
    baseInventory.size = metaData.propriety.inventorySize ?? Infinity
  }

  if (params?.items) {
    params.items.map((item) =>
      addToInventory(baseInventory, item.inventoryItem, item.quantity),
    )
  }

  return baseInventory
}
