import { BaseJsonLdItemInterface, JsonLdIri } from "@/packages/jsonLd/jsonLd"
import { Vector3Interface } from "@/packages/math/vector"
import { EntityState } from "@/packages/game/entity/EntityState"
import { ConsumablePathInterface } from "@/packages/math/path"
import { Direction } from "@/packages/math/matrix"
import { PlayerInterface } from "@/packages/game/player/playerMetadata"
import { InventoryInterface } from "@/packages/game/inventory/InventoryResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { ActionBagInterface } from "@/packages/game/action/ActionResourceInterface"

export enum EntityFaction {
  enemy = "enemy",
  self = "self",
}

export type BuildingEntityInterface = EntityInterface
export type GroundEntityInterface = EntityInterface
export type CharacterEntityInterface = EntityInterface

export default interface EntityInterface extends BaseJsonLdItemInterface {
  rotation: number
  position: Vector3Interface
  currentPath?: ConsumablePathInterface
  life: number
  state?: EntityState
  faction: EntityFaction
  createdBy?: PlayerInterface["@id"]
  entityAttackTargetIri?: JsonLdIri
  actions?: ActionBagInterface
  createdAt: number
  age?: number
  workers?: EntityInterface["@id"][]
  isPaused?: boolean
  inventory: InventoryInterface
  connections?: Partial<Record<Direction, JsonLdIri>>
  size: Vector3Interface
  entityType?: EntityType
  "@resource"?: string
}

export function isEntity(entity: any): entity is EntityInterface {
  return (
    entity != null &&
    typeof entity === "object" &&
    "rotation" in entity &&
    "createdAt" in entity
  )
}

export function isGroundEntity(entity: EntityInterface) {
  return entity.entityType === EntityType.ground
}

export function isBuildingEntity(entity: EntityInterface) {
  return entity.entityType === EntityType.building
}

export function isCharacterEntity(entity: EntityInterface) {
  return entity.entityType === EntityType.character
}
