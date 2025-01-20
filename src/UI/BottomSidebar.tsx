import { getByLdType } from "@/src/container/container"
import configGame from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Card } from "@/components/ui/card"
import React from "react"
import { ActionUserMetaDataInterface } from "@/src/game/actionUser/ActionUserMetaDataInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import useGameContext from "@/src/UI/provider/useGameContext"
import { appLdType } from "@/src/AppLdType"
import { AdaptiveHoverDecorator } from "@/components/AdaptiveHoverDecorator"
import { createEntityUserActionMetadata } from "@/src/game/actionUser/app/CreateEntityUserAction/createEntityUserActionMetadata"

export const BottomSidebar = () => {
  const buildingMetaDatas = getByLdType<EntityMetaDataInterface>(
    configGame,
    appLdType.entityBuilding,
  )

  const groundMetaDatas = getByLdType<EntityMetaDataInterface>(
    configGame,
    appLdType.entityGround,
  )

  const natureMetaDatas = getByLdType<EntityMetaDataInterface>(
    configGame,
    appLdType.entityRessource,
  )

  const actionMetaDatas = getByLdType<ActionUserMetaDataInterface>(
    configGame,
    appLdType.userAction,
  )

  const characterMetaDatas = getByLdType<ActionUserMetaDataInterface>(
    configGame,
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
  metadata: BaseGameMetaDataInterface,
): metadata is ActionUserMetaDataInterface {
  return metadata["@type"].startsWith("user-action/")
}

function IconBuild({ metaDatas }: { metaDatas: BaseGameMetaDataInterface[] }) {
  const game = useGameContext().game
  const clickOnBuilding = (metaData: BaseGameMetaDataInterface) => {
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
