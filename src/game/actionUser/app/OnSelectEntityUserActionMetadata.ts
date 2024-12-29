import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/RemoveBuildingUserActionMetadata"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { findClosestInGame } from "@/src/game/3D/findClosest"
import { distanceBetweenVectors3 } from "@/src/game/3D/distanceBetweenVectors3"

interface OnClickEntityUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  data: { entitySelection: EntityInterface | undefined }
}

export const onSelectEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@type": "user-action/on-click-entity",
    onApply: ({ game, entity }) => {
      if (entity) {
        const buildingEntity = findClosestInGame(entity, "entity/building", game)
        if (
          buildingEntity &&
          distanceBetweenVectors3(entity.position, buildingEntity?.position) < 1
        ) {
          onSelectEntityUserActionMetadata.data.entitySelection = buildingEntity
        }
        const characterEntity = findClosestInGame(entity, "entity/character", game)
        if (
          characterEntity &&
          distanceBetweenVectors3(entity.position, characterEntity?.position) < 1
        ) {
          onSelectEntityUserActionMetadata.data.entitySelection = characterEntity
        }
      }

      if (!game.userControl.currentAction) {
        game.userControl.currentAction = onSelectEntityUserActionMetadata
      }

      removeBuildingUserActionMetadata.onApply &&
        removeBuildingUserActionMetadata.onApply({ game, entity })
    },
    data: {
      entitySelection: undefined,
    },
  }
