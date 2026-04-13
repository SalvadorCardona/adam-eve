import EntityInterface from "@/src/game/entity/EntityInterface"
import { FC } from "react"
import GameInterface from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { Vector2Interface, Vector3Interface } from "@/packages/math/vector"
import { JsonLdType } from "@/packages/jsonLd/jsonLd"
import { InventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { ActionResourceInterface } from "@/src/game/action/ActionResourceInterface"

export enum EntityType {
  building = "building",
  resource = "resource",
  character = "character",
  ground = "ground",
  attack = "attack",
  effect = "effect",
}

interface EntityAttackPriorityInterface {
  attackRange: number
  damage: number
  attackSpeed: number
}

interface EntityPriorityInterface {
  resourceForConstruction?: InventoryInterface
  inventorySize?: number
  speed?: number
  attack?: EntityAttackPriorityInterface
  work?: {
    numberOfWorker: number
  }
  health?: {
    maxLife: number
  }
  size?: Vector3Interface
  scale?: Vector3Interface
  defaultActions?: JsonLdType[]
  entityType?: EntityType
}

export interface EntityResourceInterface<
  T extends EntityInterface = EntityInterface,
> extends BaseGameMetaDataInterface {
  onFrame?: (payload: { entity: T; game: GameInterface }) => void
  component?: FC<{ entity: T; size: Vector2Interface }>
  factory: (payload?: { entity?: Partial<T>; game: GameInterface }) => T
  defaultEntity?: () => Partial<T>
  workerAction?: ActionResourceInterface
  propriety: EntityPriorityInterface
  canBeBuild: (payload: { entity: T; game: GameInterface }) => boolean
  onDeath?: (payload: { entity: T; game: GameInterface }) => void
  onHit?: (payload: { entity: T; game: GameInterface }) => void
  entityType?: EntityType
}
