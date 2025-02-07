import {
  BuildingEntityInterface,
  CharacterEntityInterface,
} from "@/src/game/entity/EntityInterface"
import isObjectEmpty from "@/src/utils/object/objectIsEmpty"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { appLdType } from "@/src/AppLdType"
import {
  entityFindOneById,
  entityQuery,
} from "@/src/game/game/useCase/query/entityQuery"
import { EntityState } from "@/src/game/entity/EntityState"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { removeByIndex } from "@/src/utils/array/array"
import { addActionToEntity } from "@/src/game/action/addAction"
import { actionMetaDataFactory } from "@/src/game/action/actionMetaDataFactory"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { updateNextTick } from "@/src/game/action/ActionInterface"

export const findWorkerCharacterActionMetadata = actionMetaDataFactory({
  ["@type"]: createJsonLdType(appLdType.typeAction, "findWorkerCharacter"),
  onFrame: ({ action, game }) => {
    updateNextTick(game, action, 60)
    const buildings = entityQuery<BuildingEntityInterface>(game, {
      "@typeIn": appLdType.entityBuilding,
    })

    buildings.forEach((building) => {
      building.workers &&
        building.workers.forEach((workerIri, e) => {
          if (entityFindOneById(game, workerIri) && building.workers) {
            building.workers = removeByIndex(building.workers, e)
          }
        })
    })

    buildings.filter((building) => {
      const metaData = getMetaData<EntityMetaDataInterface>(building)
      const workMeta = metaData.propriety.work

      if (!workMeta) return false

      return (
        workMeta.numberOfWorker &&
        workMeta.numberOfWorker > 0 &&
        building.state !== EntityState.under_construction &&
        building.workers.length < workMeta.numberOfWorker
      )
    })

    if (buildings.length === 0) return

    const workers = entityQuery<CharacterEntityInterface>(game, {
      "@typeIn": appLdType.entityCharacter,
    }).filter((worker) => {
      return isObjectEmpty(worker.actions)
    })

    for (const building of buildings) {
      const metaData = getMetaData<EntityMetaDataInterface>(building)
      const workMeta = metaData.propriety.work
      if (!workMeta) return

      for (const worker of workers) {
        const buildingNumberOfWorker = building.workers.length
        if (
          workMeta.numberOfWorker &&
          buildingNumberOfWorker < workMeta.numberOfWorker
        ) {
          if (
            metaData.workerAction &&
            isObjectEmpty(worker.actions) &&
            building.workers.length < workMeta.numberOfWorker &&
            !building.workers.includes(worker["@id"])
          ) {
            building.workers.push(worker["@id"])

            addActionToEntity(
              worker,
              metaData.workerAction.factory({ entity: worker, game }),
            )
          }
        }
      }
    }
  },
})
