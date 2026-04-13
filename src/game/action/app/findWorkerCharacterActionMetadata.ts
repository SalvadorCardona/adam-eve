import {
  BuildingEntityInterface,
  CharacterEntityInterface,
} from "@/src/game/entity/EntityInterface"
import { appLdType } from "@/app/AppLdType"
import {
  entityFindOneById,
  entityQuery,
} from "@/src/game/game/useCase/query/entityQuery"
import { actionResourceFactory } from "@/src/game/action/actionResourceFactory"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { workerEntityResource } from "@/src/game/entity/app/character/worker/workerEntityResource"
import { updateNextTick } from "@/src/game/action/updateNextTick"
import {
  addWorkerToEntity,
  removeWorkerFromEntity,
} from "@/src/game/entity/useCase/entityWorker"

export const findWorkerCharacterActionMetadata = actionResourceFactory({
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
      "@typeIn": workerEntityResource["@type"],
    })

    buildings.forEach((building) => {
      workers.forEach((worker) => {
        addWorkerToEntity(game, building, worker)
      })
    })
  },
})
