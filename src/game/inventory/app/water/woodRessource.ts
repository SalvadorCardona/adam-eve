import { InventoryMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import waterIcon from "./img.png"
import { inventoryFactory } from "@/src/game/inventory/inventoryFactory"

export const waterRessourceMetadata: InventoryMetadataInterface = {
  "@type": "ressource/water",
  factory: inventoryFactory,
  asset: {
    icon: waterIcon,
  },
}
