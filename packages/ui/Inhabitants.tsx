import React from "react"
import { Card } from "@/app/components/ui/card"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"
import playerIcon from "@/app/entity/character/player/player_healthy.svg?url"

function countInhabitants(game: Parameters<typeof entityQuery>[0]): number {
  return entityQuery(game, {
    entityType: EntityType.character,
    faction: EntityFaction.self,
  }).length
}

export const Inhabitants = () => {
  const gameContext = useGameContext()

  return (
    <Card className={"flex-col justify-items-center overflow-hidden"}>
      <img className={"h-10 w-10"} src={playerIcon} alt={"habitants"} />
      <div className={"font-extrabold py-0.5"}>
        {countInhabitants(gameContext.game)}
      </div>
    </Card>
  )
}
