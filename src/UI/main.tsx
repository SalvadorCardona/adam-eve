import React from "react"
import { createRoot } from "react-dom/client"

import { RouterProvider } from "@tanstack/react-router"
import { createRouter } from "../router"

const rootContainer = document.getElementById("root")
const root = createRoot(rootContainer!)
const router = createRouter()
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
