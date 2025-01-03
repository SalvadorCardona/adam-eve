import EntityInterface from "@/src/game/entity/EntityInterface"
import { FC } from "react"
import GameInterface from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"

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
}

export interface EntityMetaDataInterface<T extends EntityInterface = EntityInterface>
  extends BaseGameMetaDataInterface {
  onFrame?: (payload: { entity: T; game: GameInterface }) => void
  component?: FC<{ entity: T }>
  factory: (payload?: {
    entity?: Partial<T>
    context?: string
    game: GameInterface
  }) => T
  defaultEntity?: () => Partial<T>
  workerAction?: ActionMetadataInterface<any>
  propriety: EntityPriorityInterface
  canBeBuild: (payload: { entity: T; game: GameInterface }) => boolean
}
