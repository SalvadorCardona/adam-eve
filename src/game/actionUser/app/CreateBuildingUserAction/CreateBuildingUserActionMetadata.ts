import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { playSound } from "@/src/game/3D/playSong"
import song from "./build_song.mp3?url"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { aroundVector } from "@/src/game/3D/Vector"

import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"

export const createBuildingUserActionMetadata: ActionUserMetaDataInterface = {
  "@type": "user-action/create-building",
  onCall: ({ game, metaData }) => {
    game.userControl.entityShouldBeCreated = metaData as EntityMetaDataInterface
    game.userControl.mouseIcon = mouseIcon.build
    game.userControl.mouseIcon = mouseIcon.build
    game.userControl.currentAction = createBuildingUserActionMetadata
  },
  onApply: ({ game }) => {
    if (!game.userControl.mousePosition || !game.userControl.entityShouldBeCreated) {
      return
    }

    const metaInterface = game.userControl
      .entityShouldBeCreated as EntityMetaDataInterface
    const newEntity = metaInterface.factory({
      entity: {
        position: aroundVector(game.userControl.mousePosition),
      },
    })
    playSound(song)
    addEntityToGame(game, newEntity)
  },
}
