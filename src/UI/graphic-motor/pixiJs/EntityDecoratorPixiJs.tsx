import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import React, { Component, ReactNode, useMemo } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { Model2DPixiJs } from "@/src/UI/graphic-motor/pixiJs/Model2DPixiJs"
import { Container, Graphics } from "@pixi/react"
import { EntityDecoratorResolverPropsInterface } from "@/src/UI/graphic-motor/EntityDecoratorResolver"

export const EntityDecoratorPixiJs = ({
  entity,
  color,
}: EntityDecoratorResolverPropsInterface) => {
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  const game = useGameContext().game

  const isSelected = useMemo(() => {
    return game.userControl.entitiesSelected.includes(entity["@id"])
  }, [game.userControl.entitiesSelected])

  const EntityComponent = useMemo(() => {
    if (entityMetaData.component) return entityMetaData.component

    return Model2DPixiJs
  }, [])

  return (
    <Container
      name={"entity-" + entity["@id"]}
      x={entity.position.x}
      y={entity.position.y}
    >
      <EntityComponent entity={entity} />
      {color && (
        <Graphics
          draw={(g) => {
            g.clear()
            g.beginFill(color)
            g.drawRect(0, 0, entity.size.x, entity.size.z)
            g.endFill()
          }}
        />
      )}
      {isSelected && (
        <Graphics
          draw={(g) => {
            g.clear()
            g.beginFill(0xffff00) // Yellow color
            g.drawRect(0, 0, entity.size.x, entity.size.z)
            g.endFill()
          }}
        />
      )}
    </Container>
  )
}

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Met à jour l'état pour afficher l'interface de repli lors du prochain rendu.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Vous pouvez aussi enregistrer l'erreur dans un service de rapport d'erreurs.
    console.error("Erreur capturée par ErrorBoundary: ", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez personnaliser l'interface de repli ici.
      console.error(this.state)
      return <></>
    }

    return this.props.children
  }
}
