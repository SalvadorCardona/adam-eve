import React, { useState } from "react"
import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import {
  getResource,
  metaDataRegistered,
} from "@/packages/resource/ResourceInterface"
import { playerBuildUserActionMetadata } from "@/app/actionUser/PlayerBuildUserAction/playerBuildUserActionMetadata"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { updateGame } from "@/packages/game/game/updateGame"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import { InventoryItem } from "@/packages/game/inventory/InventoryResource"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import { Button } from "@/app/components/ui/button"
import { HardHat } from "lucide-react"

interface RequiredResource {
  type: string
  label: string
  icon?: string
  quantity: number
  available: number
  enough: boolean
}

export const PlayerBuildDrawer = () => {
  const [open, setOpen] = useState(false)
  const game = useGameContext().game
  const [, setInventoryVersion] = useState(game.inventory["@version"] ?? 0)
  useGamePubSub(game.inventory["@id"], () => {
    setInventoryVersion(game.inventory["@version"] ?? 0)
  })

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

  const requiredFor = (resource: EntityResourceInterface): RequiredResource[] => {
    const inv = resource.propriety?.resourceForConstruction
    if (!inv) return []
    return Object.values(inv.member ?? {})
      .filter((item): item is InventoryItem => !!item["@type"])
      .map((item) => {
        const meta = getResource<{
          label?: string
          asset?: { icon?: string }
        }>(item["@type"]!)
        const have = getInventoryItem(game.inventory, item["@type"]!).quantity
        return {
          type: item["@type"]!,
          label: meta?.label ?? item["@type"]!,
          icon: meta?.asset?.icon,
          quantity: item.quantity,
          available: have,
          enough: have >= item.quantity,
        }
      })
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
        <ul className="flex flex-col gap-1 mt-4">
          {buildings.map((resource) => {
            const required = requiredFor(resource)
            const canBuild = required.every((r) => r.enough)
            return (
              <li key={resource["@id"] + "player-build-row"}>
                <button
                  type="button"
                  onClick={() => onPick(resource)}
                  className={
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-transparent " +
                    "hover:border-emerald-400 hover:bg-emerald-50/40 transition-colors cursor-pointer text-left " +
                    (canBuild ? "" : "opacity-70")
                  }
                >
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-muted/40 rounded-md overflow-hidden">
                    {resource.asset?.icon ? (
                      <img
                        src={resource.asset.icon}
                        alt={resource.label ?? resource["@id"]}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-xs">{resource["@id"]}</span>
                    )}
                  </div>
                  <span className="font-medium flex-1 truncate">
                    {resource.label ?? resource["@id"]}
                  </span>
                  <div className="flex items-center gap-3 shrink-0">
                    {required.length === 0 ? (
                      <span className="text-xs text-muted-foreground">Gratuit</span>
                    ) : (
                      required.map((r) => (
                        <span
                          key={r.type}
                          className={
                            "flex items-center gap-1 text-sm tabular-nums " +
                            (r.enough ? "text-foreground" : "text-red-600")
                          }
                          title={`${r.label}: ${r.available}/${r.quantity}`}
                        >
                          {r.icon ? (
                            <img
                              src={r.icon}
                              alt={r.label}
                              className="w-4 h-4 object-contain"
                            />
                          ) : (
                            <span>{r.label}</span>
                          )}
                          <span>{r.quantity}</span>
                        </span>
                      ))
                    )}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
