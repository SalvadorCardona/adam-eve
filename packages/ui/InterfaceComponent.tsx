import React from "react"
import { BottomSidebar } from "@/packages/ui/BottomSidebar"
import { RightSidebar } from "@/packages/ui/RightSidebar"
import { TopSideBar } from "@/packages/ui/TopSideBar"
import CosyGameSidebar from "@/app/components/cosy-game-sidebar"
import { SidebarProvider } from "@/app/components/ui/sidebar"

export const InterfaceComponent = () => {
  return (
    <>
      <TopSideBar></TopSideBar>
      {/*<LeftSidebar></LeftSidebar>*/}
      <RightSidebar></RightSidebar>
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
