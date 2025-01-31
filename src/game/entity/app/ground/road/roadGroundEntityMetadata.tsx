import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import roadIcon from "./roadIcon.png"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const roadGroundEntityMetadata = entityMedataFactory({
  asset: {
    icon: roadIcon,
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityGround, "road"),
  label: "Route",
  propriety: {
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
})
