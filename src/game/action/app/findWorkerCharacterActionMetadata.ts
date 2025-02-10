import {
  BuildingEntityInterface,
  CharacterEntityInterface,
} from "@/src/game/entity/EntityInterface"
import { appLdType } from "@/src/AppLdType"
import {
  entityFindOneById,
  entityQuery,
} from "@/src/game/game/useCase/query/entityQuery"
import { actionMetaDataFactory } from "@/src/game/action/actionMetaDataFactory"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/workerEntity"
import { updateNextTick } from "@/src/game/action/updateNextTick"
import {
  addWorkerToEntity,
  removeWorkerFromEntity,
} from "@/src/game/entity/useCase/entityWorker"

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
          if (!entityFindOneById(game, workerIri) && building.workers) {
            removeWorkerFromEntity(building, workerIri)
          }
        })
    })

    const workers = entityQuery<CharacterEntityInterface>(game, {
      "@typeIn": workerEntityMetaData["@type"],
    })

    buildings.forEach((building) => {
      workers.forEach((worker) => {
        addWorkerToEntity(game, building, worker)
      })
    })
  },
})
