import {
  BaseJsonLdInterface,
  createJsonLd,
  JsonLdType,
} from "@/src/utils/jsonLd/jsonLd"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { metaDataFactory } from "@/src/utils/metadata/MetadataInterface"

export interface InventoryItemInterface extends BaseJsonLdInterface {
  quantity: number
}

export type InventoryItemType = JsonLdType

export interface InventoryItemMetadataInterface extends BaseGameMetaDataInterface {
  ["@type"]: InventoryItemType
  factory: (payload: { quantity?: number }) => InventoryItemInterface
}

export function inventoryItemMedataFactory<
  T extends InventoryItemMetadataInterface = InventoryItemMetadataInterface,
>(ressourceItemMetadata: Partial<T>): T {
  const meta = {
    "@type": "union",
    factory: inventoryItemFactory,
    ...ressourceItemMetadata,
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
