import { InventoryMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"
import { inventoryFactory } from "@/src/game/inventory/inventoryFactory"

export const goldRessourceMetadata: InventoryMetadataInterface = {
  "@type": "ressource/gold",
  factory: inventoryFactory,
  asset: {
    icon: goldIcon,
  },
}
