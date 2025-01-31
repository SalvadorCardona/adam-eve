import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { playSound } from "@/src/utils/playSong"
import song from "./build_song.mp3?url"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { diviseVector2D } from "@/src/utils/math/diviseVector"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { config } from "@/src/app/config"
import { vector2ToVector3 } from "@/src/utils/math/vector"
import { getEntitiesInGame } from "@/src/game/game/useCase/query/getEntitiesInGame"

interface CreateBuildingUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  data: { entityMetaData: EntityMetaDataInterface | undefined }
}

export const createEntityUserActionMetadata: CreateBuildingUserActionMetadataInterface =
  {
    mouseIcon: mouseIcon.build,
    "@type": JsonLdTypeFactory(appLdType.userAction, "create-building"),
    onCall: ({ game, metaData }) => {
      createEntityUserActionMetadata.data.entityMetaData =
        metaData as EntityMetaDataInterface
      game.userControl.currentAction = createEntityUserActionMetadata
    },
    onApply: ({ game }) => {
      if (
        !createEntityUserActionMetadata.data.entityMetaData ||
        !hasActionUser(game, createEntityUserActionMetadata)
      ) {
        return
      }

      const rotationY = game.userControl?.rotation ?? 0
      const positions = diviseVector2D(
        game.mouseState.startPosition,
        game.mouseState.endPosition,
        config.pixiJs2dItemSize,
      )

      const metaInterface = createEntityUserActionMetadata.data.entityMetaData

      const entities: EntityInterface[] = []
      if (positions.length > 1) {
        positions.forEach((newPosition) => {
          const entity = metaInterface.factory({
            game,
            entity: {
              position: vector2ToVector3(newPosition),
              rotation: rotationY,
            },
          })

          entities.push(entity)
        })
      } else {
        entities.push(
          metaInterface.factory({
            game,
            entity: {
              position: vector2ToVector3(game.mouseState.position),
              rotation: rotationY,
            },
          }),
        )
      }

      const result = entities.map((entity) => {
        const canBeBuild = metaInterface.canBeBuild({ game, entity })
        if (canBeBuild) {
          addEntityToGame(game, entity)
        }

        return canBeBuild
      })
      if (result.some((e) => e)) {
        playSound(song)
        game.userControl.entitiesSelected = []
      }

      console.log("current entities", getEntitiesInGame(game).length)
      console.log("current array", getEntitiesInGame(game))

      game.userControl.rotation = 0
    },
    data: {
      entityMetaData: undefined,
    },
  }
