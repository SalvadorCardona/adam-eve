import { inventoryItemMedataFactory } from "@/src/game/inventory/InventoryItemInterface"
import { appLdType } from "@/src/AppLdType"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import goldIcon from "@/src/game/inventory/app/wheat/img.png"

export const woodRessourceMetadata = inventoryItemMedataFactory({
  "@type": createJsonLdType(appLdType.entityRessource, "wood"),
  asset: {
    icon: goldIcon,
  },
})
