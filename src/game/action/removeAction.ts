import {
  ActionnableInterface,
} from "@/src/game/action/ActionBagInterface"
import { ActionInterface } from "@/src/game/action/ActionInterface"
import { ContainerAction, updateContainer } from "@/packages/jsonLd/jsonLd"

export function removeActionFromEntity(
  sujet: ActionnableInterface,
  action: ActionInterface<any>,
): void {
  if (!sujet.actions) {
    sujet.actions = {}
  }

  updateContainer(sujet.actions, action, ContainerAction.remove)
}
