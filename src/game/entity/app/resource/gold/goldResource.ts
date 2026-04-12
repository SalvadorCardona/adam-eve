import { inventoryItemMedataFactory } from "@/src/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"

export const goldResourceMetadata = inventoryItemMedataFactory({
  "@type": createJsonLdType(appLdType.resource, "gold"),
  asset: {
    icon: goldIcon,
  },
})
