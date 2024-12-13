import {
  inventoryFactory,
  InventoryMetadataInterface,
} from "@/src/domain/inventory/InventoryItemInterface"
import woodIcon from "./img.png"

export const woodRessourceMetadata: InventoryMetadataInterface = {
  "@type": "ressource/wood",
  factory: inventoryFactory,
  asset: {
    icon: woodIcon,
  },
}
