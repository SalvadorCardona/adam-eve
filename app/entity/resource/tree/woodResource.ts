import { createResourceInventory } from "@/packages/game/inventory/InventoryItemInterface"
import goldIcon from "@/app/inventory/wheat/img.png"

export const woodResourceMetadata = createResourceInventory({
  "@id": "resource/wood",
  asset: {
    icon: goldIcon,
  },
})
