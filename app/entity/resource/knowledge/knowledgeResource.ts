import { createResourceInventory } from "@/packages/game/inventory/InventoryItemInterface"
import { appLdType } from "@/app/AppLdType"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import knowledgeIcon from "./icon.svg?url"

export const knowledgeResourceMetadata = createResourceInventory({
  "@id": createJsonLdType(appLdType.entityResource, "knowledge"),
  label: "Savoir",
  asset: {
    icon: knowledgeIcon,
  },
})
