import { createResourceInventory } from "@/packages/game/inventory/InventoryResource"
import goldIcon from "./img.png"

export const wheatResourceMetadata = createResourceInventory({
  "@type": "wheat",
  label: "Blé",
  asset: {
    icon: goldIcon,
  },
})
