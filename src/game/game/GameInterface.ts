import { JsonLdContainerInterface } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import {
  BaseJsonLdInterface,
  jsonLdFactory,
  JsonLDItem,
} from "@/src/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import {
  createVector2,
  Vector2Interface,
  Vector3Interface,
} from "@/src/utils/3Dmath/Vector"
import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import {
  BoundingBox2DInterface,
  createBounding2D,
} from "@/src/utils/3Dmath/boudingBox"
import { appLdType } from "@/src/AppLdType"

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

export type UserControl = JsonLDItem<{
  showGrid: boolean
  currentAction?: ActionUserMetaDataInterface | undefined
  rotation?: number
  entitiesSelected: EntityInterface["@id"][]
  entitySelectedByHover?: EntityInterface["@id"]
}>

export type MouseState = JsonLDItem<{
  bounding2d: BoundingBox2DInterface
  position: Vector2Interface
}>

export type GameOption = JsonLDItem<{
  gameSpeed: number
  gameState: GameState
  gameMode: GameMode
}>

export default interface GameInterface extends BaseJsonLdInterface {
  mouseState: MouseState
  graphicMotor: GraphicMotor
  gameOption: GameOption
  userControl: UserControl
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

export function gameFactory(game?: GameInterface): GameInterface {
  return jsonLdFactory(appLdType.game, {
    graphicMotor: GraphicMotor.PIXI_JS,
    gameOption: jsonLdFactory(appLdType.camera, {
      gameSpeed: 1,
      gameState: GameState.RUN,
      gameMode: GameMode.NORMAL,
    }),
    time: 0,
    actions: {},
    entities: {},
    inventory: {},
    createdAt: new Date(),
    mouseState: jsonLdFactory(appLdType.mouseState, {
      bounding2d: createBounding2D(),
      position: createVector2(),
    }),
    camera: jsonLdFactory(appLdType.camera, {
      fov: 50,
      zoom: 0,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    }),
    userControl: jsonLdFactory(appLdType.userControl, {
      entitiesSelected: [],
      showGrid: true,
    }),
    ...(game ?? {}),
  })
}
