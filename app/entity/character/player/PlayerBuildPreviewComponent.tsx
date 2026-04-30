import React, { useEffect, useState } from "react"
import useGameContext from "@/packages/ui/provider/useGameContext"
import {
  useGameFrame,
  useGamePubSub,
} from "@/packages/ui/hook/useGameFrame"
import { EntityDecoratorPixiJs } from "@/packages/ui/graphic-motor/pixiJs/EntityDecoratorPixiJs"
import { playerBuildUserActionMetadata } from "@/app/actionUser/PlayerBuildUserAction/playerBuildUserActionMetadata"
import { hasActionUser } from "@/packages/game/actionUser/hasActionUser"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { updateGame } from "@/packages/game/game/updateGame"
import { roundVectorToDown } from "@/packages/math/round"
import { createVector3, Vector3Interface } from "@/packages/math/vector"
import {
  EntityResourceInterface,
} from "@/packages/game/entity/EntityResourceInterface"

type Facing = "north" | "south" | "east" | "west"
let buildFacing: Facing = "south"

function findPlayer(game: ReturnType<typeof useGameContext>["game"]): EntityInterface | undefined {
  return entityQueryFindOne<EntityInterface>(game, {
    "@type": "resource/player",
  })
}

function getBuildPosition(
  player: EntityInterface,
  resource: EntityResourceInterface,
): Vector3Interface {
  const playerSize = player.size?.x ?? 0.7
  const buildingSize = resource.propriety?.size?.x ?? 1
  const offset = playerSize / 2 + buildingSize / 2 + 0.5
  const px = player.position.x + playerSize / 2
  const pz = player.position.z + playerSize / 2
  let cx = px
  let cz = pz
  switch (buildFacing) {
    case "north":
      cz = pz - offset
      break
    case "south":
      cz = pz + offset
      break
    case "east":
      cx = px + offset
      break
    case "west":
      cx = px - offset
      break
  }
  return createVector3(
    cx - buildingSize / 2,
    player.position.y,
    cz - buildingSize / 2,
  )
}

export const PlayerBuildPreviewComponent = () => {
  const game = useGameContext().game
  const [, setTick] = useState(0)
  const bump = () => setTick((t) => (t + 1) % 1_000_000)

  useGameFrame(bump)
  useGamePubSub(game.userControl["@id"], bump)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowUp") buildFacing = "north"
      else if (e.code === "ArrowDown") buildFacing = "south"
      else if (e.code === "ArrowLeft") buildFacing = "west"
      else if (e.code === "ArrowRight") buildFacing = "east"
      else if (e.code === "Enter") {
        if (!hasActionUser(game, playerBuildUserActionMetadata)) return
        const resource = playerBuildUserActionMetadata.data.entityMetaData
        const player = findPlayer(game)
        if (!resource || !player) return
        const position = roundVectorToDown(getBuildPosition(player, resource))
        const ghost = resource.create({ game, item: { position } })
        if (resource.canBeBuild({ entity: ghost, game })) {
          addEntityToGame(game, ghost)
          playerBuildUserActionMetadata.data.entityMetaData = undefined
          game.userControl.currentAction = undefined
          updateGame(game, game.userControl)
        }
      } else if (e.code === "Escape") {
        if (!hasActionUser(game, playerBuildUserActionMetadata)) return
        playerBuildUserActionMetadata.data.entityMetaData = undefined
        game.userControl.currentAction = undefined
        updateGame(game, game.userControl)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [game])

  if (!hasActionUser(game, playerBuildUserActionMetadata)) return null

  const resource = playerBuildUserActionMetadata.data.entityMetaData
  const player = findPlayer(game)
  if (!resource || !player) return null

  const ghost = resource.create({
    game,
    item: { position: roundVectorToDown(getBuildPosition(player, resource)) },
  })
  ghost.position.y = 5

  const canBeBuild = resource.canBeBuild({ entity: ghost, game })

  return (
    <EntityDecoratorPixiJs
      key={"player-build-ghost"}
      color={canBeBuild ? "yellow" : "red"}
      entity={ghost}
    />
  )
}
