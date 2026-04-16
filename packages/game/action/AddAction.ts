import { updateContainer } from "@/packages/jsonLd/jsonLd"
import {
  ActionBagInterface,
  ActionInterface,
} from "@/packages/game/action/ActionResourceInterface"

export function addAction(
  bag: ActionBagInterface,
  action: ActionInterface<any>,
): void {
  updateContainer(bag, action)
}
