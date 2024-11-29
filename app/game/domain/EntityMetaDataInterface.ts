import EntityInterface from "@/app/game/domain/EntityInterface"
import { FC } from "react"
import GameInterface from "@/app/game/domain/GameInterface"

export interface EntityMetaDataInterface {
  type: string
  onFrame: (payload: { entity: EntityInterface; game: GameInterface }) => void
  component: FC<{ entity: EntityInterface, game: GameInterface }>
  factory: (entity: Partial<EntityInterface>) => EntityInterface
}
