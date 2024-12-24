import { BaseJsonLdInterface } from "@/src/utils/jsonLd/jsonLd"
import { MaybeVector3Interface, Vector3Interface } from "@/src/game/3D/Vector"
import { InventoryInterface } from "@/src/game/inventory/InventoryItemInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { JsonLdContainerInterface } from "@/src/container/container"

export default interface EntityInterface extends BaseJsonLdInterface {
  position: MaybeVector3Interface
  rotation: MaybeVector3Interface
  scale: Vector3Interface
  size: MaybeVector3Interface
  maxLife: number
  life: number
  speed: number
  inventory: InventoryInterface
  actions: ActionBagInterface
  state?: string
  type: string | "ground"
  collisionAble?: boolean
  ressourceNeeded?: InventoryInterface
  worker: JsonLdContainerInterface<EntityInterface>
  numberOfWorker?: number
}
