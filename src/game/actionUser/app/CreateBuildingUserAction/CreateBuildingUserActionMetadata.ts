import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { playSound } from "@/src/utils/playSong"
import song from "./build_song.mp3?url"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { aroundVector } from "@/src/utils/3Dmath/aroundVector"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

interface CreateBuildingUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  data: { entityMetaData: EntityMetaDataInterface | undefined }
}

export const createBuildingUserActionMetadata: CreateBuildingUserActionMetadataInterface =
  {
    "@type": JsonLdTypeFactory(appLdType.userAction, "create-building"),
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
        game,
        entity: {
          position: aroundVector(game.userControl.mousePosition, true),
        },
      })

      if (addEntityToGame(game, newEntity)) {
        playSound(song)
      }
    },
    data: {
      entityMetaData: undefined,
    },
  }
