import {
  BaseJsonLdInterface,
  JsonTypedLdInterface,
} from "@/packages/utils/jsonLd/jsonLd"
import EntityInterface from "@/app/game/domain/entity/EntityInterface"
import GameInterface from "@/app/game/domain/GameInterface"

export interface ActionInterface<T> extends BaseJsonLdInterface {
  data: T
}

export interface ActionMetadataInterface<T> extends JsonTypedLdInterface {
  onFrame: (payload: {
    entity: EntityInterface
    game: GameInterface
    action: ActionInterface<T>
  }) => void
  factory: (payload: any) => ActionInterface<T>
  data: T
}
