import {
  BaseJsonLdInterface,
  JsonTypedLdInterface,
} from "@/packages/utils/jsonLd/jsonLd"
import EntityInterface from "@/app/game/domain/EntityInterface"
import GameInterface from "@/app/game/domain/GameInterface"

export interface Action<T> extends BaseJsonLdInterface {
  data: T
}

export interface ActionMetadataInterface<T> extends JsonTypedLdInterface {
  onFrame: (payload: {
    entity: EntityInterface
    game: GameInterface
    data: T
  }) => void
  factory: (payload: any) => Action<T>
  data: T
}
