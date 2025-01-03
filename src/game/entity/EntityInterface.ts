import { BaseJsonLdInterface, JsonLdIri } from "@/src/utils/jsonLd/jsonLd"
import { Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { JsonLdContainerInterface } from "@/src/container/container"
import { CurrentPathCoordinateInterface } from "@/src/utils/3Dmath/pathCoordinate/generatePathCoordinates"

export enum EntityState {
  wait = "wait",
  move = "move",
  under_construction = "under_construction",
  builded = "builded",
  attack = "attack",
}

export enum factionState {
  enemy = "enemy",
  self = "self",
}

export default interface EntityInterface extends BaseJsonLdInterface {
  position: Vector3Interface
  rotation: Vector3Interface
  size: Vector3Interface
  maxLife: number
  life: number
  speed: number
  inventory: InventoryBagInterface
  actions: ActionBagInterface
  state?: EntityState
  worker: JsonLdContainerInterface<EntityInterface>
  numberOfWorker?: number
  currentPathOfCoordinate?: CurrentPathCoordinateInterface
  faction: factionState
  entityAttackTargetIri?: JsonLdIri
}
