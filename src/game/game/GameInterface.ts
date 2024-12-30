import { JsonLdContainerInterface } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { BaseJsonLdInterface } from "@/src/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { Vector3Interface } from "@/src/game/3D/Vector"
import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"

export default interface GameInterface extends BaseJsonLdInterface {
  userControl: {
    showGrid: boolean
    mouseIcon?: string
    mousePosition?: Vector3Interface
    currentAction?: ActionUserMetaDataInterface | undefined
  }
  camera: {
    fov: number
    zoom: number
    position: Vector3Interface
    rotation: Vector3Interface
  }
  createdAt: DateString
  time: number
  entities: JsonLdContainerInterface<EntityInterface>
  // When i click on entity, this stock here
  inventory: InventoryBagInterface
  actions: ActionBagInterface
}
