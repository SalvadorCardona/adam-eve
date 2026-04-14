import { InventoryInterface } from "@/packages/game/inventory/InventoryInterface"
import { createJsonLdCollection } from "@/packages/jsonLd/jsonLd"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { getResource } from "@/packages/metadata/MetadataInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { InventoryItemRequest } from "@/packages/game/inventory/InventoryItemInterface"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"

interface Params {
  size?: number
  entity?: EntityInterface
  items?: InventoryItemRequest[]
}

export function createInventory(params?: Params): InventoryInterface {
  const baseInventory: InventoryInterface = {
    ...createJsonLdCollection("inventory"),
    size: params?.size ?? Infinity,
  }

  if (params?.entity) {
    const metaData = getResource<EntityResourceInterface>(params.entity)
    baseInventory.size = metaData?.propriety?.inventorySize ?? Infinity
  }

  if (params?.items) {
    params.items.map((item) =>
      addToInventory(baseInventory, item.inventoryItem, item.quantity),
    )
  }

  return baseInventory
}
