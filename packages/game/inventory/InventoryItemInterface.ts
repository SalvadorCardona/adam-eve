import {
  BaseJsonLdItemInterface,
  createJsonLd,
  JsonLdType,
} from "@/packages/jsonLd/jsonLd"
import { BaseGameMetaDataInterface } from "@/packages/game/BaseGameMetaDataInterface"
import { metaDataFactory } from "@/packages/metadata/MetadataInterface"

export interface InventoryItemInterface extends BaseJsonLdItemInterface {
  quantity: number
}

export type InventoryItemType = JsonLdType

export interface InventoryItemMetadataInterface extends BaseGameMetaDataInterface {
  ["@type"]: InventoryItemType
  factory: (payload: { quantity?: number }) => InventoryItemInterface
}

export function inventoryItemMedataFactory<
  T extends InventoryItemMetadataInterface = InventoryItemMetadataInterface,
>(resourceItemMetadata: Partial<T>): T {
  const meta = {
    "@type": "inventory",
    factory: inventoryItemFactory,
    ...resourceItemMetadata,
  } as T

  return metaDataFactory(meta) as T
}

export function inventoryItemFactory(payload: {
  quantity?: number
}): InventoryItemInterface {
  // @ts-ignore
  const type: string = this["@type"] ? this["@type"] : "unkwon"

  return createJsonLd<InventoryItemInterface>(type, payload)
}

export type CanBeInventoryItemInterface =
  | InventoryItemType
  | InventoryItemMetadataInterface

export interface InventoryItemRequest {
  quantity?: number
  inventoryItem: CanBeInventoryItemInterface
}
