import { JsonLdTypeCollection } from "@/packages/jsonLd/jsonLd"
import { InventoryItemInterface } from "@/packages/game/inventory/InventoryItemInterface"

export type InventoryInterface = JsonLdTypeCollection<InventoryItemInterface> & {
  size: number
}

export interface InventoryAbleInterface {
  inventory?: InventoryInterface
}

export type CanBeInventoryInterface =
  | InventoryAbleInterface
  | InventoryInterface
  | undefined
