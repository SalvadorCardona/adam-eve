import { createResourceInventory } from "@/packages/game/inventory/InventoryResource"
import waterIcon from "./img.png"

export const waterResourceMetadata = createResourceInventory({
  "@id": "water",
  label: "Eau",
  asset: {
    icon: waterIcon,
  },
})
