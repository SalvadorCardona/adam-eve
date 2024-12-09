import { JsonLdContainerInterface } from "@/packages/container/container"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { InventoryInterface } from "@/app/domain/inventory/InventoryItemInterface"
import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/app/domain/action/ActionBagInterface"
import { MetaDataInterface } from "@/app/domain/MetaDataInterface"

export default interface GameInterface extends BaseJsonLdInterface {
  time: number
  entities: JsonLdContainerInterface<EntityInterface>
  // When i click on entity, this stock here
  entitySelection: EntityInterface | undefined
  // Entity to need created
  entityShouldBeCreated: MetaDataInterface | undefined
  inventory: InventoryInterface
  actions: ActionBagInterface
}
