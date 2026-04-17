import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"
import {
  BaseGameResource,
  createResourceGame,
} from "@/packages/game/BaseGameResource"

export function createActionResource<
  T extends ActionResourceInterface<any> = ActionResourceInterface,
>(resource: Partial<BaseGameResource> & Partial<T>): T {
  resource["@type"] = "action"

  return createResourceGame({ ...resource }) as T
}
