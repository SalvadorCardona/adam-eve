import useGameContext from "@/src/UI/provider/useGameContext"
import React, { useMemo } from "react"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/OnSelectEntityUserActionMetadata"
import { EntityModal } from "@/src/UI/entity-modal"
import EntityInterface from "@/src/game/entity/EntityInterface"

export const RightSideBarPropsInterfaceSideBar = () => {
  const { game } = useGameContext()

  const hasAction = useMemo(() => {
    return (
      hasActionUser(game, onSelectEntityUserActionMetadata) &&
      onSelectEntityUserActionMetadata.data.entitySelection
    )
  }, [game.userControl.currentAction])

  return (
    <div className={"fixed top-1/3 right-0   h-screen w-[450px] max-h-screen "}>
      {hasAction && (
        <EntityModal
          entity={
            onSelectEntityUserActionMetadata.data.entitySelection as EntityInterface
          }
        ></EntityModal>
      )}
    </div>
  )
}
