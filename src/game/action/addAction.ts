import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { ActionInterface } from "@/src/game/action/ActionInterface"
import { updateContainer } from "@/src/utils/jsonLd/jsonLd"

export function addAction(
  bag: ActionBagInterface,
  action: ActionInterface<any>,
): void {
  updateContainer(bag, action)
}
