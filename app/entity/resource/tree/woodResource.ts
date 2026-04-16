import { createResourceInventory } from "@/packages/game/inventory/InventoryItemInterface"
import { appLdType } from "@/app/AppLdType"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import goldIcon from "@/app/inventory/wheat/img.png"

export const woodResourceMetadata = createResourceInventory({
  "@type": createJsonLdType(appLdType.entityResource, "wood"),
  asset: {
    icon: goldIcon,
  },
})
