import {
  BaseJsonLdInterface,
  JsonLdIri,
  JsonLdType,
} from "@/src/utils/jsonLd/jsonLd"
import { Vector3Interface } from "@/src/utils/math/vector"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"

export enum EntityFaction {
  enemy = "enemy",
  self = "self",
}

export default interface EntityInterface extends BaseJsonLdInterface {
  rotation: number
  position: Vector3Interface
  life: number
  state?: EntityState
  numberOfWorker?: number
  faction: EntityFaction
  entityAttackTargetIri?: JsonLdIri
  actions?: ActionBagInterface
  createdAt: number
  connections: {
    top?: JsonLdIri
    bottom?: JsonLdIri
    left?: JsonLdIri
    right?: JsonLdIri
    topRight?: JsonLdIri
    topLeft?: JsonLdIri
    bottomLeft?: JsonLdIri
    bottomRight?: JsonLdIri
    on?: JsonLdIri
  }
}

export function isEntity(entity: EntityInterface): entity is EntityInterface {
  return entity["@type"].startsWith(appLdType.entity)
}

export function isGroundEntity(
  entity: EntityInterface,
): entity is GroundEntityInterface {
  return entity["@type"].startsWith(appLdType.entityGround)
}

export function isRessourceEntity(
  entity: EntityInterface,
): entity is RessourceEntityInterface {
  return entity["@type"].startsWith(appLdType.entityRessource)
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
  if (isRessourceEntity(entity)) return appLdType.entityRessource

  return undefined
}

export interface RessourceEntityInterface extends EntityInterface {}

export interface CharacterEntityInterface extends EntityInterface {
  actions: ActionBagInterface
  inventory: InventoryBagInterface
}

export interface BuildingEntityInterface extends EntityInterface {
  actions: ActionBagInterface
  workers: EntityInterface["@id"][]
  inventory: InventoryBagInterface
}

export interface GroundEntityInterface extends EntityInterface {}
