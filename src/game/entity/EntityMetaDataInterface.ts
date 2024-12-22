import EntityInterface from "@/src/game/entity/EntityInterface"
import { FC } from "react"
import GameInterface from "@/src/game/game/GameInterface"
import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"

export interface EntityMetaDataInterface<T extends EntityInterface = EntityInterface>
  extends GameMetaDataInterface {
  onFrame?: (payload: { entity: T; game: GameInterface }) => void
  component?: FC<{ entity: T }>
  factory: (payload?: { entity?: Partial<T>; context?: string }) => T
  defaultEntity?: () => Partial<T>
}
