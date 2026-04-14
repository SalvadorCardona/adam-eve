import { BaseJsonLdItemInterface, JsonLdIri } from "@/packages/jsonLd/jsonLd"
import { Vector3Interface } from "@/packages/math/vector"
import {
  ActionBagInterface,
  ActionnableInterface,
} from "@/packages/game/action/ActionBagInterface"
import { EntityState } from "@/packages/game/entity/EntityState"
import { ConsumablePathInterface } from "@/packages/math/path"
import { Direction } from "@/packages/math/matrix"
import { PlayerInterface } from "@/packages/game/player/playerMetadata"
import {
  InventoryAbleInterface,
  InventoryInterface,
} from "@/packages/game/inventory/InventoryInterface"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export enum EntityFaction {
  enemy = "enemy",
  self = "self",
}

export default interface EntityInterface
  extends BaseJsonLdItemInterface, ActionnableInterface, InventoryAbleInterface {
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

export function isGroundEntity(
  entity: EntityInterface,
): entity is GroundEntityInterface {
  return entity.entityType === EntityType.ground
}

export function isResourceEntity(
  entity: EntityInterface,
): entity is ResourceEntityInterface {
  return entity.entityType === EntityType.resource
}

export function isBuildingEntity(
  entity: EntityInterface,
): entity is BuildingEntityInterface {
  return entity.entityType === EntityType.building
}

export function isCharacterEntity(
  entity: EntityInterface,
): entity is CharacterEntityInterface {
  return entity.entityType === EntityType.character
}

export interface ResourceEntityInterface extends EntityInterface {}

export interface CharacterEntityInterface extends EntityInterface {}

export interface BuildingEntityInterface extends EntityInterface {}

export interface GroundEntityInterface extends EntityInterface {}
