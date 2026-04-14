import { BaseJsonLdItemInterface, updateContainer } from "@/packages/jsonLd/jsonLd"
import {
  ActionBagInterface,
  ActionnableInterface,
} from "@/packages/game/action/ActionBagInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"

export interface ActionInterface<T = object> extends BaseJsonLdItemInterface {
  data: T
  nextTick?: number
  createdBy: EntityInterface["@id"]
}

export function addAction(
  bag: ActionBagInterface,
  action: ActionInterface<any>,
): void {
  updateContainer(bag, action)
}

export function addActionToEntity(
  sujet: ActionnableInterface,
  action: ActionInterface<any>,
) {
  if (!hasAction(sujet)) {
    sujet.actions = {}
  }

  updateContainer(sujet.actions as ActionBagInterface, action)

  return action
}

export function hasAction(sujet: ActionnableInterface): boolean {
  return !!sujet.actions
}
