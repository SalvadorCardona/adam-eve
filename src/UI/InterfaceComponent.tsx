import React from "react"
import { BottomSidebar } from "@/src/UI/BottomSidebar"
import { RightSideBarPropsInterfaceSideBar } from "@/src/UI/RightSideBarPropsInterfaceSideBar"
import { TopSideBar } from "@/src/UI/TopSideBar"
import TimeControls from "@/src/UI/TimeControl"
import CosyGameSidebar from "@/components/cosy-game-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export const InterfaceComponent = () => {
  return (
    <>
      <TimeControls></TimeControls>
      <TopSideBar></TopSideBar>
      {/*<LeftSidebar></LeftSidebar>*/}
      <RightSideBarPropsInterfaceSideBar></RightSideBarPropsInterfaceSideBar>
      <BottomSidebar></BottomSidebar>
    </>
  )
}

interface LeftSidebarPropsInterface {}

const LeftSidebar = ({}: LeftSidebarPropsInterface) => {
  return (
    <SidebarProvider>
      <CosyGameSidebar></CosyGameSidebar>
    </SidebarProvider>
  )
}
