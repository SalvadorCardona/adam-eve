import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Model2D } from "@/src/game/entity/components/Model2D"
import { Model3D } from "@/src/game/entity/components/Model3D"
import { getMetaData } from "@/src/game/game/app/configGame"
import React, { Component, ReactNode, useRef } from "react"
import { vector3ToArray } from "@/src/game/3D/Vector"
import { onSelectEntityUserActionMetadata } from "@/src/game/actionUser/app/OnSelectEntityUserActionMetadata"
import useGameContext from "@/src/UI/provider/useGameContext"
import { useFrame } from "@react-three/fiber"

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
  const clickOnEntity = () => {
    onSelectEntityUserActionMetadata.onApply &&
      onSelectEntityUserActionMetadata.onApply({ game, entity })
  }

  const shaderRef = useRef()

  let EntityComponent = entityMetaData.component

  if (!EntityComponent) {
    EntityComponent = Model2D
    if (entityMetaData.asset?.model3d) EntityComponent = Model3D
  }

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      // shaderRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <ErrorBoundary>
      <group
        onClick={clickOnEntity}
        position={vector3ToArray(entity.position)}
        rotation={vector3ToArray(entity.rotation)}
      >
        <EntityComponent entity={entity}></EntityComponent>
        {bgColor && (
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[entity.size.x, entity.size.z]} />
            <meshStandardMaterial color={bgColor} />
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
    debugger
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
