import React from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"
import { createRouter } from "../routes/router"
import { resourceList } from "@/app/resourceList"
import { metaDataFactory } from "@/packages/metadata/MetadataInterface"

const rootContainer = document.getElementById("root")
const root = createRoot(rootContainer!)
const router = createRouter()
resourceList.forEach((e) => metaDataFactory(e))
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
