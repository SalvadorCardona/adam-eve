import React from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"
import { createRouter } from "../routes/router"
import { resourceList } from "@/app/resourceList"
import { createResource } from "@/packages/resource/ResourceInterface"

const rootContainer = document.getElementById("root")
const root = createRoot(rootContainer!)
const router = createRouter()
resourceList.forEach((e) => createResource(e))
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
