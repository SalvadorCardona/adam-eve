import React from "react"
import { BottomSidebar } from "@/packages/UI/BottomSidebar"
import { RightSideBarPropsInterfaceSideBar } from "@/packages/UI/RightSideBarPropsInterfaceSideBar"
import { TopSideBar } from "@/packages/UI/TopSideBar"
import TimeControls from "@/packages/UI/TimeControl"
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
