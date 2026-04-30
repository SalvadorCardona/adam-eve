import React, { useState } from "react"
import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import { metaDataRegistered } from "@/packages/resource/ResourceInterface"
import { playerBuildUserActionMetadata } from "@/app/actionUser/PlayerBuildUserAction/playerBuildUserActionMetadata"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { updateGame } from "@/packages/game/game/updateGame"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { AdaptiveHoverDecorator } from "@/app/components/AdaptiveHoverDecorator"
import { HardHat } from "lucide-react"

export const PlayerBuildDrawer = () => {
  const [open, setOpen] = useState(false)
  const game = useGameContext().game

  const buildings = Array.from(
    new Map(Object.values(metaDataRegistered).map((m) => [m["@id"], m])).values(),
  ).filter(
    (m): m is EntityResourceInterface =>
      (m as EntityResourceInterface).entityType === EntityType.building &&
      !!(m as EntityResourceInterface).propriety?.resourceForConstruction,
  )

  const onPick = (resource: EntityResourceInterface) => {
    playerBuildUserActionMetadata.onCall?.({ game, metaData: resource })
    updateGame(game, game.userControl)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 z-50 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg"
          size="lg"
        >
          <HardHat className="mr-2 h-5 w-5" />
          Construire (Joueur)
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Construction joueur ({buildings.length})</SheetTitle>
        </SheetHeader>
        <p className="text-sm text-muted-foreground mt-2">
          Choisis un bâtiment, puis appuie sur Entrée pour le poser devant toi (Échap pour annuler).
        </p>
        <div className="flex gap-2 flex-wrap mt-4">
          {buildings.map((resource) => (
            <AdaptiveHoverDecorator
              hoverElement={<span>{resource.label ?? resource["@id"]}</span>}
              key={resource["@id"] + "player-build"}
            >
              <Card
                className="w-20 h-20 rounded-2xl overflow-auto transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => onPick(resource)}
              >
                {resource.asset?.icon ? (
                  <img
                    src={resource.asset.icon}
                    alt="icon"
                    className="w-full h-full"
                  />
                ) : (
                  <>{resource["@id"]}</>
                )}
              </Card>
            </AdaptiveHoverDecorator>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
