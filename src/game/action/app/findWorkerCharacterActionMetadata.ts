import { jsonLdFactory, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { getByLdType, updateContainer } from "@/src/container/container"
import EntityInterface, { entityState } from "@/src/game/entity/EntityInterface"
import isObjectEmpty from "@/src/utils/object/objectIsEmpty"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { addAction } from "@/src/game/action/addAction"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { appLdType } from "@/src/AppLdType"
import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/WorkerEntity"

enum State {
  GoToTree = "GoToTree",
}

interface FindWorkerData {
  state: State
}

export const findWorkerCharacterActionMetadata: ActionMetadataInterface<FindWorkerData> =
  {
    ["@type"]: JsonLdTypeFactory(appLdType.action, "findWorkerCharacter"),
    onFrame: ({ action, game }) => {
      const buildings = getByLdType<EntityInterface>(
        game.entities,
        appLdType.entityBuilding,
      ).filter((building) => {
        return (
          building.numberOfWorker &&
          building.numberOfWorker > 0 &&
          building.state !== entityState.under_construction &&
          Object.values(building.worker).length < building.numberOfWorker
        )
      })

      if (buildings.length === 0) return

      const workers = getByLdType<EntityInterface>(
        game.entities,
        workerEntityMetaData["@type"],
      ).filter((worker) => {
        return isObjectEmpty(worker.actions)
      })

      for (const building of buildings) {
        const metaData = getMetaData<EntityMetaDataInterface>(building)
        for (const worker of workers) {
          const buildingNumberOfWorker = Object.values(building.worker).length
          if (
            building.numberOfWorker &&
            buildingNumberOfWorker < building.numberOfWorker
          ) {
            if (
              metaData.workerAction &&
              isObjectEmpty(worker.actions) &&
              Object.values(building.worker).length < building.numberOfWorker
            ) {
              updateContainer(building.worker, worker)
              addAction(
                worker.actions,
                metaData.workerAction.factory({ entity: worker, game }),
              )
            }
          }
        }
      }
    },
    factory: (payload) => {
      const data: FindWorkerData = {
        state: State.GoToTree,
      }

      return jsonLdFactory(findWorkerCharacterActionMetadata["@type"], { data })
    },
  }
