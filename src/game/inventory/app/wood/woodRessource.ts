import { InventoryMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import woodIcon from "./img.png"
import { inventoryFactory } from "@/src/game/inventory/inventoryFactory"

export const woodRessourceMetadata: InventoryMetadataInterface = {
  "@type": "ressource/wood",
  factory: inventoryFactory,
  asset: {
    icon: woodIcon,
  },
}
