import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import icon from "./icon.png"
import { playSound } from "@/src/game/3D/playSong"
import song from "./broken-sound.wav?url"
import { removeEntityToGame } from "@/src/game/entity/useCase/removeEntityToGame"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"

export const removeBuildingUserActionMetadata: ActionUserMetaDataInterface = {
  asset: {
    icon: icon,
  },
  "@type": "user-action/remove-building",
  onCall: ({ game }) => {
    game.userControl.entityShouldBeRemoved = true
    game.userControl.mouseIcon = mouseIcon.removeBuilding
    game.userControl.currentAction = removeBuildingUserActionMetadata
  },
  onApply: ({ game, entity }) => {
    if (game.userControl.entityShouldBeRemoved) {
      playSound(song)
      removeEntityToGame(game, entity)
    }
  },
}
