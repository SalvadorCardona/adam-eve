import { BaseGameResource } from "@/packages/game/BaseGameResource"
import GameInterface from "@/packages/game/game/GameInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"

export interface ActionUserResource<D = object> extends BaseGameResource {
  mouseIcon?: string
  onCall?: (payload: { game: GameInterface; metaData?: BaseGameResource }) => void
  onApply: (payload: { game: GameInterface; entity?: EntityInterface }) => void
  data?: D
}
