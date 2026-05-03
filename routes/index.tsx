import { createFileRoute, useNavigate } from "@tanstack/react-router"
import React, { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { BadgePlus, ExternalLink, Settings, Upload, X } from "lucide-react"
import { SaveLoadWindow } from "@/packages/ui/menu/SaveLoadWindow"
import { OptionWindows } from "@/packages/ui/menu/OptionWindows"
import { Card, CardContent } from "@/app/components/ui/card"
import image from "./hom.webp"
import { Separator } from "@/app/components/ui/separator"

type RightPanel = "load" | "options" | null

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  const [rightPanel, setRightPanel] = useState<RightPanel>(null)
  const navigate = useNavigate()
  const isPanelOpen = rightPanel !== null

  const togglePanel = (panel: Exclude<RightPanel, null>) =>
    setRightPanel((current) => (current === panel ? null : panel))

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <img
        src={image}
        alt="Adam & Eve - Rebuild the world"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <Card
        className={`relative z-20 border-primary border-4 shadow-2xl backdrop-blur-sm bg-card/90 transition-all duration-300 ${
          isPanelOpen ? "w-[min(90vw,900px)]" : "w-[min(90vw,420px)]"
        }`}
      >
        <CardContent className="flex flex-col items-center justify-center p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-1 text-center capitalize text-primary drop-shadow-md">
            Adam & Eve
          </h1>
          <h2 className="text-xl md:text-2xl mb-6 text-center text-foreground/80 capitalize tracking-wide">
            Rebuild the world
          </h2>

          <Separator className="mb-6" />

          <div className={`flex w-full gap-6 ${isPanelOpen ? "flex-row" : "flex-col"}`}>
            <div
              className={`flex flex-col ${isPanelOpen ? "w-1/2" : "w-full"}`}
            >
              <div className="grid gap-3">
                <Button
                  size="lg"
                  className="w-full bg-amber-400 hover:bg-amber-500 text-amber-900 transition-transform hover:scale-[1.02]"
                  onClick={() => navigate({ to: "/newGame" })}
                >
                  <BadgePlus className="mr-2 h-4 w-4" /> Nouvelle partie
                </Button>

                <Button
                  size="lg"
                  variant={rightPanel === "load" ? "secondary" : "default"}
                  className="w-full bg-sky-400 hover:bg-sky-500 text-white transition-transform hover:scale-[1.02]"
                  onClick={() => togglePanel("load")}
                >
                  <Upload className="mr-2 h-4 w-4" /> Charger une partie
                </Button>

                <Button
                  size="lg"
                  variant={rightPanel === "options" ? "secondary" : "default"}
                  className="w-full bg-emerald-400 hover:bg-emerald-500 text-white transition-transform hover:scale-[1.02]"
                  onClick={() => togglePanel("options")}
                >
                  <Settings className="mr-2 h-4 w-4" /> Options
                </Button>
              </div>

              <footer className="flex items-center justify-center gap-4 mt-8 text-sm">
                <a
                  href="https://github.com/SalvadorCardona/adam-eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-800 transition-colors"
                >
                  Github
                </a>
                <span className="text-foreground/30">·</span>
                <a
                  href="https://x.com/salvadevme"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="text-amber-600 hover:text-amber-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </a>
                <span className="text-foreground/30">·</span>
                <a
                  href="https://bsky.app/profile/salvadev.bsky.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bluesky"
                  className="text-amber-600 hover:text-amber-800 transition-colors flex items-center gap-1"
                >
                  Bluesky
                  <ExternalLink className="h-4 w-4" />
                </a>
              </footer>
            </div>

            {isPanelOpen && (
              <div className="w-1/2 relative">
                <button
                  onClick={() => setRightPanel(null)}
                  aria-label="Fermer"
                  className="absolute -top-2 -right-2 z-10 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-900 p-1 shadow-md transition-transform hover:scale-110"
                >
                  <X className="h-4 w-4" />
                </button>
                {rightPanel === "load" && <SaveLoadWindow type="load" />}
                {rightPanel === "options" && <OptionWindows />}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
