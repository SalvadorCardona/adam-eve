import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"

export interface ActionUserMetaDataInterface<D = object>
  extends GameMetaDataInterface {
  onCall?: (payload: {
    game: GameInterface
    metaData?: GameMetaDataInterface
  }) => void
  onApply?: (payload: { game: GameInterface; entity?: EntityInterface }) => void
  data?: D
}
