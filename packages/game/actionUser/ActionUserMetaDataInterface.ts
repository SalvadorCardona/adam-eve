import { BaseGameMetaDataInterface } from "@/packages/game/BaseGameMetaDataInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"

export interface ActionUserMetaDataInterface<
  D = object,
> extends BaseGameMetaDataInterface {
  mouseIcon?: string
  onCall?: (payload: {
    game: GameInterface
    metaData?: BaseGameMetaDataInterface
  }) => void
  onApply: (payload: { game: GameInterface; entity?: EntityInterface }) => void
  data?: D
}
