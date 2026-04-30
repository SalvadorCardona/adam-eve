import { createResourceInventory } from "@/packages/game/inventory/InventoryResource"
import ironIcon from "./icon.svg?url"

export const ironResourceMetadata = createResourceInventory({
  "@id": "resource/iron",
  label: "Fer",
  asset: {
    icon: ironIcon,
  },
})
