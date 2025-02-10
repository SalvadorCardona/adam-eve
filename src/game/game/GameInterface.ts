import EntityInterface from "@/src/game/entity/EntityInterface"
import {
  BaseJsonLdInterface,
  createJsonLd,
  createJsonLdCollection,
  JsonLdIriCollection,
  JsonLdIriContainerInterface,
  JsonLDItem,
} from "@/src/utils/jsonLd/jsonLd"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import {
  createVector2,
  Vector2Interface,
  Vector3Interface,
} from "@/src/utils/math/vector"
import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { appLdType } from "@/src/AppLdType"
import { PlayerInterface } from "@/src/game/player/playerMetadata"
import { BoundingInterface, createBoundingByABB } from "@/src/utils/math/boudingBox"
import { createMatrix2D, Matrix2DInterface } from "@/src/utils/math/matrix"
import { InventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { createInventory } from "@/src/game/inventory/useCase/createInventory"

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
  position: Vector2Interface
  startPosition: Vector2Interface
  endPosition: Vector2Interface
}>

export type GameOption = JsonLDItem<{
  gameSpeed: number
  gameState: GameState
  gameMode: GameMode
}>

type GameWorld = JsonLDItem<{
  bounding: BoundingInterface
  entitiesMatrix: Matrix2DInterface
  groundMatrix?: Matrix2DInterface
}>

export default interface GameInterface extends BaseJsonLdInterface {
  mouseState: MouseState
  graphicMotor: GraphicMotor
  gameOption: GameOption
  userControl: UserControl
  camera: JsonLDItem<{
    zoom: number
    position: Vector3Interface
  }>
  createdAt: DateString
  time: number
  entities: JsonLdIriContainerInterface<EntityInterface>
  players: JsonLdIriCollection<PlayerInterface>
  inventory: InventoryInterface
  actions: ActionBagInterface
  gameWorld: GameWorld
}

export function gameFactory(game?: GameInterface): GameInterface {
  return createJsonLd(appLdType.game, {
    players: createJsonLdCollection(appLdType.players),
    gameWorld: createJsonLd<GameWorld>(appLdType.gameWorld, {
      bounding: createBoundingByABB({
        min: createVector2(),
        max: createVector2(),
      }),
      entitiesMatrix: createMatrix2D(0, 0),
    }),
    graphicMotor: GraphicMotor.PIXI_JS,
    gameOption: createJsonLd<GameOption>(appLdType.camera, {
      gameSpeed: 1,
      gameState: GameState.RUN,
      gameMode: GameMode.NORMAL,
    }),
    time: 0,
    actions: {},
    entities: {},
    inventory: createInventory(),
    createdAt: new Date(),
    mouseState: createJsonLd<MouseState>(appLdType.mouseState, {
      startPosition: createVector2(),
      endPosition: createVector2(),
      position: createVector2(),
    }),
    camera: createJsonLd(appLdType.camera, {
      zoom: 50,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    }),
    userControl: createJsonLd(appLdType.userControl, {
      entitiesSelected: [],
      showGrid: true,
    }),
    ...(game ?? {}),
  })
}
