import { createResourceInventory } from "@/packages/game/inventory/InventoryResource"
import woodIcon from "./img.png"

export const woodResourceMetadata = createResourceInventory({
  "@id": "resource/wood",
  label: "Bois",
  asset: {
    icon: woodIcon,
  },
})
