import EntityInterface from "@/src/game/entity/EntityInterface"
import { FC } from "react"
import GameInterface from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"

interface EntityAttackPriorityInterface {
  attackRange: number
  damage: number
  attackSpeed: number
}

interface EntityPriorityInterface {
  ressourceForConstruction?: InventoryBagInterface
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
}

export interface EntityMetaDataInterface<T extends EntityInterface = EntityInterface>
  extends BaseGameMetaDataInterface {
  onFrame?: (payload: { entity: T; game: GameInterface }) => void
  component?: FC<{ entity: T }>
  factory: (payload?: { entity?: Partial<T>; game: GameInterface }) => T
  defaultEntity?: () => Partial<T>
  workerAction?: ActionMetadataInterface<any>
  propriety: EntityPriorityInterface
  canBeBuild: (payload: { entity: T; game: GameInterface }) => boolean
  onDeath?: (payload: { entity: T; game: GameInterface }) => void
  onHit?: (payload: { entity: T; game: GameInterface }) => void
}
