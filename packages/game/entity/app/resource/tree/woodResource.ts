import { inventoryItemMedataFactory } from "@/packages/game/inventory/InventoryItemInterface"
import { appLdType } from "@/app/AppLdType"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import goldIcon from "@/packages/game/inventory/app/wheat/img.png"

export const woodResourceMetadata = inventoryItemMedataFactory({
  "@type": createJsonLdType(appLdType.entityResource, "wood"),
  asset: {
    icon: goldIcon,
  },
})
