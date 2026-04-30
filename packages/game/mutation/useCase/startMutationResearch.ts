import GameInterface from "@/packages/game/game/GameInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { MutationResourceInterface } from "@/packages/game/mutation/MutationResourceInterface"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import { addActionToEntity } from "@/packages/game/action/AddActionToEntity"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { getResource } from "@/packages/resource/ResourceInterface"
import {
  ActionInterface,
  ActionResourceInterface,
} from "@/packages/game/action/ActionResourceInterface"
import { canStartMutationResearch } from "@/packages/game/mutation/useCase/canStartMutationResearch"

const RESEARCH_ACTION_TYPE = "action/research-mutation"

export function startMutationResearch(
  game: GameInterface,
  entity: EntityInterface,
  mutation: MutationResourceInterface,
): boolean {
  const blocker = canStartMutationResearch(game, entity, mutation)
  if (blocker) return false

  for (const item of Object.values(mutation.cost.member ?? {})) {
    if (!item["@type"]) continue
    addToInventory(game.inventory, item["@type"], -item.quantity)
  }

  const actionResource = getResource<ActionResourceInterface<ActionInterface<any>>>(
    RESEARCH_ACTION_TYPE,
  )
  if (!actionResource) return false

  const action = actionResource.create({
    item: {
      createdBy: entity["@id"],
      data: {
        mutationId: mutation["@id"],
        startedAt: game.time,
        buildTime: mutation.buildTime,
      },
    },
  })

  addActionToEntity(entity, action)
  updateEntityInGame(game, entity)
  return true
}
