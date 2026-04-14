import { ActionInterface } from "@/packages/game/action/ActionInterface"
import { JsonLdIriContainerInterface } from "@/packages/jsonLd/jsonLd"

export type ActionBagInterface = JsonLdIriContainerInterface<ActionInterface<any>>

export interface ActionnableInterface {
  actions?: ActionBagInterface
}
