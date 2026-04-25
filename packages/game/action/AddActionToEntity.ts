import { updateContainer } from "@/packages/jsonLd/jsonLd"
import { hasAction } from "@/packages/game/action/HasAction"
import {
  ActionableInterface,
  ActionBagInterface,
  ActionInterface,
} from "@/packages/game/action/ActionResourceInterface"

export function addActionToEntity(
  subjet: ActionableInterface,
  action: ActionInterface<any>,
) {
  if (!hasAction(subjet)) {
    subjet.actions = {}
  }

  updateContainer(subjet.actions as ActionBagInterface, action)

  return action
}
