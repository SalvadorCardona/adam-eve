import { createResourceInventory } from "@/packages/game/inventory/InventoryItemInterface"
import knowledgeIcon from "./icon.svg?url"

export const knowledgeResourceMetadata = createResourceInventory({
  "@id": "knowledge",
  label: "Savoir",
  asset: {
    icon: knowledgeIcon,
  },
})
