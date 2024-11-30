import EntityInterface from "@/app/game/domain/EntityInterface"
import { FC } from "react"
import GameInterface from "@/app/game/domain/GameInterface"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"

export interface EntityMetaDataInterface {
  type: string
  onFrame: (payload: { entity: EntityInterface; game: GameInterface }) => void
  component: FC<{ entity: EntityInterface, game: GameInterface }>
  factory: (payload: { entity: Partial<EntityInterface> }) => EntityInterface
}

export function baseFactory(payload: { entity: EntityInterface }): EntityInterface {
  const type: string = this.type ? this.type : "unkwon"

  return jsonLdFactory<EntityInterface>(type,
    payload.entity
  )
}