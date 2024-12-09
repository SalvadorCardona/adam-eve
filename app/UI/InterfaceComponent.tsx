import useGameContext from "@/app/game/provider/useGameContext"
import JsonPrettyComponent from "@/packages/ui/JsonPrettyComponent"
import { Inventory } from "@/app/UI/Inventory"
import { getByLdType } from "@/packages/container/container"
import configGame from "@/app/game/configGame"
import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { Button, Theme } from "@radix-ui/themes"
import { ActionControllerList, controller } from "@/app/domain/controller/controller"

interface InterfaceComponentPropsInterface {}

export const InterfaceComponent = ({}: InterfaceComponentPropsInterface) => {
  const gameContext = useGameContext()

  return (
    <Theme>
      <div className={"fixed flex top-0 left-0 bg-white w-full h-16 p-2"}>
        {Object.values(gameContext.game.inventory).map((inventoryItem) => {
          return (
            <Inventory
              inventoryItem={inventoryItem}
              key={inventoryItem["@id"] + "top"}
            />
          )
        })}
        <div>time : {gameContext.game?.time}</div>
      </div>
      <div className={"fixed top-0 right-0 bg-white  h-screen"}>
        {gameContext.game.entitySelection && (
          <div className={"scroll-auto overflow-auto"}>
            <JsonPrettyComponent
              data={gameContext.game.entitySelection}
            ></JsonPrettyComponent>
          </div>
        )}
      </div>
      <BottomSidebar></BottomSidebar>
    </Theme>
  )
}

interface BottomSidebarPropsInterface {}

const BottomSidebar = ({}: BottomSidebarPropsInterface) => {
  const buildingMetaDatas = getByLdType(
    configGame,
    "entity",
  ) as EntityMetaDataInterface[]

  const clickOnBuilding = (metaData: EntityMetaDataInterface) => {
    controller({ metaData, action: ActionControllerList.BuildRequest })
  }

  return (
    <div className={"fixed bottom-0 left-0 bg-white  w-screen p-5"}>
      <div className={"flex gap-2"}>
        {buildingMetaDatas.map((metadata) => {
          return (
            <Button
              onClick={() => clickOnBuilding(metadata)}
              key={metadata["@type"] + "itemfactory"}
            >
              {metadata["@type"]}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
