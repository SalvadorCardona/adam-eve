import configGame from "@/app/game/config/configGame"
import EntityInterface from "@/app/game/domain/EntityInterface"

interface EntityDecoratorPropsInterface {
  entity: EntityInterface
}

export const EntityDecorator = ({ entity }: EntityDecoratorPropsInterface) => {
  const entityMetaData = configGame[entity["@type"]] as EntityInterface
  console.log(configGame)
  console.log(entity["@type"])
  return (
    <group
      onClick={() => {
        console.log(entity)
      }}
    >
      <entityMetaData.component
        entity={entity}
        key={entity["@id"]}
      ></entityMetaData.component>
    </group>
  )
}
