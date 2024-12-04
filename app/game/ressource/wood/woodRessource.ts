import {
  inventoryFactory,
  InventoryMetadataInterface,
} from "@/app/domain/inventory/InventoryItemInterface"
import woodIcon from "./img.png"

export const woodRessourceMetadata: InventoryMetadataInterface = {
  "@type": "ressource/wood",
  factory: inventoryFactory,
  asset: {
    icon: woodIcon.src,
  },
}
