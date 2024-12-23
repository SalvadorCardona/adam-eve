import { JsonLdContainerInterface } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { InventoryInterface } from "@/src/game/inventory/InventoryItemInterface"
import { BaseJsonLdInterface } from "@/src/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Vector3Interface } from "@/src/game/3D/Vector"
import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"

export default interface GameInterface extends BaseJsonLdInterface {
  userControl: {
    showGrid: boolean
    mouseIcon?: string
    mousePosition?: Vector3Interface
    // When i click on entity, this stock here
    entitySelection: EntityInterface | undefined
    // Entity to need created
    entityShouldBeCreated: EntityMetaDataInterface | undefined
    entityShouldBeCreatedCollision: EntityInterface | undefined
    entityShouldBeRemoved: boolean | undefined
    currentAction: ActionUserMetaDataInterface | undefined
  }
  camera: {
    fov: number
    zoom: number
    position: Vector3Interface
    rotation: Vector3Interface
  }
  createdAt: Date
  time: number
  entities: JsonLdContainerInterface<EntityInterface>
  // When i click on entity, this stock here
  inventory: InventoryInterface
  actions: ActionBagInterface
}
