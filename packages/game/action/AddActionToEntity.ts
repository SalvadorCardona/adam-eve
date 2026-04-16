import { updateContainer } from "@/packages/jsonLd/jsonLd"
import { hasAction } from "@/packages/game/action/HasAction"
import {
  ActionableInterface,
  ActionBagInterface,
  ActionInterface,
} from "@/packages/game/action/ActionResourceInterface"

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
