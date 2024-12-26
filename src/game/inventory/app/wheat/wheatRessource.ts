import { InventoryMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"
import { inventoryFactory } from "@/src/game/inventory/inventoryFactory"

export const wheatRessourceMetadata: InventoryMetadataInterface = {
  "@type": "ressource/wheat",
  factory: inventoryFactory,
  asset: {
    icon: goldIcon,
  },
}
