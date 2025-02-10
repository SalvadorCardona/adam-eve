import EntityInterface, {
  BuildingEntityInterface,
  CharacterEntityInterface,
} from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { ActionInterface } from "@/src/game/action/ActionInterface"

export interface ActionPayload<T> {
  entity?: BuildingEntityInterface | CharacterEntityInterface
  game: GameInterface
  action: ActionInterface<T>
}

export interface ActionMetadataInterface<T = object>
  extends BaseGameMetaDataInterface {
  onFrame: (payload: ActionPayload<T>) => void
  factory: (payload?: {
    entity?: EntityInterface
    game?: GameInterface
    createdBy?: ActionInterface["createdBy"]
  }) => ActionInterface<T>
}
