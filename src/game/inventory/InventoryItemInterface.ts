import {
  BaseJsonLdInterface,
  jsonLdFactory,
  JsonLdType,
} from "@/src/utils/jsonLd/jsonLd"
import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import { JsonLdTypeContainerInterface } from "@/src/container/container"
import { getMetaData } from "@/src/game/game/app/configGame"

export interface InventoryItemInterface extends BaseJsonLdInterface {
  quantity: number
}

export type InventoryInterface = JsonLdTypeContainerInterface<InventoryItemInterface>

export interface InventoryMetadataInterface extends GameMetaDataInterface {
  factory: (payload: { quantity?: number }) => InventoryItemInterface
}

export function inventoryFactory(payload: {
  quantity?: number
}): InventoryItemInterface {
  // @ts-ignore
  const type: string = this["@type"] ? this["@type"] : "unkwon"

  return jsonLdFactory<InventoryItemInterface>(type, {
    quantity: payload?.quantity ?? 0,
  })
}

export function updateInventory(
  inventory: InventoryInterface,
  item: InventoryItemInterface,
): void {
  inventory[item["@type"]] = item
}

export function addToInventory(
  inventory: InventoryInterface,
  item: InventoryItemInterface,
): void {
  const currentItem = getInventoryItem(inventory, item["@type"])
  currentItem.quantity += item.quantity
}

export function getInventoryItem(
  inventory: InventoryInterface,
  inventoryType: JsonLdType,
): InventoryItemInterface {
  const item = inventory[inventoryType]
  if (item) return item

  const metaData = getMetaData<InventoryMetadataInterface>(inventoryType)

  const newItem =
    inventory[inventoryType] ??
    metaData.factory({
      quantity: 0,
    })

  updateInventory(inventory, newItem)

  return newItem
}
