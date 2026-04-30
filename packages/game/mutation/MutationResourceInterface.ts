import { BaseGameResource } from "@/packages/game/BaseGameResource"
import { InventoryInterface } from "@/packages/game/inventory/InventoryResource"
import GameInterface from "@/packages/game/game/GameInterface"

export interface MutationResourceInterface extends BaseGameResource {
  description?: string
  cost: InventoryInterface
  buildTime: number
  apply: (game: GameInterface) => void
}
