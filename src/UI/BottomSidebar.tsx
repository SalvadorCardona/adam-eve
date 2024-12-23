import { getByLdType } from "@/src/container/container"
import configGame from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { ActionControllerList, controller } from "@/src/UI/controller"
import { Card } from "@/components/ui/card"
import React from "react"

export const BottomSidebar = () => {
  const buildingMetaDatas = getByLdType<EntityMetaDataInterface>(
    configGame,
    "entity/building",
  )

  const groundMetaDatas = getByLdType<EntityMetaDataInterface>(
    configGame,
    "entity/ground",
  )
  return (
    <div className={"fixed bottom-0 left-0   rounded-2xl p-5"}>
      <div className={"flex gap-2"}>
        <IconBuild metaDatas={groundMetaDatas}></IconBuild>
      </div>
      <div className={"flex gap-2 mt-2"}>
        <IconBuild metaDatas={buildingMetaDatas}></IconBuild>
      </div>
    </div>
  )
}

function IconBuild({ metaDatas }: { metaDatas: EntityMetaDataInterface[] }) {
  const clickOnBuilding = (metaData: EntityMetaDataInterface) => {
    controller({ metaData, action: ActionControllerList.BuildRequest })
  }

  return (
    <>
      {metaDatas.map((metadata) => {
        return (
          <Card
            key={metadata["@type"] + "icon-build"}
            className={
              "w-20 h-20 rounded-2xl overflow-auto cursor-pointer transition-transform duration-300 hover:scale-105 "
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
