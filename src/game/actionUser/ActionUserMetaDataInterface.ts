import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"

export interface ActionUserMetaDataInterface<D = object>
  extends BaseGameMetaDataInterface {
  onCall?: (payload: {
    game: GameInterface
    metaData?: BaseGameMetaDataInterface
  }) => void
  onApply?: (payload: { game: GameInterface; entity?: EntityInterface }) => void
  data?: D
}
