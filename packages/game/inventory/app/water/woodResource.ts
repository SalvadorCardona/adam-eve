import { inventoryItemMedataFactory } from "@/packages/game/inventory/InventoryItemInterface"
import waterIcon from "./img.png"

export const waterResourceMetadata = inventoryItemMedataFactory({
  "@id": "water",
  asset: {
    icon: waterIcon,
  },
})
