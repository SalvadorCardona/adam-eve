import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import { Vector3Interface } from "@/app/domain/3D/Vector"
import { InventoryInterface } from "@/app/domain/inventory/InventoryItemInterface"
import { ActionBagInterface } from "@/app/domain/action/ActionBagInterface"

export default interface EntityInterface extends BaseJsonLdInterface {
  position: Vector3Interface
  rotation: Vector3Interface
  scale: Vector3Interface
  size: Vector3Interface
  life: number
  speed: number
  inventory: InventoryInterface
  actions: ActionBagInterface
}
