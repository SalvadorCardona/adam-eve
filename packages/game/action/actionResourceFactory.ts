import { metaDataFactory } from "@/packages/metadata/MetadataInterface"
import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"
import { createJsonLd, getLdIri } from "@/packages/jsonLd/jsonLd"
import { ActionInterface } from "@/packages/game/action/ActionInterface"

export function actionResourceFactory<
  T extends ActionResourceInterface = ActionResourceInterface,
>(actionResource: { "@id": string } & Partial<T>): T {
  const meta = {
    "@type": "resource/action",
    ...actionResource,
  } as Partial<ActionResourceInterface>

  meta.factory = (payload) => {
    const action = createJsonLd<ActionInterface>(actionResource["@id"], {})

    if (payload?.createdBy) {
      action.createdBy = getLdIri(payload.createdBy)
    }

    return action
  }

  return metaDataFactory({ ...meta, ...actionResource }) as T
}
