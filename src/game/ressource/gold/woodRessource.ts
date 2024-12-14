import {
  inventoryFactory,
  InventoryMetadataInterface,
} from "@/src/domain/inventory/InventoryItemInterface"
import goldIcon from "./img.png"

export const goldRessourceMetadata: InventoryMetadataInterface = {
  "@type": "ressource/gold",
  factory: inventoryFactory,
  asset: {
    icon: goldIcon,
  },
}
