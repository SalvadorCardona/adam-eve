import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"
import {
  BaseGameResource,
  createResourceGame,
} from "@/packages/game/BaseGameResource"
import { createJsonLd } from "@/packages/jsonLd/jsonLd"

export function createActionResource<
  T extends ActionResourceInterface<any> = ActionResourceInterface,
>(resource: Partial<BaseGameResource> & Partial<T>): T {
  resource["@type"] = "action"

  const withCreate: Partial<BaseGameResource> & Partial<T> = {
    ...resource,
  }

  if (!withCreate.create) {
    const actionId = resource["@id"] ?? "action"
    withCreate.create = ((payload: any = {}) => {
      const base = payload.item ?? payload.entity ?? {}
      return createJsonLd(actionId, {
        data: base.data ?? {},
        createdBy: base.createdBy ?? "",
      })
    }) as T["create"]
  }

  return createResourceGame(withCreate) as T
}
