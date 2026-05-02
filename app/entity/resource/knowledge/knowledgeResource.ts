import { createResourceInventory } from "@/packages/game/inventory/InventoryResource"
import knowledgeIcon from "./icon.png"

export const knowledgeResourceMetadata = createResourceInventory({
  "@id": "knowledge",
  label: "Savoir",
  asset: {
    icon: knowledgeIcon,
  },
})
