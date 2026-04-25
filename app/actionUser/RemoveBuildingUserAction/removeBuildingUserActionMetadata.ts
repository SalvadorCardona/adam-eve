import { ActionUserResource } from "@/packages/game/actionUser/ActionUserResource"
import icon from "./icon.png"
import { playSound } from "@/packages/playSong"
import song from "./broken-sound.wav?url"
import { removeEntityToGame } from "@/packages/game/entity/useCase/removeEntityToGame"
import { mouseIcon } from "@/packages/ui/MouseCursor/MouseIcon"
import { hasActionUser } from "@/packages/game/actionUser/hasActionUser"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"

export const removeBuildingUserActionMetadata: ActionUserResource = {
  asset: {
    icon: icon,
  },
  mouseIcon: mouseIcon.removeBuilding,
  "@id": "remove-building",
  "@type": "action-user",
  onCall: ({ game }) => {
    game.userControl.currentAction = removeBuildingUserActionMetadata
  },
  onApply: ({ game }) => {
    if (!hasActionUser(game, removeBuildingUserActionMetadata)) {
      return
    }

    const selectedId = game.userControl.entitySelected
    if (!selectedId) return

    const entity = entityQueryFindOne(game, { "@id": selectedId })
    if (!entity) return

    removeEntityToGame(game, entity)
    game.userControl.entitySelected = undefined
    playSound(song)
  },
}
