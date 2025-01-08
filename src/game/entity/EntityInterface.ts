import { BaseJsonLdInterface, JsonLdIri } from "@/src/utils/jsonLd/jsonLd"
import { Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { CurrentPathCoordinateInterface } from "@/src/utils/3Dmath/pathCoordinate/generatePathCoordinates"
import { BoundingBox3DInterface } from "@/src/utils/3Dmath/boudingBox"

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

export default interface EntityInterface
  extends BaseJsonLdInterface,
    BoundingBox3DInterface {
  rotation: Vector3Interface
  maxLife: number
  life: number
  inventory: InventoryBagInterface
  actions: ActionBagInterface
  state?: EntityState
  workers: EntityInterface["@id"][]
  numberOfWorker?: number
  currentPathOfCoordinate?: CurrentPathCoordinateInterface
  faction: factionState
  entityAttackTargetIri?: JsonLdIri
  connections: {
    top?: JsonLdIri
    bottom?: JsonLdIri
    left?: JsonLdIri
    right?: JsonLdIri
    on?: JsonLdIri
  }
}
