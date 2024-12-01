import useGameContext from "@/app/game/provider/useGameContext"
import JsonPrettyComponent from "@/packages/ui/JsonPrettyComponent"

interface InterfaceComponentPropsInterface {}

export const InterfaceComponent = ({}: InterfaceComponentPropsInterface) => {
  const gameContext = useGameContext()

  return (
    <div className={"fixed top-0 right-0 bg-white"}>
      <div>{gameContext.game?.time}</div>
      {gameContext.game.entitySelection && (
        <>
          <JsonPrettyComponent
            data={gameContext.game.entitySelection}
          ></JsonPrettyComponent>
        </>
      )}
    </div>
  )
}
