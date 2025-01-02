import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { ActionInterface } from "@/src/game/action/ActionInterface"

export interface ActionPayload<T> {
  entity?: EntityInterface
  game: GameInterface
  action: ActionInterface<T>
}

export interface ActionMetadataInterface<T> extends BaseGameMetaDataInterface {
  onFrame: (payload: ActionPayload<T>) => void
  factory: (payload: {
    entity?: EntityInterface
    game: GameInterface
  }) => ActionInterface<T>
}
