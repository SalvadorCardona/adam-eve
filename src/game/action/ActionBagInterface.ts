import { ActionInterface } from "@/src/game/action/ActionInterface"
import { JsonLdIriContainerInterface } from "@/src/utils/jsonLd/jsonLd"

export type ActionBagInterface = JsonLdIriContainerInterface<ActionInterface<any>>
