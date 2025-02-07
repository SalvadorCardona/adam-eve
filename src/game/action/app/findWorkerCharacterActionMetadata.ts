import {
  BuildingEntityInterface,
  CharacterEntityInterface,
} from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { appLdType } from "@/src/AppLdType"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import { actionMetaDataFactory } from "@/src/game/action/actionMetaDataFactory"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { getEntityWorkerNeeded } from "@/src/game/entity/useCase/query/getEntityWorkerNeeded"
import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/workerEntity"
import { updateNextTick } from "@/src/game/action/updateNextTick"
import { addActionToEntity, hasAction } from "@/src/game/action/ActionInterface"
import { addWorkerToEntity } from "@/src/game/entity/useCase/entityWorker"

export const findWorkerCharacterActionMetadata = actionMetaDataFactory({
  ["@type"]: createJsonLdType(appLdType.typeAction, "findWorkerCharacter"),
  onFrame: ({ action, game }) => {
    updateNextTick(game, action, 60)
    const buildings = entityQuery<BuildingEntityInterface>(game, {
      "@typeIn": appLdType.entityBuilding,
    })

    // buildings.forEach((building) => {
    //   building.workers &&
    //     building.workers.forEach((workerIri, e) => {
    //       if (entityFindOneById(game, workerIri) && building.workers) {
    //         removeWorkerFromEntity(building, workerIri)
    //       }
    //     })
    // })

    const workers = entityQuery<CharacterEntityInterface>(game, {
      "@typeIn": workerEntityMetaData["@type"],
    })

    buildings.forEach((building) => {
      const workerNeeded = getEntityWorkerNeeded(building)
      if (workerNeeded <= 0) return
      workers.forEach((worker) => {
        if (hasAction(worker)) return
        const metaData = getMetaData<EntityMetaDataInterface>(building)
        if (!metaData.workerAction) return
        console.log(building)
        addActionToEntity(
          worker,
          metaData.workerAction.factory({
            entity: worker,
            game,
            createdBy: building,
          }),
        )

        addWorkerToEntity(building, worker)
      })
    })
  },
})
