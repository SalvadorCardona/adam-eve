import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { Card } from "@/app/components/ui/card"
import React from "react"
import { ActionUserResource } from "@/packages/game/actionUser/ActionUserResource"
import { BaseGameResource } from "@/packages/game/BaseGameResource"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { AdaptiveHoverDecorator } from "@/app/components/AdaptiveHoverDecorator"
import { createEntityUserActionMetadata } from "@/app/actionUser/CreateEntityUserAction/createEntityUserActionMetadata"
import { BaseJsonLdItemInterface } from "@/packages/jsonLd/jsonLd"
import { metaDataRegistered } from "@/packages/resource/ResourceInterface"
import { removeBuildingUserActionMetadata } from "@/app/actionUser/RemoveBuildingUserAction/removeBuildingUserActionMetadata"

type SidebarMetadata = BaseJsonLdItemInterface & {
  label?: string
  asset?: { icon?: string }
}

export const BottomSidebar = () => {
  const allMetaDatas = Array.from(
    new Map(
      Object.values(metaDataRegistered).map((m) => [m["@id"], m]),
    ).values(),
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

  return (
    <div className={"fixed bottom-0 left-0  rounded-2xl p-5"}>
      <div className={"flex gap-2"}>
        <IconBuild metaDatas={actionMetaDatas}></IconBuild>
      </div>
      <div className={"flex gap-2"}>
        <IconBuild metaDatas={characterMetaDatas}></IconBuild>
      </div>
      <div className={"flex gap-2"}>
        <IconBuild metaDatas={natureMetaDatas}></IconBuild>
      </div>
      <div className={"flex gap-2"}>
        <IconBuild metaDatas={groundMetaDatas}></IconBuild>
      </div>
      <div className={"flex gap-2 mt-2"}>
        <IconBuild metaDatas={buildingMetaDatas}></IconBuild>
      </div>
    </div>
  )
}

function isActionUserMetadata(
  metadata: SidebarMetadata,
): metadata is ActionUserResource & SidebarMetadata {
  return metadata["@type"]?.startsWith("user-action") ?? false
}

function IconBuild({ metaDatas }: { metaDatas: SidebarMetadata[] }) {
  const game = useGameContext().game
  const clickOnBuilding = (metaData: SidebarMetadata) => {
    if (isActionUserMetadata(metaData) && metaData.onCall) {
      metaData.onCall({ game, metaData: metaData as unknown as BaseGameResource })

      return
    }

    if (createEntityUserActionMetadata.onCall) {
      createEntityUserActionMetadata.onCall({
        game,
        metaData: metaData as unknown as BaseGameResource,
      })
    }
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
              onClick={(e) => {
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
