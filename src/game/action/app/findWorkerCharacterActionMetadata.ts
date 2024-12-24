import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { getByTypeInContainer, updateContainer } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import isObjectEmpty from "@/src/utils/object/objectIsEmpty"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { addAction } from "@/src/game/action/addAction"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"

enum State {
  GoToTree = "GoToTree",
}

interface FindWorkerData {
  state: State
}

export const findWorkerCharacterActionMetadata: ActionMetadataInterface<FindWorkerData> =
  {
    ["@type"]: "action/findWorkerCharacter",
    onFrame: ({ action, game }) => {
      const data = action.data
      const buildings = getByTypeInContainer<EntityInterface>(
        game.entities,
        "entity/building",
      ).filter((building) => {
        return building.numberOfWorker && building.numberOfWorker > 0
      })

      if (buildings.length === 0) return

      const workers = getByTypeInContainer<EntityInterface>(
        game.entities,
        "entity/character/worker",
      ).filter((character) => {
        return isObjectEmpty(character.actions)
      })

      buildings.forEach((building) => {})
      for (const building of buildings) {
        const metaData = getMetaData<EntityMetaDataInterface>(building)
        for (const worker of workers) {
          const buildingNumberOfWorker = Object.values(building.worker).length
          if (
            building.numberOfWorker &&
            buildingNumberOfWorker < building.numberOfWorker
          ) {
            updateContainer(building.worker, worker)
            if (metaData.workerAction) {
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
