import { createActionResource } from "@/packages/game/action/createActionResource"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { gameResource } from "@/packages/game/game/gameResource"

export const SAVE_GAME_INTERVAL = 1000

export const saveGameActionResource = createActionResource({
  ["@id"]: "save-game",
  onFrame: ({ game, action }) => {
    updateNextTick(game, action, SAVE_GAME_INTERVAL)
    gameResource.persistItem(game)
  },
})
