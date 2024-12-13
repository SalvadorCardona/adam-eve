import useGameContext from "@/src/game/provider/useGameContext"
import JsonPrettyComponent from "@/packages/ui/JsonPrettyComponent"
import { Inventory } from "@/src/UI/Inventory"
import { getByLdType } from "@/packages/container/container"
import configGame from "@/src/game/configGame"
import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import { ActionControllerList, controller } from "@/src/domain/controller/controller"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface InterfaceComponentPropsInterface {}

export const InterfaceComponent = ({}: InterfaceComponentPropsInterface) => {
  const gameContext = useGameContext()

  return (
    <Card>
      <div className={"fixed flex top-0 left-0  w-full h-16 p-2"}>
        {Object.values(gameContext.game.inventory).map((inventoryItem) => {
          return (
            <Inventory
              inventoryItem={inventoryItem}
              key={inventoryItem["@id"] + "top"}
            />
          )
        })}
        <div>
          <span className={""}>time : {gameContext.game?.time}</span>
        </div>
      </div>
      <div className={"fixed top-0 right-0   h-screen"}>
        {gameContext.game.entitySelection && (
          <Card className={"scroll-auto overflow-auto"}>
            <Button onClick={() => (gameContext.game.entitySelection = undefined)}>
              Close
            </Button>
            <JsonPrettyComponent
              data={gameContext.game.entitySelection}
            ></JsonPrettyComponent>
          </Card>
        )}
      </div>
      <BottomSidebar></BottomSidebar>
    </Card>
  )
}

interface BottomSidebarPropsInterface {}

const BottomSidebar = ({}: BottomSidebarPropsInterface) => {
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
              className={"w-20  h-20 rounded-2xl overflow-auto"}
              onClick={() => clickOnBuilding(metadata)}
              key={metadata["@type"] + "itemfactory"}
            >
              {content(metadata)}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
