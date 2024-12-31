import { InventoryMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import woodIcon from "./img.png"
import { inventoryFactory } from "@/src/game/inventory/inventoryFactory"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const woodRessourceMetadata: InventoryMetadataInterface = {
  "@type": JsonLdTypeFactory(appLdType.ressource, "wood"),
  factory: inventoryFactory,
  asset: {
    icon: woodIcon,
  },
}
