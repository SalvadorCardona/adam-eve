import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { getByTypeInContainer } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { entityGoToEntity } from "@/src/game/entity/useCase/EntityGoToEntity"

enum State {
  GoToForum,
  TakeRessource,
  GoToBuild,
  PutRessource,
  NoBuild,
}

interface FindWorkerData {
  state: State
  building?: EntityInterface
  buildingPathCoordinate?: EntityInterface
  forum?: EntityInterface
  forumPathCoordinate?: EntityInterface
}

export const goBuildOfBuildingActionMetadata: ActionMetadataInterface<FindWorkerData> =
  {
    ["@type"]: "action/goBuildOfBuilding",
    onFrame: ({ action, game, entity }) => {
      if (!entity) return
      const data = action.data

      const getBuilding = (): EntityInterface | undefined => {
        const currentBuilding = data.building
        if (currentBuilding?.ressourceNeeded) return currentBuilding
        data.building = getByTypeInContainer<EntityInterface>(
          game.entities,
          "entity/building",
        ).find((building) => {
          return building.ressourceNeeded
        })

        return data.building
      }

      const getForum = (): EntityInterface | undefined => {
        const currentForum = data.forum
        if (currentForum) return currentForum

        const forum = getByTypeInContainer<EntityInterface>(
          game.entities,
          "entity/building/forum",
        )

        if (forum.length) {
          return forum[0]
        }

        return undefined
      }

      const building = getBuilding()

      if (!building) {
        data.state = State.NoBuild
        return
      }

      entity.state = "Running"

      if (data.state === State.GoToForum) {
        const forum = getForum()
        if (!forum) {
          data.state = State.NoBuild
          return
        }
        const result = entityGoToEntity(entity, forum)
        if (result.isFinish) {
          data.state = State.GoToBuild
        }
      }

      if (data.state === State.GoToBuild) {
        const result = entityGoToEntity(entity, building)
        if (result.isFinish) {
          data.state = State.GoToForum
        }
      }
    },
    factory: (payload) => {
      const data: FindWorkerData = {
        state: State.GoToForum,
      }

      return jsonLdFactory(goBuildOfBuildingActionMetadata["@type"], { data })
    },
  }
