import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const workerEntityMetaDataType = createJsonLdType(
  appLdType.entityCharacter,
  "worker",
)
