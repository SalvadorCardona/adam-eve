import { metaDataFactory } from "@/src/utils/metadata/MetadataInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionMetadataInterface"
import { createJsonLd } from "@/src/utils/jsonLd/jsonLd"

export function actionMetaDataFactory<
  T extends ActionMetadataInterface = ActionMetadataInterface<any>,
>(actionMeta: Partial<T>): T {
  const meta = {
    "@type": "union",
    ...actionMeta,
  } as T

  if (!meta.factory) {
    meta.factory = () => {
      return createJsonLd(meta["@type"], {})
    }
  }

  return metaDataFactory(meta) as T
}
