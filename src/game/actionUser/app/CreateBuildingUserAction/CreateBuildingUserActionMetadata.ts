import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { playSound } from "@/src/game/3D/playSong"
import song from "./build_song.mp3?url"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { aroundVector } from "@/src/game/3D/Vector"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"

interface CreateBuildingUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  data: { entityMetaData: EntityMetaDataInterface | undefined }
}

export const createBuildingUserActionMetadata: CreateBuildingUserActionMetadataInterface =
  {
    "@type": "user-action/create-building",
    onCall: ({ game, metaData }) => {
      createBuildingUserActionMetadata.data.entityMetaData =
        metaData as EntityMetaDataInterface
      game.userControl.mouseIcon = mouseIcon.build
      game.userControl.currentAction = createBuildingUserActionMetadata
    },
    onApply: ({ game }) => {
      if (
        !game.userControl.mousePosition ||
        !createBuildingUserActionMetadata.data.entityMetaData ||
        !hasActionUser(game, createBuildingUserActionMetadata)
      ) {
        return
      }

      const metaInterface = createBuildingUserActionMetadata.data.entityMetaData
      const newEntity = metaInterface.factory({
        entity: {
          position: aroundVector(game.userControl.mousePosition),
        },
      })

      playSound(song)
      addEntityToGame(game, newEntity)
    },
    data: {
      entityMetaData: undefined,
    },
  }
