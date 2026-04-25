import EntityInterface from "@/packages/game/entity/EntityInterface"
import {
  BaseJsonLdItemInterface,
  createJsonLd,
  createJsonLdCollection,
  JsonLdIriCollection,
  JsonLdIriContainerInterface,
  JsonLDItem,
} from "@/packages/jsonLd/jsonLd"
import {
  createVector2,
  Vector2Interface,
  Vector3Interface,
} from "@/packages/math/vector"
import { ActionUserResource } from "@/packages/game/actionUser/ActionUserResource"
import { PlayerInterface } from "@/packages/game/player/playerMetadata"
import { BoundingInterface, createBoundingByABB } from "@/packages/math/boudingBox"
import { createMatrix2D, Matrix2DInterface } from "@/packages/math/matrix"
import { InventoryInterface } from "@/packages/game/inventory/InventoryResource"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { ActionBagInterface } from "@/packages/game/entity/ActionResourceInterface"

export enum GameState {
  RUN = "run",
  PAUSE = "pause",
}

export enum GameMode {
  NORMAL = "normal",
  GOD = "god",
}

export type UserControl = JsonLDItem<{
  showGrid: boolean
  currentAction?: ActionUserResource | undefined
  rotation?: number
  entitySelected?: EntityInterface["@id"]
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
  visitedMatrix?: boolean[][]
  visibleMatrix?: boolean[][]
}>

export default interface GameInterface extends BaseJsonLdItemInterface {
  mouseState: MouseState
  gameOption: GameOption
  userControl: UserControl
  camera: JsonLDItem<{
    zoom: number
    position: Vector3Interface
  }>
  createdAt: string | Date
  time: number
  entities: JsonLdIriContainerInterface<EntityInterface>
  players: JsonLdIriCollection<PlayerInterface>
  inventory: InventoryInterface
  actions: ActionBagInterface
  gameWorld: GameWorld
}

export function gameFactory(game?: GameInterface): GameInterface {
  const currentGame = createJsonLd("game", {
    players: createJsonLdCollection("players"),
    gameWorld: createJsonLd<GameWorld>("gameWorld", {
      bounding: createBoundingByABB({
        min: createVector2(),
        max: createVector2(),
      }),
      entitiesMatrix: createMatrix2D(0, 0),
    }),
    gameOption: createJsonLd<GameOption>("option", {
      gameSpeed: 1,
      gameState: GameState.RUN,
      gameMode: GameMode.NORMAL,
    }),
    time: 0,
    actions: {},
    entities: {},
    inventory: createInventory({ size: 10000000 }),
    createdAt: new Date(),
    mouseState: createJsonLd<MouseState>("mouseState", {
      startPosition: createVector2(),
      endPosition: createVector2(),
      position: createVector2(),
    }),
    camera: createJsonLd("camera", {
      zoom: 50,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    }),
    userControl: createJsonLd("userControl", {
      showGrid: true,
    }),
    ...(game ?? {}),
  })

  currentGame.inventory.entity = currentGame["@id"]

  return currentGame
}
