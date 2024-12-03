import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import { Vector3Interface } from "@/app/game/domain/Vector"
import { JsonLdContainerInterface } from "@/packages/container/container"
import { ActionInterface } from "@/app/game/domain/action/ActionMetadataInterface"
import { RessourceInterface } from "@/app/game/domain/ressource/RessourceInterface"

export default interface EntityInterface extends BaseJsonLdInterface {
  position: Vector3Interface
  size: Vector3Interface
  life: number
  speed: number
  inventory: JsonLdContainerInterface<RessourceInterface>
  actions: JsonLdContainerInterface<ActionInterface<any>>
}
