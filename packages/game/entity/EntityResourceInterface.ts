import EntityInterface from "@/packages/game/entity/EntityInterface"
import { FC } from "react"
import GameInterface from "@/packages/game/game/GameInterface"
import { BaseGameResource } from "@/packages/game/BaseGameResource"
import { Vector2Interface, Vector3Interface } from "@/packages/math/vector"
import { JsonLdType } from "@/packages/jsonLd/jsonLd"
import { InventoryInterface } from "@/packages/game/inventory/InventoryInterface"
import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"

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
> extends BaseGameResource<T> {
  onFrame?: (payload: { entity: T; game: GameInterface }) => void
  component?: FC<{ entity: T; size: Vector2Interface }>
  defaultEntity?: () => Partial<T>
  workerAction?: ActionResourceInterface<any>
  propriety: EntityPriorityInterface
  canBeBuild: (payload: { entity: T; game: GameInterface }) => boolean
  onDeath?: (payload: { entity: T; game: GameInterface }) => void
  onHit?: (payload: { entity: T; game: GameInterface }) => void
  entityType?: EntityType
}
