import GameInterface from "@/packages/game/game/GameInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { MutationResourceInterface } from "@/packages/game/mutation/MutationResourceInterface"
import { enoughResource } from "@/packages/game/inventory/useCase/enoughResource"
import { getByLdTypeIn } from "@/packages/jsonLd/jsonLd"

export type MutationResearchBlocker =
  | "already-researched"
  | "research-in-progress"
  | "missing-resources"

export function isMutationResearched(
  game: GameInterface,
  mutationId: string,
): boolean {
  return game.researchedMutations?.includes(mutationId) ?? false
}

export function getActiveMutationResearchId(
  entity: EntityInterface,
): string | undefined {
  if (!entity.actions) return undefined
  const inProgress = getByLdTypeIn<{ data: { mutationId: string } }>(
    entity.actions,
    "action/research-mutation",
  )
  return inProgress[0]?.data?.mutationId
}

export function canStartMutationResearch(
  game: GameInterface,
  entity: EntityInterface,
  mutation: MutationResourceInterface,
): MutationResearchBlocker | null {
  if (isMutationResearched(game, mutation["@id"])) return "already-researched"
  if (getActiveMutationResearchId(entity)) return "research-in-progress"
  if (!enoughResource(mutation.cost, game.inventory)) return "missing-resources"
  return null
}
