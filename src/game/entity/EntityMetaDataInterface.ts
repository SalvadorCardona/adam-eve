import EntityInterface from "@/src/game/entity/EntityInterface"
import { FC } from "react"
import GameInterface from "@/src/game/game/GameInterface"
import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"

export interface EntityMetaDataInterface extends GameMetaDataInterface {
  onFrame?: (payload: { entity: EntityInterface; game: GameInterface }) => void
  component?: FC<{ entity: EntityInterface }>
  factory: (payload: { entity: Partial<EntityInterface> }) => EntityInterface
  defaultEntity?: () => Partial<EntityInterface>
}
