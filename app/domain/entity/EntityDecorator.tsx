import configGame from "@/app/game/configGame"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import useGameContext from "@/app/game/provider/useGameContext"

interface EntityDecoratorPropsInterface {
  entity: EntityInterface
}

export const EntityDecorator = ({ entity }: EntityDecoratorPropsInterface) => {
  const entityMetaData = configGame[entity["@type"]] as EntityMetaDataInterface
  const gameContext = useGameContext()

  const selectEntity = () => {
    gameContext.game.entitySelection = entity
    gameContext.updateGame(gameContext.game)
  }

  return (
    <group onClick={selectEntity}>
      <entityMetaData.component
        entity={entity}
        key={entity["@id"]}
      ></entityMetaData.component>
    </group>
  )
}
