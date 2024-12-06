import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import GameInterface from "@/app/domain/game/GameInterface"
import { MetaDataInterface } from "@/app/domain/MetaDataInterface"

export interface ActionInterface<T> extends BaseJsonLdInterface {
  data: T
}

export interface ActionMetadataInterface<T> extends MetaDataInterface {
  onFrame: (payload: {
    entity: EntityInterface
    game: GameInterface
    action: ActionInterface<T>
  }) => void
  factory: (payload: {
    entity: EntityInterface
    game: GameInterface
  }) => ActionInterface<T>
}
