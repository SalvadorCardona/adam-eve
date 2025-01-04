import { createFileRoute, useNavigate } from "@tanstack/react-router"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { BadgePlus, ExternalLink, Github, Upload, X } from "lucide-react"
import { SaveLoadWindow } from "@/src/UI/menu/SaveLoadWindow"
import { OptionWindows } from "@/src/UI/menu/OptionWindows"
import { Card, CardContent } from "@/components/ui/card"
import image from "./hom.webp"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  const [rightWindow, setRightWindow] = useState<"save" | "load" | "options" | null>(
    null,
  )
  const navigate = useNavigate()

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Image de fond */}
      <img
        src={image}
        alt="Fond cosy"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay pour assombrir légèrement l'image et améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Contenu principal */}
      <Card className="relative z-20 w-1/3 border-white border-8">
        <CardContent className={"flex flex-col items-center justify-center p-10 "}>
          <h1 className="text-4xl md:text-6xl font-bold  mb-2 text-center capitalize ">
            Adam & Eve
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-primary capitalize">
            Rebuild the world
          </h2>
          <Separator></Separator>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="">
                <div className="grid gap-4 py-4">
                  <Button
                    className="w-full bg-amber-400 hover:bg-amber-500 text-amber-900"
                    onClick={() => navigate({ to: "/newGame" })}
                  >
                    <BadgePlus className="mr-2 h-4 w-4" /> Nouvelle partie
                  </Button>

                  <Button
                    className="w-full bg-sky-400 hover:bg-sky-500 text-white"
                    onClick={() => setRightWindow("load")}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Charger une partie
                  </Button>
                </div>
                <footer className="flex justify-center space-x-4 mt-6">
                  <a
                    href="https://github.com/SalvadorCardona/adam-eve"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-800"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://x.com/salvadevme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-800"
                  >
                    <X className="h-6 w-6" />
                  </a>
                  <a
                    href="https://bsky.app/profile/salvadev.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-800"
                  >
                    <ExternalLink className="h-6 w-6" />
                  </a>
                  {/*<a*/}
                  {/*  href="https://instagram.com"*/}
                  {/*  target="_blank"*/}
                  {/*  rel="noopener noreferrer"*/}
                  {/*  className="text-amber-600 hover:text-amber-800"*/}
                  {/*>*/}
                  {/*  <Instagram className="h-6 w-6" />*/}
                  {/*</a>*/}
                </footer>
              </div>
              <div className="w-1/2">
                {rightWindow === "save" && <SaveLoadWindow type="save" />}
                {rightWindow === "load" && <SaveLoadWindow type="load" />}
                {rightWindow === "options" && <OptionWindows />}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
