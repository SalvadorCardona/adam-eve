import {
  JsonLdContainerInterface,
  JsonLdTypeContainerInterface,
} from "@/packages/container/container"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { InventoryItemInterface } from "@/app/domain/inventory/InventoryItemInterface"

export default interface GameInterface {
  time: 0
  entities: JsonLdContainerInterface<EntityInterface>
  entitySelection: EntityInterface | null
  inventory: JsonLdTypeContainerInterface<InventoryItemInterface>
}
