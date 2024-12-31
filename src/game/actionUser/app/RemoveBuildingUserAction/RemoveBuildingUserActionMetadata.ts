import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import icon from "./icon.png"
import { playSound } from "@/src/utils/playSong"
import song from "./broken-sound.wav?url"
import { removeEntityToGame } from "@/src/game/entity/useCase/removeEntityToGame"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/OnSelectEntityUserActionMetadata"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const removeBuildingUserActionMetadata: ActionUserMetaDataInterface = {
  asset: {
    icon: icon,
  },
  "@type": JsonLdTypeFactory(appLdType.userAction, "remove-building"),
  onCall: ({ game }) => {
    game.userControl.mouseIcon = mouseIcon.removeBuilding
    game.userControl.currentAction = removeBuildingUserActionMetadata
  },
  onApply: ({ game, entity }) => {
    if (
      !onSelectEntityUserActionMetadata.data.entitySelection ||
      !hasActionUser(game, removeBuildingUserActionMetadata)
    ) {
      return
    }

    playSound(song)
    removeEntityToGame(game, entity)
  },
}
