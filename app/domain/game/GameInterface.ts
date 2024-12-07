import { JsonLdContainerInterface } from "@/packages/container/container"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { InventoryInterface } from "@/app/domain/inventory/InventoryItemInterface"

export default interface GameInterface {
  time: 0
  entities: JsonLdContainerInterface<EntityInterface>
  entitySelection: EntityInterface | null
  inventory: InventoryInterface
}
