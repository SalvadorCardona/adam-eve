import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import icon from "./icon.png"
import { playSound } from "@/src/utils/playSong"
import song from "./broken-sound.wav?url"
import { removeEntityToGame } from "@/src/game/entity/useCase/removeEntityToGame"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { entityQueryFindOne } from "@/src/game/game/useCase/query/entityQuery"

export const removeBuildingUserActionMetadata: ActionUserMetaDataInterface = {
  asset: {
    icon: icon,
  },
  mouseIcon: mouseIcon.removeBuilding,
  "@type": createJsonLdType(appLdType.userAction, "remove-building"),
  onCall: ({ game }) => {
    game.userControl.currentAction = removeBuildingUserActionMetadata
  },
  onApply: ({ game }) => {
    if (!hasActionUser(game, removeBuildingUserActionMetadata)) {
      return
    }

    if (game.userControl.entitiesSelected.length > 0) {
      game.userControl.entitiesSelected.forEach((entityUri) => {
        const entity = entityQueryFindOne(game, { "@id": entityUri })
        if (entity) {
          removeEntityToGame(game, entity)
        }
      })
      playSound(song)
    }
  },
}
