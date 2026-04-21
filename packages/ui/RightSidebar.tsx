import React from "react"
import { EntityModal } from "@/packages/ui/entity-modal"

export const RightSidebar = () => {
  return (
    <div className={"fixed top-1/3 right-0   h-screen max-h-screen "}>
      <EntityModal></EntityModal>
    </div>
  )
}
