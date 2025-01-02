import React from "react"
import { BottomSidebar } from "@/src/UI/BottomSidebar"
import { RightSideBarPropsInterfaceSideBar } from "@/src/UI/RightSideBarPropsInterfaceSideBar"
import { TopSideBar } from "@/src/UI/TopSideBar"
import TimeControls from "@/src/UI/TimeControl"

export const InterfaceComponent = () => {
  return (
    <>
      <TimeControls></TimeControls>
      <TopSideBar></TopSideBar>
      <RightSideBarPropsInterfaceSideBar></RightSideBarPropsInterfaceSideBar>
      <BottomSidebar></BottomSidebar>
    </>
  )
}
