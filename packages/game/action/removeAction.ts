import {
  ActionableInterface,
  ActionInterface,
} from "@/packages/game/action/ActionResourceInterface"
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
