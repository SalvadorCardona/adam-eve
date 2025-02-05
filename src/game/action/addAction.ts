import {
  ActionBagInterface,
  ActionnableInterface,
} from "@/src/game/action/ActionBagInterface"
import { ActionInterface } from "@/src/game/action/ActionInterface"
import { updateContainer } from "@/src/utils/jsonLd/jsonLd"

export function addAction(
  bag: ActionBagInterface,
  action: ActionInterface<any>,
): void {
  updateContainer(bag, action)
}

export function addActionToEntity(
  sujet: ActionnableInterface,
  action: ActionInterface<any>,
): void {
  if (!sujet.actions) {
    sujet.actions = {}
  }

  updateContainer(sujet.actions, action)
}
