import GameInterfaceInterface from "@/app/game/domain/GameInterface"
import { createContainer, updateContainer } from "@/packages/container/container"
import { characterEntityMetaData } from "@/app/game/entity/character/CharacterEntity"
import EntityInterface from "@/app/game/domain/entity/EntityInterface"
import { houseEntityMetaData } from "@/app/game/entity/house/houseEntity"
import { threeEntityMetaData } from "@/app/game/entity/three/Three2Entity"
import { forumEntityMetaData } from "@/app/game/entity/forum/ForumEntity"

const entities = createContainer<EntityInterface>()

updateContainer(
  entities,
  characterEntityMetaData.factory({
    entity: {
      speed: 0.1,
      life: 50,
      position: {
        x: 1,
        y: 0.2,
        z: 1,
      },
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
    },
  }),
)

updateContainer(
  entities,
  houseEntityMetaData.factory({
    entity: {
      speed: 0.1,
      life: 50,
      position: {
        x: 4,
        y: 0.2,
        z: 4,
      },
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
    },
  }),
)

updateContainer(
  entities,
  threeEntityMetaData.factory({
    entity: {
      speed: 0.1,
      life: 50,
      position: {
        x: 2,
        y: 0.2,
        z: 2,
      },
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
    },
  }),
)

updateContainer(
  entities,
  forumEntityMetaData.factory({
    entity: {
      life: 50,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
    },
  }),
)

const mockGame: GameInterfaceInterface = {
  time: 0,
  entities: entities,
}

export default mockGame
