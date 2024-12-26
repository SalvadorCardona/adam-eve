import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { InventoryItemInterface } from "@/src/game/inventory/InventoryItemInterface"

export function inventoryFactory(payload: {
  quantity?: number
}): InventoryItemInterface {
  // @ts-ignore
  const type: string = this["@type"] ? this["@type"] : "unkwon"

  return jsonLdFactory<InventoryItemInterface>(type, payload)
}