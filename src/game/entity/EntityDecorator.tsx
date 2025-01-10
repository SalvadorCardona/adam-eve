import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Model2D } from "@/src/game/entity/components/Model2D"
import { Model3D } from "@/src/game/entity/components/Model3D"
import { getMetaData } from "@/src/game/game/app/configGame"
import React, { Component, ReactNode, useMemo } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { vector3ToArray } from "@/src/utils/3Dmath/Vector"

interface EntityDecoratorPropsInterface {
  entity: EntityInterface
  bgColor?: string
}

export const EntityDecorator = ({
  entity,
  bgColor,
}: EntityDecoratorPropsInterface) => {
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  const game = useGameContext().game

  const isSelected = useMemo(() => {
    return game.userControl.entitiesSelected.includes(entity["@id"])
  }, [game.userControl.entitiesSelected])

  let EntityComponent = entityMetaData.component

  if (!EntityComponent) {
    EntityComponent = Model2D
    if (entityMetaData.asset?.model3d || entityMetaData.asset?.multiModel3d)
      EntityComponent = Model3D
  }

  return (
    <ErrorBoundary>
      <group
        uuid={"entity-" + entity["@id"]}
        // onClick={clickOnEntity}
        position={vector3ToArray(entity.position)}
      >
        <EntityComponent entity={entity}></EntityComponent>
        {bgColor && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[entity.size.x, entity.size.z]} />
            <meshStandardMaterial color={bgColor} />
          </mesh>
        )}
        {isSelected && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[entity.size.x, entity.size.z]} />
            <meshStandardMaterial color={"yellow"} />
          </mesh>
        )}
      </group>
    </ErrorBoundary>
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
