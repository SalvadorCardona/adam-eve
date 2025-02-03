import EntityInterface from "@/src/game/entity/EntityInterface"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import {
  BaseJsonLdInterface,
  jsonLdFactory,
  JsonLdIriCollection,
  JsonLdIriCollectionFactory,
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
import { PlayerInterface } from "@/src/game/player/SaveGameMetadataInterface"
import { config } from "@/src/app/config"
import { BoundingInterface, createBoundingByABB } from "@/src/utils/math/boudingBox"
import { Matrix2DInterface } from "@/src/utils/math/matrix"

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

type GameSize = JsonLDItem<{
  bounding: BoundingInterface
  matrix: Matrix2DInterface
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
  inventory: InventoryBagInterface
  actions: ActionBagInterface
  gameSize: GameSize
}

export function gameFactory(game?: GameInterface): GameInterface {
  return jsonLdFactory(appLdType.game, {
    players: JsonLdIriCollectionFactory(appLdType.player),
    gameSize: jsonLdFactory<GameSize>(
      appLdType.gameSize,
      createBoundingByABB({
        min: createVector2(),
        max: createVector2(),
      }),
    ),
    graphicMotor: GraphicMotor.PIXI_JS,
    gameOption: jsonLdFactory<GameOption>(appLdType.camera, {
      gameSpeed: 1,
      gameState: GameState.RUN,
      gameMode: GameMode.NORMAL,
    }),
    time: 0,
    actions: {},
    entities: {},
    inventory: {},
    createdAt: new Date(),
    mouseState: jsonLdFactory<MouseState>(appLdType.mouseState, {
      startPosition: createVector2(),
      endPosition: createVector2(),
      position: createVector2(),
    }),
    camera: jsonLdFactory(appLdType.camera, {
      zoom: config.pixiJs2dItemSize,
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
