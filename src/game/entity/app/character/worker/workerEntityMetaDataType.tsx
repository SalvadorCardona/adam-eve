import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"

export const workerEntityMetaDataType = createJsonLdType(
  appLdType.entityCharacter,
  "worker",
)
