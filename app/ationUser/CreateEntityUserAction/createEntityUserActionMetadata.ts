import { ActionUserResource } from "@/packages/game/actionUser/ActionUserResource"
import { playSound } from "@/packages/playSong"
import song from "./build_song.mp3?url"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { mouseIcon } from "@/packages/ui/MouseCursor/MouseIcon"
import { hasActionUser } from "@/packages/game/actionUser/hasActionUser"
import { diviseVector2D } from "@/packages/math/diviseVector"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { vector2ToVector3 } from "@/packages/math/vector"
import { vectorRatioDown } from "@/packages/math/ratio"

interface CreateBuildingUserActionMetadataInterface extends ActionUserResource {
  data: { entityMetaData: EntityResourceInterface | undefined }
}

export const createEntityUserActionMetadata: CreateBuildingUserActionMetadataInterface =
  {
    mouseIcon: mouseIcon.build,
    "@id": "create-building",
    "@type": "action-user",
    onCall: ({ game, metaData }) => {
      createEntityUserActionMetadata.data.entityMetaData =
        metaData as EntityResourceInterface
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
        vectorRatioDown(game.mouseState.startPosition, game.camera.zoom),
        vectorRatioDown(game.mouseState.endPosition, game.camera.zoom),
      )

      const mousePosition = vectorRatioDown(
        game.mouseState.position,
        game.camera.zoom,
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
              position: vector2ToVector3(mousePosition),
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

      game.userControl.rotation = 0
    },
    data: {
      entityMetaData: undefined,
    },
  }
