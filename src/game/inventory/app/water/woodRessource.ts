import { inventoryItemMedataFactory } from "@/src/game/inventory/InventoryItemInterface"
import waterIcon from "./img.png"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const waterRessourceMetadata = inventoryItemMedataFactory({
  "@type": createJsonLdType(appLdType.ressource, "water"),
  asset: {
    icon: waterIcon,
  },
})
