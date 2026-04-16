import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { Card } from "@/app/components/ui/card"
import React from "react"
import { ActionUserResource } from "@/packages/game/actionUser/ActionUserResource"
import { BaseGameResource } from "@/packages/game/BaseGameResource"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { appLdType } from "@/app/AppLdType"
import { AdaptiveHoverDecorator } from "@/app/components/AdaptiveHoverDecorator"
import { createEntityUserActionMetadata } from "@/app/ationUser/CreateEntityUserAction/createEntityUserActionMetadata"
import { getByLdTypeIn } from "@/packages/jsonLd/jsonLd"
import { metaDataRegistered } from "@/packages/resource/ResourceInterface"

export const BottomSidebar = () => {
  const buildingMetaDatas = getByLdTypeIn<EntityResourceInterface>(
    metaDataRegistered,
    appLdType.entityBuilding,
  )

  const groundMetaDatas = getByLdTypeIn<EntityResourceInterface>(
    metaDataRegistered,
    appLdType.entityGround,
  )

  const natureMetaDatas = getByLdTypeIn<EntityResourceInterface>(
    metaDataRegistered,
    appLdType.entityResource,
  )

  const actionMetaDatas = getByLdTypeIn<ActionUserResource>(
    metaDataRegistered,
    appLdType.userAction,
  )

  const characterMetaDatas = getByLdTypeIn<ActionUserResource>(
    metaDataRegistered,
    appLdType.entityCharacter,
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
  metadata: BaseGameResource,
): metadata is ActionUserResource {
  return metadata["@type"].startsWith("user-action/")
}

function IconBuild({ metaDatas }: { metaDatas: BaseGameResource[] }) {
  const game = useGameContext().game
  const clickOnBuilding = (metaData: BaseGameResource) => {
    if (isActionUserMetadata(metaData) && metaData.onCall) {
      metaData.onCall({ game, metaData })

      return
    }

    if (createEntityUserActionMetadata.onCall) {
      createEntityUserActionMetadata.onCall({ game, metaData })
    }
  }

  return (
    <>
      {metaDatas.map((metadata) => {
        return (
          <AdaptiveHoverDecorator
            hoverElement={<span>{metadata?.label ?? metadata["@type"]}</span>}
            key={metadata["@type"] + "icon-build"}
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
                <>{metadata["@type"]}</>
              )}
            </Card>
          </AdaptiveHoverDecorator>
        )
      })}
    </>
  )
}
