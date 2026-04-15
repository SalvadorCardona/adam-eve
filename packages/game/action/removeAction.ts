import {
  ActionableInterface,
  ActionInterface,
} from "@/packages/game/action/ActionInterface"
import { ContainerAction, updateContainer } from "@/packages/jsonLd/jsonLd"

export function removeActionFromEntity(
  sujet: ActionableInterface,
  action: ActionInterface<any>,
): void {
  if (!sujet.actions) {
    sujet.actions = {}
  }

  updateContainer(sujet.actions, action, ContainerAction.remove)
}
