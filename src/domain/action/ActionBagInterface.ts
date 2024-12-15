import { JsonLdContainerInterface } from "@/packages/container/container"
import { ActionInterface } from "@/src/domain/action/ActionInterface"

export type ActionBagInterface = JsonLdContainerInterface<ActionInterface<any>>
