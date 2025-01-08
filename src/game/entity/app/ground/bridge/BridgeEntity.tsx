import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import imageSource from "./bridge.glb?url"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"

export const bridgeEntityMetaData = entityMedataFactory({
  asset: {
    model3d: imageSource,
    icon: imageIcon,
  },
  canBeBuild: ({ entity, game }) => {
    const grounds = entityQuery(game, { "@type": appLdType.entityGround })
    for (const ground of grounds) {
      if (entityHasCollision(entity, ground)) {
        return false
      }
    }

    return true
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityGround, "bridge"),
  label: "Pont",
  defaultEntity: () => {
    return {
      life: 50,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
    }
  },
})
