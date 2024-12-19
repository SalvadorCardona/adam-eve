import React from "react"
import { BottomSidebar } from "@/src/UI/BottomSidebar"
import { RightSideBarPropsInterfaceSideBar } from "@/src/UI/RightSideBarPropsInterfaceSideBar"
import { TopSideBar } from "@/src/UI/TopSideBar"

export const InterfaceComponent = () => {
  return (
    <>
      <TopSideBar></TopSideBar>
      <RightSideBarPropsInterfaceSideBar></RightSideBarPropsInterfaceSideBar>
      <BottomSidebar></BottomSidebar>
    </>
  )
}
