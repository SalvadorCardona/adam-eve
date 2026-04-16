import { createResourceInventory } from "@/packages/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"

export const wheatResourceMetadata = createResourceInventory({
  "@type": "wheat",
  asset: {
    icon: goldIcon,
  },
})
