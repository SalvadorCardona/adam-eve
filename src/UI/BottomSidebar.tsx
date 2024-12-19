import { getByLdType } from "@/src/container/container"
import configGame from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { ActionControllerList, controller } from "@/src/UI/controller"
import { Card } from "@/components/ui/card"
import React from "react"

export const BottomSidebar = () => {
  const buildingMetaDatas = getByLdType(
    configGame,
    "entity/building",
  ) as EntityMetaDataInterface[]

  const clickOnBuilding = (metaData: EntityMetaDataInterface) => {
    controller({ metaData, action: ActionControllerList.BuildRequest })
  }

  function content(metadata: EntityMetaDataInterface) {
    if (metadata.asset?.icon) {
      return (
        <img src={metadata.asset?.icon} alt="icon" className={"w-full h-full"} />
      )
    }
    return <>{metadata["@type"]}</>
  }

  return (
    <div className={"fixed bottom-0 left-0   w-screen p-5"}>
      <div className={"flex gap-2"}>
        {buildingMetaDatas.map((metadata) => {
          return (
            <Card
              className={"w-20  h-20 rounded-2xl overflow-auto cursor-pointer"}
              onClick={() => clickOnBuilding(metadata)}
              key={metadata["@type"] + "itemFactory"}
            >
              {content(metadata)}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
