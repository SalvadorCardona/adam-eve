import EntityInterface from "@/packages/game/entity/EntityInterface"
import {
  ActionInterface,
  ActionResourceInterface,
} from "@/packages/game/action/ActionResourceInterface"
import { entityFindOneById } from "@/packages/game/game/useCase/query/entityQuery"
import { EntityState } from "@/packages/game/entity/EntityState"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { removeActionFromEntity } from "@/packages/game/action/removeAction"
import { entityGoToEntityWithGround } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"

interface StayInBuildingData {
  insideBuilding?: boolean
}

export const stayInBuildingActionResource: ActionResourceInterface<
  ActionInterface<StayInBuildingData>
> = createActionResource<
  ActionResourceInterface<ActionInterface<StayInBuildingData>>
>({
  "@id": "action/stay-in-building",
  onFrame: ({ action, game, entity }) => {
    if (!entity) return

    const buildingIri = action.createdBy
    const building = buildingIri
      ? entityFindOneById<EntityInterface>(game, buildingIri)
      : undefined

    if (!building) {
      entity.hidden = false
      entity.state = EntityState.wait
      removeActionFromEntity(entity, action)
      updateEntityInGame(game, entity)
      return
    }

    if (!action.data.insideBuilding) {
      const result = entityGoToEntityWithGround({ game, entity, target: building })
      if (result.isFinish) {
        action.data.insideBuilding = true
        entity.position = { ...building.position }
        entity.hidden = true
        entity.state = EntityState.wait
        updateEntityInGame(game, entity)
      } else {
        entity.state = EntityState.move
      }
      return
    }

    if (
      entity.position.x !== building.position.x ||
      entity.position.z !== building.position.z
    ) {
      entity.position = { ...building.position }
    }
    if (!entity.hidden) {
      entity.hidden = true
      updateEntityInGame(game, entity)
    }
  },
})
