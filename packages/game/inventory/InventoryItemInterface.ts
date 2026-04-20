import { BaseJsonLdItemInterface, JsonLdType } from "@/packages/jsonLd/jsonLd"
import { BaseGameResource, createResourceGame } from "@/packages/game/BaseGameResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export interface InventoryItemInterface extends BaseJsonLdItemInterface {
  quantity: number
}

export type InventoryItemType = JsonLdType

export interface InventoryResource extends BaseGameResource<InventoryItemInterface> {}

export function createResourceInventory<
  T extends BaseGameResource<InventoryItemInterface> =
    BaseGameResource<InventoryItemInterface>,
>(resource: Partial<BaseGameResource> & Partial<T>): T {
  const meta = {
    "@type": "inventory",
    entityType: EntityType.resource,
    ...resource,
  }

  return createResourceGame<T>(meta)
}

export type CanBeInventoryItemInterface = InventoryItemType | BaseJsonLdItemInterface

export interface InventoryItemRequest {
  quantity?: number
  inventoryItem: CanBeInventoryItemInterface
}
