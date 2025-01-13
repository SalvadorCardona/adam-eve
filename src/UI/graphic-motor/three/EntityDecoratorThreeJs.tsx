import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Model2DThreeJs } from "@/src/UI/graphic-motor/three/Model2DThreeJs"
import { Model3DThreeJs } from "@/src/UI/graphic-motor/three/Model3DThreeJs"
import { getMetaData } from "@/src/game/game/app/configGame"
import React, { Component, ReactNode, useMemo } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { vector3ToArray } from "@/src/utils/3Dmath/Vector"
import { EntityDecoratorResolverPropsInterface } from "@/src/UI/graphic-motor/EntityDecoratorResolver"

export const EntityDecoratorThreeJs = ({
  entity,
  color,
}: EntityDecoratorResolverPropsInterface) => {
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  const game = useGameContext().game

  const isSelected = useMemo(() => {
    return game.userControl.entitiesSelected.includes(entity["@id"])
  }, [game.userControl.entitiesSelected])

  const EntityComponent = useMemo(() => {
    console.log("started mounted")
    if (entityMetaData.component) return entityMetaData.component
    if (entityMetaData?.asset?.model2d) return Model2DThreeJs
    if (entityMetaData?.asset?.model3d) return Model3DThreeJs

    return Model2DThreeJs
  }, [])

  return (
    <group
      uuid={"entity-" + entity["@id"]}
      // onClick={clickOnEntity}
      position={vector3ToArray(entity.position)}
    >
      <EntityComponent entity={entity}></EntityComponent>
      {color && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[entity.size.x, entity.size.z]} />
          <meshStandardMaterial color={color} />
        </mesh>
      )}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[entity.size.x, entity.size.z]} />
          <meshStandardMaterial color={"yellow"} />
        </mesh>
      )}
    </group>
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
