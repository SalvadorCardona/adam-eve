import { BaseJsonLdInterface, updateContainer } from "@/src/utils/jsonLd/jsonLd"
import {
  ActionBagInterface,
  ActionnableInterface,
} from "@/src/game/action/ActionBagInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"

export interface ActionInterface<T = object> extends BaseJsonLdInterface {
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
