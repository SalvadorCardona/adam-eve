import { BaseJsonLdItemInterface, JsonLdIri } from "@/packages/jsonLd/jsonLd"
import { Vector3Interface } from "@/packages/math/vector"
import { EntityState } from "@/packages/game/entity/EntityState"
import { ConsumablePathInterface } from "@/packages/math/path"
import { Direction } from "@/packages/math/matrix"
import { PlayerInterface } from "@/packages/game/player/playerMetadata"
import { InventoryAbleInterface, InventoryInterface } from "@/packages/game/inventory/InventoryInterface"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { ActionableInterface, ActionBagInterface } from "@/packages/game/action/ActionInterface"

export enum EntityFaction {
  enemy = "enemy",
  self = "self",
}

export default interface EntityInterface
  extends BaseJsonLdItemInterface, ActionableInterface, InventoryAbleInterface {
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
  workers?: EntityInterface["@id"][]
  inventory?: InventoryInterface
  connections?: Partial<Record<Direction, JsonLdIri>>
  size: Vector3Interface
  entityType?: EntityType
  "@resource"?: string
}

export function isEntity(entity: EntityInterface): entity is EntityInterface {
  return entity["@type"] === "entity"
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
