import { JsonLdContainerInterface } from "@/packages/container/container"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { InventoryInterface } from "@/app/domain/inventory/InventoryItemInterface"
import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/app/domain/action/ActionBagInterface"
import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { Vector3Interface } from "@/app/domain/3D/Vector"

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
