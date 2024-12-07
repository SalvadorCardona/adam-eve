import { JsonLdContainerInterface } from "@/packages/container/container"
import { ActionInterface } from "@/app/domain/action/ActionInterface"

export interface ActionBagInterface
  extends JsonLdContainerInterface<ActionInterface<any>> {}
