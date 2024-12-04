import {
  BaseJsonLdInterface,
  jsonLdFactory,
  JsonLdType,
} from "@/packages/utils/jsonLd/jsonLd"
import { MetaDataInterface } from "@/app/domain/MetaDataInterface"
import { JsonLdTypeContainerInterface } from "@/packages/container/container"

export type InventoryInterface = JsonLdTypeContainerInterface<InventoryItemInterface>

export interface InventoryItemInterface extends BaseJsonLdInterface {
  quantity: number
}

export interface InventoryMetadataInterface extends MetaDataInterface {
  factory: (payload: {
    inventory: Partial<InventoryItemInterface>
  }) => InventoryItemInterface
}

export function inventoryFactory(payload: {
  inventory: Partial<InventoryItemInterface>
}): InventoryItemInterface {
  // @ts-ignore
  const type: string = this["@type"] ? this["@type"] : "unkwon"

  return jsonLdFactory<InventoryItemInterface>(type, {
    quantity: 0,
    ...payload.inventory,
  })
}

export function getInventoryItem(
  inventory: InventoryInterface,
  inventoryType: JsonLdType,
): InventoryItemInterface | undefined {
  return inventory[inventoryType] ?? undefined
}
