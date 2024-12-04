import { ActionMetadataInterface } from "@/app/domain/action/ActionMetadataInterface"
import { areVectorsEqual, Vector3Interface } from "@/app/domain/3D/Vector"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"
import { generatePathCoordinates } from "@/app/domain/3D/generatePathCoordinates"
import { deleteContainerKey } from "@/packages/container/container"

export interface GoDirectionDataInterface {
  coordinates?: Vector3Interface[]
  target: Vector3Interface
}

export const goToDirectionMetaData: ActionMetadataInterface<GoDirectionDataInterface> =
  {
    ["@type"]: "action/goToDirection",
    onFrame: ({ entity, action }) => {
      const data = action.data
      if (!data.coordinates) return

      if (data.coordinates.length < 2) {
        deleteContainerKey(entity.actions, action["@id"])
      }
      if (areVectorsEqual(entity.position, data.coordinates[0])) {
        entity.position = data.coordinates[1]
        data.coordinates.splice(1, 1)
      } else {
        entity.position = data.coordinates[0]
        data.coordinates.splice(0, 1)
      }
    },
    factory: (payload: { entity: EntityInterface; target: Vector3Interface }) => {
      const data: GoDirectionDataInterface = {
        target: payload.target,
        coordinates: generatePathCoordinates(
          payload.entity.position,
          payload.target,
          50,
        ),
      }

      return jsonLdFactory(goToDirectionMetaData["@type"], { data })
    },
  }
