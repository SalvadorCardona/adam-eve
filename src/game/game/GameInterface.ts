import { JsonLdContainerInterface } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { InventoryInterface } from "@/src/game/inventory/InventoryItemInterface"
import { BaseJsonLdInterface } from "@/src/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Vector3Interface } from "@/src/game/3D/Vector"

export default interface GameInterface extends BaseJsonLdInterface {
  userControl: {
    mousePosition?: Vector3Interface
    // When i click on entity, this stock here
    entitySelection: EntityInterface | undefined
    // Entity to need created
    entityShouldBeCreated: EntityMetaDataInterface | undefined
  }
  createdAt: Date
  time: number
  entities: JsonLdContainerInterface<EntityInterface>
  // When i click on entity, this stock here
  inventory: InventoryInterface
  actions: ActionBagInterface
}
