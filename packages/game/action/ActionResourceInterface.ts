import EntityInterface from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import {
  BaseGameResource,
  CreateItemPayload,
} from "@/packages/game/BaseGameResource"
import { ActionInterface } from "@/packages/game/action/ActionInterface"
import { BaseJsonLdItemInterface } from "@/packages/jsonLd/jsonLd"

export interface ActionPayload<T extends object = object> {
  entity?: EntityInterface
  game: GameInterface
  action: ActionInterface<T>
}

export interface ActionResourceInterface<
  T extends BaseJsonLdItemInterface = BaseJsonLdItemInterface,
> extends BaseGameResource<T> {
  onFrame: (payload: ActionPayload<T>) => void
  createItem: (payload?: {
    entity?: EntityInterface
    game?: GameInterface
    createdBy?: ActionInterface["createdBy"]
  }) => CreateItemPayload<T>
}
