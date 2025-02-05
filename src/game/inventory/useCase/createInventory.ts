import { InventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { createJsonLdCollection } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export function createInventory(): InventoryInterface {
  return createJsonLdCollection(appLdType.inventory)
}
