import { createResourceInventory } from "@/packages/game/inventory/InventoryResource"
import goldIcon from "./img.png"

export const goldResourceMetadata = createResourceInventory({
  "@id": "resource/gold",
  asset: {
    icon: goldIcon,
  },
})
