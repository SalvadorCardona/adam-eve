import {
  inventoryFactory,
  InventoryMetadataInterface,
} from "@/src/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"

export const wheatRessourceMetadata: InventoryMetadataInterface = {
  "@type": "ressource/wheat",
  factory: inventoryFactory,
  asset: {
    icon: goldIcon,
  },
}
