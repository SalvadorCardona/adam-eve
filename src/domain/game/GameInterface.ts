import { JsonLdContainerInterface } from "@/packages/container/container"
import EntityInterface from "@/src/domain/entity/EntityInterface"
import { InventoryInterface } from "@/src/domain/inventory/InventoryItemInterface"
import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/src/domain/action/ActionBagInterface"
import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import { Vector3Interface } from "@/src/domain/3D/Vector"

export default interface GameInterface extends BaseJsonLdInterface {
  time: number
  mousePosition?: Vector3Interface
  entities: JsonLdContainerInterface<EntityInterface>
  // When i click on entity, this stock here
  entitySelection: EntityInterface | undefined
  // Entity to need created
  entityShouldBeCreated: EntityMetaDataInterface | undefined
  inventory: InventoryInterface
  actions: ActionBagInterface
}
