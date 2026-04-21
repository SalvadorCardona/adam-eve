import { BaseJsonLdItemInterface, JsonLdType, JsonLdTypeCollection } from "@/packages/jsonLd/jsonLd"
import { BaseGameResource, createResourceGame } from "@/packages/game/BaseGameResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export interface InventoryItem extends BaseJsonLdItemInterface {
  quantity: number
}

export type InventoryItemType = JsonLdType

export type CanBeInventoryItemInterface = InventoryItemType | BaseJsonLdItemInterface

export interface InventoryItemRequest {
  quantity?: number
  inventoryItem: CanBeInventoryItemInterface
}

export type InventoryInterface = JsonLdTypeCollection<InventoryItem> & {
  size: number
}

export interface InventoryResource extends BaseGameResource<InventoryResource> {}

export function createResourceInventory<
  T extends BaseGameResource<InventoryResource> =
    BaseGameResource<InventoryResource>,
>(resource: Partial<BaseGameResource> & Partial<T>): T {
  const meta = {
    "@type": "inventory",
    entityType: EntityType.resource,
    ...resource,
  }

  return createResourceGame<T>(meta)
}
