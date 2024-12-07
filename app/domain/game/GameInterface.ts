import { JsonLdContainerInterface } from "@/packages/container/container"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { InventoryInterface } from "@/app/domain/inventory/InventoryItemInterface"
import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/app/domain/action/ActionBagInterface"

export default interface GameInterface extends BaseJsonLdInterface {
  time: 0
  entities: JsonLdContainerInterface<EntityInterface>
  entitySelection: EntityInterface | null
  inventory: InventoryInterface
  actions: ActionBagInterface
}
