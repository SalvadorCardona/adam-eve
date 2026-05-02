import { createResourceInventory } from "@/packages/game/inventory/InventoryResource"
import stoneIcon from "./icon.png"

export const stoneResourceMetadata = createResourceInventory({
  "@id": "resource/stone",
  label: "Pierre",
  asset: {
    icon: stoneIcon,
  },
})
