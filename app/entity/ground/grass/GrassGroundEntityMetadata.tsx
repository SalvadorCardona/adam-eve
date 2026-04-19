import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { appLdType } from "@/app/AppLdType"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { entityHasCollision } from "@/packages/game/entity/useCase/entityHasCollision"
import grassIcon from "./icon.svg?url"
import grassTexture from "./grass.svg?url"
import { Sprite } from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
import React from "react"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"

const GrassComponent = React.memo(
  function GrassComponent({ size }: { size: { x: number; y: number } }) {
    return (
      <Sprite image={grassTexture} options={{ width: size.x, height: size.y }} />
    )
  },
  (prev, next) => prev.size.x === next.size.x && prev.size.y === next.size.y,
)

export const grassGroundEntityMetadata = createEntityResource({
  ["@id"]: "entity/ground/grass",
  entityType: EntityType.ground,
  asset: {
    icon: grassIcon,
    model2d: grassTexture,
    asset2d: [grassTexture],
  },
  propriety: {
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
  ["@type"]: createJsonLdType(appLdType.entityGround, "grass"),
  label: "Herbe",
  canBeBuild: ({ entity, game }) => {
    const grounds = entityQuery(game, { "@type": appLdType.entityGround })
    for (const ground of grounds) {
      if (entityHasCollision(entity, ground)) {
        return false
      }
    }

    return true
  },
  component: GrassComponent,
})
