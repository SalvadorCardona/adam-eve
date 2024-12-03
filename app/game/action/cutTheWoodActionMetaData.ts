import { ActionMetadataInterface } from "@/app/game/domain/action/ActionMetadataInterface"
import { Vector3Interface } from "@/app/game/domain/Vector"
import EntityInterface from "@/app/game/domain/entity/EntityInterface"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"

interface cutTheWoodDataInterface {
  lastTimeWoodcutted: number
}

export const cutTheWoodActionMetaData: ActionMetadataInterface<cutTheWoodDataInterface> =
  {
    ["@type"]: "action/cutTheWood",
    onFrame: ({ entity, action, game }) => {
      // Si bois = 5 retourne à la maison
      // Si bois = 0 allez à l'arbre le plus proche
      // Si bois = 0 et
    },
    factory: (payload: { entity: EntityInterface; target: Vector3Interface }) => {
      const data: cutTheWoodDataInterface = {}

      return jsonLdFactory(cutTheWoodActionMetaData["@type"], { data })
    },
  }
