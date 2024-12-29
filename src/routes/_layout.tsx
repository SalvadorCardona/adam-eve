import { createFileRoute, Outlet } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="p-2 bg-red-600">
      <div className="border-b">I'm a layout</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
