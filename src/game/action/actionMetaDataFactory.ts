import { metaDataFactory } from "@/src/utils/metadata/MetadataInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionMetadataInterface"
import { createJsonLd, getLdIri } from "@/src/utils/jsonLd/jsonLd"
import { ActionInterface } from "@/src/game/action/ActionInterface"

export function actionMetaDataFactory<
  T extends ActionMetadataInterface = ActionMetadataInterface,
>(actionMeta: Partial<T>): T {
  const meta = {
    "@type": "undefined",
    ...actionMeta,
  } as T

  if (!meta.factory) {
    meta.factory = (payload) => {
      const action = createJsonLd<ActionInterface>(meta["@type"], {})

      if (payload?.createdBy) {
        action.createdBy = getLdIri(payload.createdBy)
      }

      return action
    }
  }

  return metaDataFactory(meta) as T
}
