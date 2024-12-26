import { BaseJsonLdInterface, JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import { JsonLdTypeContainerInterface } from "@/src/container/container"

export interface InventoryItemInterface extends BaseJsonLdInterface {
  quantity: number
}

export type InventoryType = JsonLdType

export type InventoryBagInterface =
  JsonLdTypeContainerInterface<InventoryItemInterface>

export interface InventoryMetadataInterface extends GameMetaDataInterface {
  ["@type"]: InventoryType
  factory: (payload: { quantity?: number }) => InventoryItemInterface
}
