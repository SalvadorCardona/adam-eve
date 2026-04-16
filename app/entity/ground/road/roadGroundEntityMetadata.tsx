import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import roadIcon from "./roadIcon.png"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"

export const roadGroundEntityMetadata = createEntityResource({
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
