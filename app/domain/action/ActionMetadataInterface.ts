import EntityInterface from "@/app/domain/entity/EntityInterface"
import GameInterface from "@/app/domain/game/GameInterface"
import { MetaDataInterface } from "@/app/domain/MetaDataInterface"
import { ActionInterface } from "@/app/domain/action/ActionInterface"

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
