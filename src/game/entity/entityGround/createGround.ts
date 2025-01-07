import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { updateGround } from "@/src/game/entity/entityGround/updateGround"
import { GroundInterface, GroundNetwork } from "./GroundInterface"

export function createGround(
  grid: GroundNetwork,
  position: { x: number; y: number },
  type?: string,
) {
  const newRoad = jsonLdFactory<GroundInterface>((type ?? "ground") + "/item", {
    position,
    connections: {
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
    },
  })

  grid.push(newRoad)

  updateGround({ entities: grid })

  return newRoad
}
