import { InventoryMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"
import { inventoryFactory } from "@/src/game/inventory/inventoryFactory"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const goldRessourceMetadata: InventoryMetadataInterface = {
  "@type": JsonLdTypeFactory(appLdType.ressource, "gold"),
  factory: inventoryFactory,
  asset: {
    icon: goldIcon,
  },
}
