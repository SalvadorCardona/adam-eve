import { InventoryMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import woodIcon from "./img.png"
import { inventoryFactory } from "@/src/game/inventory/inventoryFactory"
import { appLdType } from "@/src/AppLdType"

export const woodRessourceMetadata: InventoryMetadataInterface = {
  "@type": appLdType.woodRessource,
  factory: inventoryFactory,
  asset: {
    icon: woodIcon,
  },
}
