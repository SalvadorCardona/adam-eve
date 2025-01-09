import useGameContext from "@/src/UI/provider/useGameContext"
import React, { useMemo } from "react"
import { EntityModal } from "@/src/UI/entity-modal"
import { JsonLdIri } from "@/src/utils/jsonLd/jsonLd"

export const RightSideBarPropsInterfaceSideBar = () => {
  const { game } = useGameContext()

  const hasAction = useMemo(() => {
    return game.userControl.entitiesSelected.length > 0
  }, [game.userControl.entitiesSelected])

  return (
    <div className={"fixed top-1/3 right-0   h-screen w-[450px] max-h-screen "}>
      {hasAction && (
        <EntityModal
          entityUri={game.userControl.entitiesSelected[0] as JsonLdIri}
        ></EntityModal>
      )}
    </div>
  )
}
