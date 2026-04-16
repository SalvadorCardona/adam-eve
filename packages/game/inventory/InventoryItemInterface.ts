import { BaseJsonLdItemInterface, JsonLdType } from "@/packages/jsonLd/jsonLd"
import {
  BaseGameResource,
  createResourceGame,
} from "@/packages/game/BaseGameResource"

export interface InventoryItemInterface extends BaseJsonLdItemInterface {
  quantity: number
}

export type InventoryItemType = JsonLdType

export function createResourceInventory<
  T extends BaseGameResource<InventoryItemInterface> =
    BaseGameResource<InventoryItemInterface>,
>(resource: BaseGameResource & Partial<T>): T {
  const meta = {
    "@type": "inventory",
    ...resource,
  }

  return createResourceGame(meta)
}

export type CanBeInventoryItemInterface = InventoryItemType

export interface InventoryItemRequest {
  quantity?: number
  inventoryItem: CanBeInventoryItemInterface
}
