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
import { diviseVector } from "@/src/utils/3Dmath/diviseVector"

interface CreateBuildingUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  data: { entityMetaData: EntityMetaDataInterface | undefined }
}

export const createBuildingUserActionMetadata: CreateBuildingUserActionMetadataInterface =
  {
    mouseIcon: mouseIcon.build,
    "@type": JsonLdTypeFactory(appLdType.userAction, "create-building"),
    onCall: ({ game, metaData }) => {
      createBuildingUserActionMetadata.data.entityMetaData =
        metaData as EntityMetaDataInterface
      game.userControl.currentAction = createBuildingUserActionMetadata
    },
    onApply: ({ game }) => {
      if (
        !game.userControl.mouseState.mousePosition ||
        !createBuildingUserActionMetadata.data.entityMetaData ||
        !hasActionUser(game, createBuildingUserActionMetadata)
      ) {
        return
      }

      const rotationY = game.userControl?.rotation ?? 0
      const mouseState = game.userControl.mouseState

      const metaInterface = createBuildingUserActionMetadata.data.entityMetaData
      if (mouseState.size > 1) {
        const positions = diviseVector(
          mouseState.startClickPositon,
          mouseState.endClickPosition,
        )
        positions.forEach((e) => {
          const entity = metaInterface.factory({
            game,
            entity: {
              position: aroundVector(e, true),
              rotation: { x: 0, z: 0, y: rotationY },
            },
          })
          console.log(metaInterface.canBeBuild({ game, entity }))
          if (metaInterface.canBeBuild({ game, entity })) {
            addEntityToGame(game, entity)
            game.userControl.rotation = 0
            playSound(song)
          }
        })
        return
      }

      const entity = metaInterface.factory({
        game,
        entity: {
          position: aroundVector(game.userControl.mouseState.mousePosition, true),
          rotation: { x: 0, z: 0, y: rotationY },
        },
      })

      if (metaInterface.canBeBuild({ game, entity })) {
        addEntityToGame(game, entity)
        game.userControl.rotation = 0
        playSound(song)
      }
    },
    data: {
      entityMetaData: undefined,
    },
  }
