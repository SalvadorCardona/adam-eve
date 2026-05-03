import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { findTileUnderEntity } from "@/packages/game/game/useCase/query/groundQuery"
import grassIcon from "./icon.png"
import grassTexture from "./grass.png"
import flowerYellow from "./decorations/flower-yellow.svg?url"
import flowerPink from "./decorations/flower-pink.svg?url"
import flowerBlue from "./decorations/flower-blue.svg?url"
import grassTuft from "./decorations/grass-tuft.svg?url"
import pebble from "./decorations/pebble.svg?url"
import { Sprite } from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
import React from "react"

const GrassComponent = React.memo(
  function GrassComponent({ size }: { size: { x: number; y: number } }) {
    return (
      <Sprite image={grassTexture} options={{ width: size.x, height: size.y }} />
    )
  },
  (prev, next) => prev.size.x === next.size.x && prev.size.y === next.size.y,
)

export const grassGroundEntityMetadata = createEntityResource({
  ["@id"]: "grass",
  entityType: EntityType.ground,
  asset: {
    icon: grassIcon,
    model2d: grassTexture,
    asset2d: [grassTexture],
    decorations: [flowerYellow, flowerPink, flowerBlue, grassTuft, pebble],
  },
  propriety: {
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
  label: "Herbe",
  canBeBuild: ({ entity, game }) => {
    return findTileUnderEntity(game, entity) === undefined
  },
  component: GrassComponent,
})
