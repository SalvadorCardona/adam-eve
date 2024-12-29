import * as React from "react"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import "../../index.css"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className={"bg-red-600"}>
        <Outlet />
      </div>
    </React.Fragment>
  )
}
