import React from "react"
import { BottomSidebar } from "@/packages/ui/BottomSidebar"
import { RightSideBarPropsInterfaceSideBar } from "@/packages/ui/RightSideBarPropsInterfaceSideBar"
import { TopSideBar } from "@/packages/ui/TopSideBar"
import TimeControls from "@/packages/ui/TimeControl"
import CosyGameSidebar from "@/app/components/cosy-game-sidebar"
import { SidebarProvider } from "@/app/components/ui/sidebar"

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
