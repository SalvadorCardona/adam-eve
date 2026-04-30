import {
  ActionInterface,
  ActionResourceInterface,
} from "@/packages/game/action/ActionResourceInterface"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { removeActionFromEntity } from "@/packages/game/action/removeAction"
import { getResource } from "@/packages/resource/ResourceInterface"
import { MutationResourceInterface } from "@/packages/game/mutation/MutationResourceInterface"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { updateItem } from "@/packages/jsonLd/jsonLd"

export interface ResearchMutationData {
  mutationId: string
  startedAt: number
  buildTime: number
}

export const researchMutationActionResource: ActionResourceInterface<
  ActionInterface<ResearchMutationData>
> = createActionResource<
  ActionResourceInterface<ActionInterface<ResearchMutationData>>
>({
  "@id": "action/research-mutation",
  label: "Recherche en cours",
  onFrame: ({ action, entity, game }) => {
    if (!entity) return
    const elapsed = game.time - action.data.startedAt
    if (elapsed < action.data.buildTime) return

    const mutation = getResource<MutationResourceInterface>(action.data.mutationId)
    if (mutation) {
      mutation.apply(game)
      if (!game.researchedMutations.includes(action.data.mutationId)) {
        game.researchedMutations.push(action.data.mutationId)
      }
      updateItem(game)
    }

    removeActionFromEntity(entity, action)
    updateEntityInGame(game, entity)
  },
})
