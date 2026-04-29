import { createActionResource } from "@/packages/game/action/createActionResource"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { updateFogOfWar } from "@/packages/game/game/useCase/updateFogOfWar"

export const UPDATE_FOG_OF_WAR_INTERVAL = 60

export const updateFogOfWarActionResource = createActionResource({
  ["@id"]: "update-fog-of-war",
  onFrame: ({ game, action }) => {
    updateNextTick(game, action, UPDATE_FOG_OF_WAR_INTERVAL)
    updateFogOfWar(game)
  },
})
