import {
  BaseJsonLdInterface,
  JsonLdIri,
  JsonLdType,
} from "@/packages/jsonLd/jsonLd"
import { Vector3Interface } from "@/packages/math/vector"
import {
  ActionBagInterface,
  ActionnableInterface,
} from "@/src/game/action/ActionBagInterface"
import { appLdType } from "@/app/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"
import { ConsumablePathInterface } from "@/packages/math/path"
import { Direction } from "@/packages/math/matrix"
import { PlayerInterface } from "@/src/game/player/playerMetadata"
import {
  InventoryAbleInterface,
  InventoryInterface,
} from "@/src/game/inventory/InventoryInterface"

export enum EntityFaction {
  enemy = "enemy",
  self = "self",
}

export default interface EntityInterface
  extends BaseJsonLdInterface,
    ActionnableInterface,
    InventoryAbleInterface {
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
}

export function isEntity(entity: EntityInterface): entity is EntityInterface {
  return entity["@type"].startsWith(appLdType.entity)
}

export function isGroundEntity(
  entity: EntityInterface,
): entity is GroundEntityInterface {
  return entity["@type"].startsWith(appLdType.entityGround)
}

export function isResourceEntity(
  entity: EntityInterface,
): entity is ResourceEntityInterface {
  return entity["@type"].startsWith(appLdType.entityResource)
}

export function isBuildingEntity(
  entity: EntityInterface,
): entity is BuildingEntityInterface {
  return entity["@type"].startsWith(appLdType.entityBuilding)
}

export function isCharacterEntity(
  entity: EntityInterface,
): entity is CharacterEntityInterface {
  return entity["@type"].startsWith(appLdType.entityCharacter)
}

export function getEntityBaseType(entity: EntityInterface): JsonLdType | undefined {
  if (isBuildingEntity(entity)) return appLdType.entityBuilding
  if (isGroundEntity(entity)) return appLdType.entityGround
  if (isCharacterEntity(entity)) return appLdType.entityCharacter
  if (isResourceEntity(entity)) return appLdType.entityResource

  return undefined
}

export interface ResourceEntityInterface extends EntityInterface {}

export interface CharacterEntityInterface extends EntityInterface {}

export interface BuildingEntityInterface extends EntityInterface {}

export interface GroundEntityInterface extends EntityInterface {}
