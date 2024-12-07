import EntityInterface from "@/app/domain/entity/EntityInterface"
import { FC } from "react"
import GameInterface from "@/app/domain/game/GameInterface"
import { MetaDataInterface } from "@/app/domain/MetaDataInterface"

export interface EntityMetaDataInterface extends MetaDataInterface {
  onFrame?: (payload: { entity: EntityInterface; game: GameInterface }) => void
  component?: FC<{ entity: EntityInterface }>
  factory: (payload: { entity: Partial<EntityInterface> }) => EntityInterface
  defaultEntity?: () => Partial<EntityInterface>
}
