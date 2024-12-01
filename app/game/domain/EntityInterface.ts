import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import { Vector3Interface } from "@/app/game/domain/Vector"
import { JsonLdContainerInterface } from "@/packages/container/container"
import { ActionMetadataInterface } from "@/app/game/domain/ActionMetadataInterface"
import { InventoryItem } from "@/app/game/domain/InventoryItem"

export default interface EntityInterface extends BaseJsonLdInterface {
  position: Vector3Interface
  size: Vector3Interface
  life: number
  speed: number
  inventory: JsonLdContainerInterface<InventoryItem>
  actions: JsonLdContainerInterface<ActionMetadataInterface>
}
