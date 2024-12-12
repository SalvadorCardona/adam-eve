import EntityInterface from "@/src/domain/entity/EntityInterface"
import GameInterface from "@/src/domain/game/GameInterface"
import { MetaDataInterface } from "@/src/domain/MetaDataInterface"
import { ActionInterface } from "@/src/domain/action/ActionInterface"

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
