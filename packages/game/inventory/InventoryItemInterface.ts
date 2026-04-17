import { BaseJsonLdItemInterface, JsonLdType } from "@/packages/jsonLd/jsonLd"
import {
  BaseGameResource,
  createResourceGame,
} from "@/packages/game/BaseGameResource"

export interface InventoryItemInterface extends BaseJsonLdItemInterface {
  quantity: number
}

export type InventoryItemType = JsonLdType

export interface InventoryResource
  extends BaseGameResource<InventoryItemInterface> {}

export function createResourceInventory<
  T extends BaseGameResource<InventoryItemInterface> =
    BaseGameResource<InventoryItemInterface>,
>(resource: Partial<BaseGameResource> & Partial<T>): T {
  const meta = {
    "@type": "inventory",
    ...resource,
  }

  return createResourceGame<T>(meta)
}

export type CanBeInventoryItemInterface =
  | InventoryItemType
  | BaseJsonLdItemInterface

export interface InventoryItemRequest {
  quantity?: number
  inventoryItem: CanBeInventoryItemInterface
}
