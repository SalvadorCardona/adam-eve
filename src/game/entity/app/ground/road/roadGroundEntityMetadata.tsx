import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import roadIcon from "./roadIcon.png"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"

export const roadGroundEntityMetadata = entityMedataFactory({
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
