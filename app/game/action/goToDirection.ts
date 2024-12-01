import { ActionMetadataInterface } from "@/app/game/domain/ActionMetadataInterface"
import { areVectorsEqual, Vector3Interface } from "@/app/game/domain/Vector"
import EntityInterface from "@/app/game/domain/EntityInterface"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"
import { generatePathCoordinates } from "@/app/game/domain/3D/generatePathCoordinates"

interface GoDirectionDataInterface {
  coordinates?: Vector3Interface[]
  target: Vector3Interface
}

export const goToDirection: ActionMetadataInterface<GoDirectionDataInterface> = {
  ["@type"]: "action/goToDirection",
  onFrame: ({ entity, data }) => {
    if (!data.coordinates) return

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

    return jsonLdFactory(goToDirection["@type"], data)
  },
}
