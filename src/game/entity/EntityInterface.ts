import { BaseJsonLdInterface } from "@/src/utils/jsonLd/jsonLd"
import { MaybeVector3Interface } from "@/src/game/3D/Vector"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { JsonLdContainerInterface } from "@/src/container/container"

export enum entityState {
  wait = "wait",
  move = "move",
  under_construction = "under_construction",
  builded = "builded",
}

export default interface EntityInterface extends BaseJsonLdInterface {
  position: MaybeVector3Interface
  rotation: MaybeVector3Interface
  size: MaybeVector3Interface
  maxLife: number
  life: number
  speed: number
  inventory: InventoryBagInterface
  actions: ActionBagInterface
  state?: entityState
  collisionAble?: boolean
  worker: JsonLdContainerInterface<EntityInterface>
  numberOfWorker?: number
}
