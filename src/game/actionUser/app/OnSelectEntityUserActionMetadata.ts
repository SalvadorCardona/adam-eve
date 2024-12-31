import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { removeBuildingUserActionMetadata } from "@/src/game/actionUser/app/RemoveBuildingUserAction/RemoveBuildingUserActionMetadata"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { findClosestInGame } from "@/src/utils/3Dmath/findClosest"
import { distanceBetweenVector3 } from "@/src/utils/3Dmath/distanceBetweenVector3"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

interface OnClickEntityUserActionMetadataInterface
  extends ActionUserMetaDataInterface {
  data: { entitySelection: EntityInterface | undefined }
}

export const onSelectEntityUserActionMetadata: OnClickEntityUserActionMetadataInterface =
  {
    "@type": JsonLdTypeFactory(appLdType.userAction, "on-click-entity"),
    onApply: ({ game, entity }) => {
      if (entity) {
        const buildingEntity = findClosestInGame(entity, "entity/building", game)
        if (
          buildingEntity &&
          distanceBetweenVector3(entity.position, buildingEntity?.position) < 1
        ) {
          onSelectEntityUserActionMetadata.data.entitySelection = buildingEntity
        }
        const characterEntity = findClosestInGame(entity, "entity/character", game)
        if (
          characterEntity &&
          distanceBetweenVector3(entity.position, characterEntity?.position) < 1
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
