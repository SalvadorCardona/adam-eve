import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import { Vector3Interface } from "@/app/domain/3D/Vector"
import { JsonLdContainerInterface } from "@/packages/container/container"
import { ActionInterface } from "@/app/domain/action/ActionMetadataInterface"
import { InventoryInterface } from "@/app/domain/inventory/InventoryItemInterface"

export default interface EntityInterface extends BaseJsonLdInterface {
  position: Vector3Interface
  rotation: Vector3Interface
  size: Vector3Interface
  life: number
  speed: number
  inventory: InventoryInterface
  actions: JsonLdContainerInterface<ActionInterface<any>>
}
