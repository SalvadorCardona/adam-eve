import { inventoryItemMedataFactory } from "@/packages/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"

export const wheatResourceMetadata = inventoryItemMedataFactory({
  "@type": "wheat",
  asset: {
    icon: goldIcon,
  },
})
