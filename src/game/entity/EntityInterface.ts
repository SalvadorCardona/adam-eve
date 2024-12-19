import { BaseJsonLdInterface } from "@/src/utils/jsonLd/jsonLd"
import { Vector3Interface } from "@/src/game/3D/Vector"
import { InventoryInterface } from "@/src/game/inventory/InventoryItemInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"

export default interface EntityInterface extends BaseJsonLdInterface {
  position: Vector3Interface
  rotation: Vector3Interface
  scale: Vector3Interface
  size: Vector3Interface
  life: number
  speed: number
  inventory: InventoryInterface
  actions: ActionBagInterface
  state?: string
}
