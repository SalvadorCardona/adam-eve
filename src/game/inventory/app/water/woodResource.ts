import { inventoryItemMedataFactory } from "@/src/game/inventory/InventoryItemInterface"
import waterIcon from "./img.png"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"

export const waterResourceMetadata = inventoryItemMedataFactory({
  "@type": createJsonLdType(appLdType.resource, "water"),
  asset: {
    icon: waterIcon,
  },
})
