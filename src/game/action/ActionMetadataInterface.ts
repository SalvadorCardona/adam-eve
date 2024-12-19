import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import { ActionInterface } from "@/src/game/action/ActionInterface"

export interface ActionMetadataInterface<T> extends GameMetaDataInterface {
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

// un test
