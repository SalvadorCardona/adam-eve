import {
  BaseJsonLdInterface,
  JsonLdIri,
  JsonLdType,
} from "@/src/utils/jsonLd/jsonLd"
import { Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { CurrentPathCoordinateInterface } from "@/src/utils/3Dmath/pathCoordinate/generatePathCoordinates"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"

export enum EntityFaction {
  enemy = "enemy",
  self = "self",
}

export default interface EntityInterface extends BaseJsonLdInterface {
  rotation: Vector3Interface
  position: Vector3Interface
  life: number
  inventory?: InventoryBagInterface
  state?: EntityState
  numberOfWorker?: number
  currentPathOfCoordinate?: CurrentPathCoordinateInterface
  faction: EntityFaction
  entityAttackTargetIri?: JsonLdIri
  actions?: ActionBagInterface
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
}

export interface BuildingEntityInterface extends EntityInterface {
  actions: ActionBagInterface
  workers: EntityInterface["@id"][]
}

export interface GroundEntityInterface extends EntityInterface {}
