import { entityResourceFactory } from "@/src/game/entity/EntityResourceFactory"
import roadIcon from "./roadIcon.png"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"

export const roadGroundEntityMetadata = entityResourceFactory({
  asset: {
    icon: roadIcon,
  },
  ["@type"]: createJsonLdType(appLdType.entityGround, "road"),
  label: "Route",
  propriety: {
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
})
