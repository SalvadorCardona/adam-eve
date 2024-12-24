import { getByLdType } from "@/src/container/container"
import configGame from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Card } from "@/components/ui/card"
import React from "react"
import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import useGameContext from "@/src/UI/provider/useGameContext"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateBuildingUserAction/CreateBuildingUserActionMetadata"
import { isActionUserMetadata } from "@/src/game/actionUser/IsActionUserMetadata"

export const BottomSidebar = () => {
  const buildingMetaDatas = getByLdType<EntityMetaDataInterface>(
    configGame,
    "entity/building",
  )

  const groundMetaDatas = getByLdType<EntityMetaDataInterface>(
    configGame,
    "entity/ground",
  )

  const natureMetaDatas = getByLdType<EntityMetaDataInterface>(
    configGame,
    "entity/nature",
  )

  const actionMetaDatas = getByLdType<ActionUserMetaDataInterface>(
    configGame,
    "user-action",
  )

  const characterMetaDatas = getByLdType<ActionUserMetaDataInterface>(
    configGame,
    "entity/character",
  )

  return (
    <div className={"fixed bottom-0 left-0   rounded-2xl p-5"}>
      <div className={"flex gap-2"}>
        <IconBuild metaDatas={actionMetaDatas}></IconBuild>
      </div>
      <div className={"flex gap-2"}>
        <IconBuild metaDatas={characterMetaDatas}></IconBuild>
      </div>
      <div className={"flex gap-2"}>
        <IconBuild metaDatas={natureMetaDatas}></IconBuild>
      </div>
      <div className={"flex gap-2"}>
        <IconBuild metaDatas={groundMetaDatas}></IconBuild>
      </div>
      <div className={"flex gap-2 mt-2"}>
        <IconBuild metaDatas={buildingMetaDatas}></IconBuild>
      </div>
    </div>
  )
}

function IconBuild({ metaDatas }: { metaDatas: GameMetaDataInterface[] }) {
  const game = useGameContext().game
  const clickOnBuilding = (metaData: GameMetaDataInterface) => {
    if (isActionUserMetadata(metaData) && metaData.onCall) {
      metaData.onCall({ game, metaData })

      return
    }

    if (createBuildingUserActionMetadata.onCall) {
      createBuildingUserActionMetadata.onCall({ game, metaData })
    }
  }

  return (
    <>
      {metaDatas.map((metadata) => {
        return (
          <Card
            key={metadata["@type"] + "icon-build"}
            className={
              "w-20 h-20 rounded-2xl overflow-auto transition-transform duration-300 hover:scale-105 "
            }
            onClick={() => clickOnBuilding(metadata)}
          >
            {metadata.asset?.icon ? (
              <img
                src={metadata.asset?.icon}
                alt="icon"
                className={"w-full h-full"}
              />
            ) : (
              <>{metadata["@type"]}</>
            )}
          </Card>
        )
      })}
    </>
  )
}
