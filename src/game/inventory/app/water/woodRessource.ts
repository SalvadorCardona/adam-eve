import {
  inventoryFactory,
  InventoryMetadataInterface,
} from "@/src/game/inventory/InventoryItemInterface"
import waterIcon from "./img.png"

export const waterRessourceMetadata: InventoryMetadataInterface = {
  "@type": "ressource/water",
  factory: inventoryFactory,
  asset: {
    icon: waterIcon,
  },
}
