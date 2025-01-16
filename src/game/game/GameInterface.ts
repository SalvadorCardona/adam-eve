import { JsonLdContainerInterface } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { BaseJsonLdInterface, JsonLDItem } from "@/src/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { BoundingBox3DInterface } from "@/src/utils/3Dmath/boudingBox"

export enum GameState {
  RUN = "run",
  PAUSE = "pause",
}

export enum GameMode {
  NORMAL = "normal",
  GOD = "god",
}

export enum GraphicMotor {
  PIXI_JS = "PIXI_JS",
  THREE_JS = "THREE_JS",
}

export default interface GameInterface extends BaseJsonLdInterface {
  graphicMotor: GraphicMotor
  gameSpeed: number
  gameState: GameState
  gameMode: GameMode
  userControl: JsonLDItem<{
    showGrid: boolean
    currentAction?: ActionUserMetaDataInterface | undefined
    rotation?: number
    entitiesSelected: EntityInterface["@id"][]
    entitySelectedByHover?: EntityInterface["@id"]
    mouseState: {
      bounding3D: BoundingBox3DInterface
    }
  }>
  camera: JsonLDItem<{
    fov: number
    zoom: number
    position: Vector3Interface
  }>
  createdAt: DateString
  time: number
  entities: JsonLdContainerInterface<EntityInterface>
  inventory: InventoryBagInterface
  actions: ActionBagInterface
}
