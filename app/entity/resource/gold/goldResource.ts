import { inventoryItemMedataFactory } from "@/packages/game/inventory/InventoryItemInterface"
import goldIcon from "./img.png"

export const goldResourceMetadata = inventoryItemMedataFactory({
  "@id": "gold",
  asset: {
    icon: goldIcon,
  },
})
