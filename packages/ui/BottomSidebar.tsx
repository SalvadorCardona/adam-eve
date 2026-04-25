import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { Card } from "@/app/components/ui/card"
import React, { useState } from "react"
import { ActionUserResource } from "@/packages/game/actionUser/ActionUserResource"
import { BaseGameResource } from "@/packages/game/BaseGameResource"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { AdaptiveHoverDecorator } from "@/app/components/AdaptiveHoverDecorator"
import { createEntityUserActionMetadata } from "@/app/actionUser/CreateEntityUserAction/createEntityUserActionMetadata"
import { BaseJsonLdItemInterface } from "@/packages/jsonLd/jsonLd"
import { metaDataRegistered } from "@/packages/resource/ResourceInterface"
import {
  removeBuildingUserActionMetadata
} from "@/app/actionUser/RemoveBuildingUserAction/removeBuildingUserActionMetadata"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet"
import { Button } from "@/app/components/ui/button"
import { Hammer } from "lucide-react"

type SidebarMetadata = BaseJsonLdItemInterface & {
  label?: string
  asset?: { icon?: string }
}

export const BottomSidebar = () => {
  const [open, setOpen] = useState(false)

  const allMetaDatas = Array.from(
    new Map(Object.values(metaDataRegistered).map((m) => [m["@id"], m])).values(),
  )

  const buildingMetaDatas = allMetaDatas.filter(
    (e) => e.entityType === EntityType.building,
  )

  const groundMetaDatas = allMetaDatas.filter(
    (e) => e.entityType === EntityType.ground,
  )

  const natureMetaDatas = allMetaDatas.filter(
    (e) => e.entityType === EntityType.resource,
  )

  const actionMetaDatas = [
    removeBuildingUserActionMetadata,
    createEntityUserActionMetadata,
  ]

  const characterMetaDatas = allMetaDatas.filter(
    (e) => e.entityType === EntityType.character,
  )

  const sections: { title: string; items: SidebarMetadata[] }[] = [
    { title: "Actions", items: actionMetaDatas as SidebarMetadata[] },
    { title: "Bâtiments", items: buildingMetaDatas },
    { title: "Personnages", items: characterMetaDatas },
    { title: "Nature", items: natureMetaDatas },
    { title: "Sol", items: groundMetaDatas },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-amber-400 hover:bg-amber-500 text-amber-900 rounded-full shadow-lg"
          size="lg"
        >
          <Hammer className="mr-2 h-5 w-5" />
          Construire
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Construction</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          {sections
            .filter((s) => s.items.length > 0)
            .map((section) => (
              <div key={section.title} className="flex flex-col gap-2">
                <div className="text-sm font-semibold text-muted-foreground">
                  {section.title}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <IconBuild
                    metaDatas={section.items}
                    onSelect={() => setOpen(false)}
                  />
                </div>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function isActionUserMetadata(
  metadata: SidebarMetadata,
): metadata is ActionUserResource & SidebarMetadata {
  return metadata["@type"]?.startsWith("user-action") ?? false
}

function IconBuild({
  metaDatas,
  onSelect,
}: {
  metaDatas: SidebarMetadata[]
  onSelect: () => void
}) {
  const game = useGameContext().game
  const clickOnBuilding = (metaData: SidebarMetadata) => {
    if (isActionUserMetadata(metaData) && metaData.onCall) {
      metaData.onCall({ game, metaData: metaData as unknown as BaseGameResource })
      onSelect()
      return
    }

    if (createEntityUserActionMetadata.onCall) {
      createEntityUserActionMetadata.onCall({
        game,
        metaData: metaData as unknown as BaseGameResource,
      })
    }
    onSelect()
  }

  return (
    <>
      {metaDatas.map((metadata) => {
        return (
          <AdaptiveHoverDecorator
            hoverElement={<span>{metadata?.label ?? metadata["@id"]}</span>}
            key={metadata["@id"] + "icon-build"}
          >
            <Card
              className={
                "w-20 h-20 rounded-2xl overflow-auto transition-transform duration-300 hover:scale-105 "
              }
              onClick={() => {
                clickOnBuilding(metadata)
              }}
            >
              {metadata.asset?.icon ? (
                <img
                  src={metadata.asset?.icon}
                  alt="icon"
                  className={"w-full h-full"}
                />
              ) : (
                <>{metadata["@id"]}</>
              )}
            </Card>
          </AdaptiveHoverDecorator>
        )
      })}
    </>
  )
}
