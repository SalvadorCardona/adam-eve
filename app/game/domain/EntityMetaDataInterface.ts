import EntityInterface from "@/app/game/domain/EntityInterface"
import { FC } from "react"
import GameInterface from "@/app/game/domain/GameInterface"
import { JsonTypedLdInterface } from "@/packages/utils/jsonLd/jsonLd"

export interface EntityMetaDataInterface extends JsonTypedLdInterface {
  onFrame: (payload: { entity: EntityInterface; game: GameInterface }) => void
  component: FC<{ entity: EntityInterface; game: GameInterface }>
  factory: (payload: { entity: Partial<EntityInterface> }) => EntityInterface
}
