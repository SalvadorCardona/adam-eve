import {
  inventoryFactory,
  InventoryMetadataInterface,
} from "@/src/domain/inventory/InventoryItemInterface"
import waterIcon from "./img.png"

export const waterRessourceMetadata: InventoryMetadataInterface = {
  "@type": "ressource/water",
  factory: inventoryFactory,
  asset: {
    icon: waterIcon,
  },
}
