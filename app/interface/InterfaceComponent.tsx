import useGameContext from "@/app/game/provider/useGameContext"
import JsonPrettyComponent from "@/packages/ui/JsonPrettyComponent"
import { InventoryItemInterface } from "@/app/domain/inventory/InventoryItemInterface"
import { getMetaData } from "@/app/game/configGame"

interface InterfaceComponentPropsInterface {}

export const InterfaceComponent = ({}: InterfaceComponentPropsInterface) => {
  const gameContext = useGameContext()

  return (
    <>
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
    </>
  )
}

interface InventoryPropsInterface {
  inventoryItem: InventoryItemInterface
}

const Inventory = ({ inventoryItem }: InventoryPropsInterface) => {
  const inventoryMetaData = getMetaData(inventoryItem) ?? null
  const icon = inventoryMetaData?.asset?.icon
  const name = inventoryMetaData?.["@type"]
  return (
    <div className={"flex"}>
      {icon && <img className={"h-8"} src={icon} alt={"ressource"} />}
      {!icon && <span>{name}</span>}
      <span>{inventoryItem.quantity}</span>
    </div>
  )
}
