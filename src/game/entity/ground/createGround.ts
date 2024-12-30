import {
  GroundInterface,
  GroundNetwork,
} from "@/src/game/entity/ground/GroundInterface"
import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { updateGround } from "@/src/game/entity/ground/updateGround"

export function createGround(
  grid: GroundNetwork,
  position: { x: number; y: number },
  type?: string,
) {
  const newRoad = jsonLdFactory<GroundInterface>((type ?? "road") + "/item", {
    position,
    connections: {
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
    },
  })

  grid.push(newRoad)

  updateGround({ grid })

  return newRoad
}
