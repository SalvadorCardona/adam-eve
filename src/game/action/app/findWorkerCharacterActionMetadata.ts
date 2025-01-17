import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { getByLdType } from "@/src/container/container"
import {
  BuildingEntityInterface,
  CharacterEntityInterface,
} from "@/src/game/entity/EntityInterface"
import isObjectEmpty from "@/src/utils/object/objectIsEmpty"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { addAction } from "@/src/game/action/addAction"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { appLdType } from "@/src/AppLdType"
import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/workerEntity"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import { EntityState } from "@/src/game/entity/EntityState"
import { getMetaData } from "@/src/game/game/app/getMetaData"

export const findWorkerCharacterActionMetadata: ActionMetadataInterface<any> = {
  ["@type"]: appLdType.findWorkerAction,
  onFrame: ({ action, game }) => {
    action.nextTick = game.time + 60

    const buildings = entityQuery<BuildingEntityInterface>(game, {
      "@type": appLdType.entityBuilding,
    }).filter((building) => {
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

    const workers = getByLdType<CharacterEntityInterface>(
      game.entities,
      workerEntityMetaData["@type"],
    ).filter((worker) => {
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

            addAction(
              worker.actions,
              metaData.workerAction.factory({ entity: worker, game }),
            )
          }
        }
      }
    }
  },
  factory: () => {
    return jsonLdFactory(findWorkerCharacterActionMetadata["@type"], {})
  },
}
