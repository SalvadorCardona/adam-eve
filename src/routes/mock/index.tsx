import { createFileRoute, useNavigate } from "@tanstack/react-router"
import React from "react"
import { mockGames } from "@/src/game/mockGame/mockGame"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/mock/")({
  component: Home,
})

function Home() {
  const navigate = useNavigate()

  const levels = Object.keys(mockGames)
  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-800 mb-8 text-center">
          Mock of the game
        </h1>
        <div className="grid gap-6">
          {levels.map((levelKey) => {
            const level = mockGames[levelKey]
            return (
              <Card
                key={level["@id"]}
                className="bg-white border-amber-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div>
                    <CardTitle className="text-xl text-amber-800">
                      {levelKey}
                    </CardTitle>
                    <CardDescription className="text-amber-600">
                      Niveau {levelKey}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 mb-4">No Description</p>
                  <Button
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={() => {
                      navigate({
                        to: "/mock/$mockName",
                        params: { mockName: levelKey },
                      })
                    }}
                  >
                    Jouer à ce niveau
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
