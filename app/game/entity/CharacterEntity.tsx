import { EntityMetaDataInterface } from "@/app/game/domain/EntityMetaDataInterface"
import { updateContainer } from "@/packages/container/container"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"
import EntityInterface from "@/app/game/domain/EntityInterface"
import { CSSProperties } from "react"
import asset from "./player.png"

export const characterEntityMetaData: EntityMetaDataInterface = {
  factory: () => {
    return jsonLdFactory<EntityInterface>("personnage/character", {
      position: {
        x: 1,
        y: 0
      },
      life: 60
    })
  },
  type: "personnage/character",
  onFrame: ({ entity, game }) => {
    entity.position.x += Math.random() * 0.2 - 0.1
    entity.position.y += Math.random() * 0.2 - 0.1

    updateContainer(game, entity)
  },
  component: ({ entity }) => {
    const style: CSSProperties = {
      background: "red",
      top: entity.position.y + "px",
      left: entity.position.x + "px"
    }

    return (
      <div
        style={style}
      >
        <img src={asset.src} />
      </div>
    )
  }
}
