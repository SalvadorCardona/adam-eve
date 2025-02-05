import {
  ActionBagInterface,
  ActionnableInterface,
} from "@/src/game/action/ActionBagInterface"
import { ActionInterface } from "@/src/game/action/ActionInterface"
import { ContainerAction, updateContainer } from "@/src/utils/jsonLd/jsonLd"

export function removeAction(
  bag: ActionBagInterface,
  action: ActionInterface<any>,
): void {
  updateContainer(bag, action)
}

export function removeActionFromEntity(
  sujet: ActionnableInterface,
  action: ActionInterface<any>,
): void {
  if (!sujet.actions) {
    sujet.actions = {}
  }

  updateContainer(sujet.actions, action, ContainerAction.remove)
}
