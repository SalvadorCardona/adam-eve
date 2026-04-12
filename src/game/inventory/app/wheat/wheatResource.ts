import { inventoryItemMedataFactory } from "@/src/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"

export const wheatResourceMetadata = inventoryItemMedataFactory({
  "@type": createJsonLdType(appLdType.resource, "wheat"),
  asset: {
    icon: goldIcon,
  },
})
