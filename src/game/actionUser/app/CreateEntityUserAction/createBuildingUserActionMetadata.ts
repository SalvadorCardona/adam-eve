import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { playSound } from "@/src/utils/playSong"
import song from "./build_song.mp3?url"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { diviseVector } from "@/src/utils/3Dmath/diviseVector"
import { bounding2DSize, boundingBoxObbToAabb } from "@/src/utils/3Dmath/boudingBox"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { config } from "@/src/app/config"

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
        !createBuildingUserActionMetadata.data.entityMetaData ||
        !hasActionUser(game, createBuildingUserActionMetadata)
      ) {
        return
      }
      console.log("Entities go to build")
      const bounding = boundingBoxObbToAabb(game.userControl.mouseState.bounding3D)
      const rotationY = game.userControl?.rotation ?? 0
      const metaInterface = createBuildingUserActionMetadata.data.entityMetaData
      const isMultipleBuilding =
        bounding2DSize(game.userControl.mouseState.bounding3D) > 1
      const entities: EntityInterface[] = []
      if (isMultipleBuilding) {
        const positions = diviseVector(
          bounding.min,
          bounding.max,
          config.pixiJs2dItemSize,
        )

        positions.forEach((newPosition) => {
          const entity = metaInterface.factory({
            game,
            entity: {
              position: newPosition,
              rotation: { x: 0, z: 0, y: rotationY },
            },
          })

          // const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
          // entity.position.z = entity.position.z +=
          //   entityMetaData.propriety.size?.z ?? 0
          // entity.position.x = entity.position.x +=
          //   entityMetaData.propriety.size?.x ?? 0

          entities.push(entity)
        })
      } else {
        entities.push(
          metaInterface.factory({
            game,
            entity: {
              position: game.userControl.mouseState.bounding3D.position,
              rotation: { x: 0, z: 0, y: rotationY },
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

      console.log("current entities", Object.values(game.entities).length)
      console.log("current array", Object.values(game.entities))

      game.userControl.rotation = 0
    },
    data: {
      entityMetaData: undefined,
    },
  }
