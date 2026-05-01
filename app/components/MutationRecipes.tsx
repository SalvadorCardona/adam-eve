import React from "react"
import { FlaskConical, Lock, Check } from "lucide-react"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { getResource } from "@/packages/resource/ResourceInterface"
import { MutationResourceInterface } from "@/packages/game/mutation/MutationResourceInterface"
import { Button } from "@/app/components/ui/button"
import { Progress } from "@/app/components/ui/progress"
import {
  canStartMutationResearch,
  getActiveMutationResearchId,
  isMutationResearched,
} from "@/packages/game/mutation/useCase/canStartMutationResearch"
import { startMutationResearch } from "@/packages/game/mutation/useCase/startMutationResearch"
import { BaseGameResource } from "@/packages/game/BaseGameResource"
import { ResearchMutationData } from "@/app/action/researchMutationActionResource"
import { ActionInterface } from "@/packages/game/action/ActionResourceInterface"
import { getByLdTypeIn } from "@/packages/jsonLd/jsonLd"

interface MutationRecipesProps {
  entity: EntityInterface
  game: GameInterface
  onChange?: () => void
}

function getActiveResearchAction(
  entity: EntityInterface,
): ActionInterface<ResearchMutationData> | undefined {
  if (!entity.actions) return undefined
  const all = getByLdTypeIn<ActionInterface<ResearchMutationData>>(
    entity.actions,
    "action/research-mutation",
  )
  return all[0]
}

export const MutationRecipes: React.FC<MutationRecipesProps> = ({
  entity,
  game,
  onChange,
}) => {
  const meta = getResource<EntityResourceInterface>(entity)
  const recipeIds = meta?.mutationRecipes
  if (!recipeIds || recipeIds.length === 0) return null

  const activeAction = getActiveResearchAction(entity)
  const activeMutationId = activeAction?.data?.mutationId

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <FlaskConical className="h-5 w-5 text-fuchsia-600" />
        <div className="font-semibold">Recettes ({recipeIds.length})</div>
      </div>
      <ul className="flex flex-col gap-3 pl-9">
        {recipeIds.map((mutationId) => {
          const mutation = getResource<MutationResourceInterface>(mutationId)
          if (!mutation) return null

          const researched = isMutationResearched(game, mutationId)
          const isActive = activeMutationId === mutationId
          const blocker = !researched && !isActive
            ? canStartMutationResearch(game, entity, mutation)
            : null
          const someoneElseInProgress =
            !!activeMutationId && activeMutationId !== mutationId

          let progress = 0
          if (isActive && activeAction) {
            const elapsed = game.time - activeAction.data.startedAt
            progress = Math.min(
              100,
              Math.round((elapsed / activeAction.data.buildTime) * 100),
            )
          }

          return (
            <li
              key={mutationId}
              className="flex flex-col gap-1 rounded-md border border-amber-200 bg-amber-100 p-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{mutation.label}</span>
                {researched && (
                  <span className="flex items-center gap-1 text-emerald-700 text-xs font-semibold">
                    <Check className="h-4 w-4" /> Recherchée
                  </span>
                )}
                {isActive && !researched && (
                  <span className="text-xs font-semibold text-fuchsia-700">
                    En cours
                  </span>
                )}
              </div>
              {mutation.description && (
                <div className="text-xs text-amber-800">{mutation.description}</div>
              )}
              <div className="flex items-center flex-wrap gap-3 text-xs">
                <span className="text-amber-700">
                  Durée : {mutation.buildTime} ticks
                </span>
                <span className="text-amber-700">Coût :</span>
                {Object.values(mutation.cost.member ?? {}).map((item) => {
                  const itemResource = item["@type"]
                    ? getResource<BaseGameResource>(item["@type"])
                    : undefined
                  return (
                    <span
                      key={item["@id"]}
                      className="flex items-center gap-1 text-amber-900"
                    >
                      {itemResource?.asset?.icon && (
                        <img
                          src={itemResource.asset.icon}
                          alt=""
                          className="h-4 w-4"
                        />
                      )}
                      <span>{item.quantity}</span>
                    </span>
                  )
                })}
              </div>
              {isActive && (
                <Progress value={progress} className="h-2 bg-amber-200 mt-1" />
              )}
              {!researched && !isActive && (
                <Button
                  size="sm"
                  className="mt-1 bg-fuchsia-600 hover:bg-fuchsia-700 text-white disabled:bg-amber-300 disabled:text-amber-700"
                  disabled={!!blocker || someoneElseInProgress}
                  onClick={() => {
                    if (startMutationResearch(game, entity, mutation)) {
                      onChange?.()
                    }
                  }}
                >
                  {blocker === "missing-resources"
                    ? (<><Lock className="mr-1 h-4 w-4" /> Ressources insuffisantes</>)
                    : someoneElseInProgress
                      ? "Une recherche est déjà en cours"
                      : "Rechercher"}
                </Button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
