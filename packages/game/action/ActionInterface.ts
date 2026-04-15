import {
  BaseJsonLdItemInterface,
  JsonLdIriContainerInterface,
  updateContainer,
} from "@/packages/jsonLd/jsonLd"
import EntityInterface from "@/packages/game/entity/EntityInterface"

export interface ActionableInterface {
  actions?: ActionBagInterface
}

export type ActionBagInterface = JsonLdIriContainerInterface<ActionInterface<any>>

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
  sujet: ActionableInterface,
  action: ActionInterface<any>,
) {
  if (!hasAction(sujet)) {
    sujet.actions = {}
  }

  updateContainer(sujet.actions as ActionBagInterface, action)

  return action
}

export function hasAction(sujet: ActionableInterface): boolean {
  return !!sujet.actions
}
