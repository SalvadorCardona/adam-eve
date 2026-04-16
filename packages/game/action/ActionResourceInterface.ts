import EntityInterface from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { BaseGameResource } from "@/packages/game/BaseGameResource"
import {
  BaseJsonLdItemInterface,
  JsonLdIriContainerInterface,
} from "@/packages/jsonLd/jsonLd"

export interface ActionableInterface {
  actions?: ActionBagInterface
}

export type ActionBagInterface = JsonLdIriContainerInterface<ActionInterface<any>>

export interface ActionInterface<T = object> extends BaseJsonLdItemInterface {
  data: T
  nextTick?: number
  createdBy: EntityInterface["@id"]
}

export interface ActionPayload<T extends object = object> {
  entity?: EntityInterface
  game: GameInterface
  action: ActionInterface<T>
}

export interface ActionResourceInterface<
  T extends ActionInterface = ActionInterface,
> extends BaseGameResource<T> {
  onFrame: (payload: ActionPayload<T>) => void
}
