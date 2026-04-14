import EntityInterface, {
  BuildingEntityInterface,
  CharacterEntityInterface,
} from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/packages/game/BaseGameMetaDataInterface"
import { ActionInterface } from "@/packages/game/action/ActionInterface"

export interface ActionPayload<T extends object = object> {
  entity?: BuildingEntityInterface | CharacterEntityInterface
  game: GameInterface
  action: ActionInterface<T>
}

export interface ActionResourceInterface<
  T extends object = object,
> extends BaseGameMetaDataInterface {
  onFrame: (payload: ActionPayload<T>) => void
  factory: (payload?: {
    entity?: EntityInterface
    game?: GameInterface
    createdBy?: ActionInterface["createdBy"]
  }) => ActionInterface<T>
}
