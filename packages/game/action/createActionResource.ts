import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"
import { getLdIri } from "@/packages/jsonLd/jsonLd"
import {
  BaseGameResource,
  createResourceGame,
} from "@/packages/game/BaseGameResource"

export function createActionResource<
  T extends ActionResourceInterface = ActionResourceInterface,
>(actionResource: BaseGameResource & Partial<T>): T {
  actionResource.createItem = (payload) => {
    if (payload?.createdBy) {
      action.createdBy = getLdIri(payload.createdBy)
    }

    return payload
  }

  return createResourceGame({ ...actionResource }) as T
}
