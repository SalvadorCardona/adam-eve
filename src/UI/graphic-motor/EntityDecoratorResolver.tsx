import EntityInterface from "@/src/game/entity/EntityInterface"
import useGameContext from "@/src/UI/provider/useGameContext"
import { GraphicMotor } from "@/src/game/game/GameInterface"
import { EntityDecoratorPixiJs } from "@/src/UI/graphic-motor/pixiJs/EntityDecoratorPixiJs"
import { EntityDecoratorThreeJs } from "@/src/UI/graphic-motor/three/EntityDecoratorThreeJs"
import React from "react"

export interface EntityDecoratorResolverPropsInterface {
  color?: string
  entity: EntityInterface
}

export const EntityDecoratorResolver = ({
  entity,
  color,
}: EntityDecoratorResolverPropsInterface) => {
  const game = useGameContext().game

  if (!game.graphicMotor || game.graphicMotor === GraphicMotor.PIXI_JS) {
    return (
      <EntityDecoratorPixiJs color={color} entity={entity}></EntityDecoratorPixiJs>
    )
  }

  if (game.graphicMotor === GraphicMotor.THREE_JS) {
    return (
      <EntityDecoratorThreeJs color={color} entity={entity}></EntityDecoratorThreeJs>
    )
  }

  console.warn("No Decorator Found")

  return
}
