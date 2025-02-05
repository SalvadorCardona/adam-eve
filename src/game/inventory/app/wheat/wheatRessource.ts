import { inventoryItemMedataFactory } from "@/src/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const wheatRessourceMetadata = inventoryItemMedataFactory({
  "@type": createJsonLdType(appLdType.ressource, "wheat"),
  asset: {
    icon: goldIcon,
  },
})
