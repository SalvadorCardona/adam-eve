import { BuildingEntityInterface, CharacterEntityInterface } from "@/packages/game/entity/EntityInterface"
import { entityFindOneById, entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { addWorkerToEntity, removeWorkerFromEntity } from "@/packages/game/entity/useCase/entityWorker"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const findWorkerCharacterActionMetadata = createActionResource({
  ["@id"]: "findWorkerCharacter",
  onFrame: ({ action, game }) => {
    updateNextTick(game, action, 60)
    const buildings = entityQuery<BuildingEntityInterface>(game, {
      entityType: EntityType.building,
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
      "@type": workerEntityResource["@id"],
    })

    buildings.forEach((building) => {
      if (building.isPaused) return
      workers.forEach((worker) => {
        addWorkerToEntity(game, building, worker)
      })
    })
  },
})
