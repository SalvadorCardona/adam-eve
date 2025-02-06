import { JsonLdTypeCollection } from "@/src/utils/jsonLd/jsonLd"
import { InventoryItemInterface } from "@/src/game/inventory/InventoryItemInterface"

export type InventoryInterface = JsonLdTypeCollection<InventoryItemInterface> & {
  size: number
}

export interface InventoryAbleInterface {
  inventory?: InventoryInterface
}

export type CanBeInventoryInterface = InventoryAbleInterface | InventoryInterface
