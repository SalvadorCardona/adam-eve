import useGameContext from "@/src/UI/provider/useGameContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import JsonPrettyComponent from "@/components/JsonPrettyComponent"
import React from "react"

export const RightSideBarPropsInterfaceSideBar = () => {
  const gameContext = useGameContext()

  return (
    <div className={"fixed top-0 right-0   h-screen"}>
      {gameContext.game.userControl.entitySelection && (
        <Card className={"scroll-auto overflow-auto"}>
          <Button
            onClick={() =>
              (gameContext.game.userControl.entitySelection = undefined)
            }
          >
            Close
          </Button>
          <JsonPrettyComponent
            data={gameContext.game.userControl.entitySelection}
          ></JsonPrettyComponent>
        </Card>
      )}
    </div>
  )
}