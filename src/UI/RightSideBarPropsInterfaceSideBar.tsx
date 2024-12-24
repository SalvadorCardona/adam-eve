import useGameContext from "@/src/UI/provider/useGameContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import JsonPrettyComponent from "@/components/JsonPrettyComponent"
import React, { useMemo } from "react"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/OnSelectEntityUserActionMetadata"

export const RightSideBarPropsInterfaceSideBar = () => {
  const { game } = useGameContext()

  const hasAction = useMemo(() => {
    return (
      hasActionUser(game, onSelectEntityUserActionMetadata) &&
      onSelectEntityUserActionMetadata.data.entitySelection
    )
  }, [game.userControl.currentAction])
  return (
    <div className={"fixed top-0 right-0   h-screen"}>
      {hasAction && (
        <Card className={"scroll-auto overflow-auto"}>
          <Button onClick={() => (game.userControl.currentAction = undefined)}>
            Close
          </Button>
          <JsonPrettyComponent
            data={onSelectEntityUserActionMetadata.data.entitySelection as object}
          ></JsonPrettyComponent>
        </Card>
      )}
    </div>
  )
}
