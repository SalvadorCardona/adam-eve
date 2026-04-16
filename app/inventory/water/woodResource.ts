import { createResourceInventory } from "@/packages/game/inventory/InventoryItemInterface"
import waterIcon from "./img.png"

export const waterResourceMetadata = createResourceInventory({
  "@id": "water",
  asset: {
    icon: waterIcon,
  },
})
