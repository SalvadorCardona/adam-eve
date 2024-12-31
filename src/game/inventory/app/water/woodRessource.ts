import { InventoryMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import waterIcon from "./img.png"
import { inventoryFactory } from "@/src/game/inventory/inventoryFactory"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const waterRessourceMetadata: InventoryMetadataInterface = {
  "@type": JsonLdTypeFactory(appLdType.ressource, "water"),
  factory: inventoryFactory,
  asset: {
    icon: waterIcon,
  },
}
