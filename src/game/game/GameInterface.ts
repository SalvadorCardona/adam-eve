import { JsonLdContainerInterface } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { BaseJsonLdInterface, JsonLdIri } from "@/src/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { Vector2Interface, Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { GameCalculatedInterface } from "@/src/game/game/gameCalculated"

export enum GameState {
  RUN = "run",
  PAUSE = "pause",
}

export default interface GameInterface extends BaseJsonLdInterface {
  gameSpeed: number
  gameState: GameState
  userControl: {
    showGrid: boolean
    currentAction?: ActionUserMetaDataInterface | undefined
    rotation?: number
    entitiesSelected: JsonLdIri[]
    mouseState: {
      mousePosition?: Vector3Interface
      startClickPositon?: Vector2Interface
      endClickPosition?: Vector2Interface
    }
  }
  camera: {
    fov: number
    zoom: number
    position: Vector3Interface
    rotation: Vector3Interface
  }
  createdAt: DateString
  time: number
  entities: JsonLdContainerInterface<EntityInterface>
  inventory: InventoryBagInterface
  actions: ActionBagInterface
  gameCalculated: GameCalculatedInterface
}
