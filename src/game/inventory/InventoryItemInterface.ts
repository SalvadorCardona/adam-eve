import {
  BaseJsonLdInterface,
  createJsonLd,
  JsonLdType,
} from "@/src/utils/jsonLd/jsonLd"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"

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
  if (!ressourceItemMetadata["@type"]) {
    throw new Error("Type is not defined, is recommended to use factory")
  }

  return {
    "@type": "union",
    factory: inventoryItemFactory,
    ...ressourceItemMetadata,
  } as T
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
