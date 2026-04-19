import { createResourceInventory } from "@/packages/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"

export const goldResourceMetadata = createResourceInventory({
  "@id": "resource/gold",
  asset: {
    icon: goldIcon,
  },
})
