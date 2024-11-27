import { ContainerInterface } from "@/packages/container/container"
import EntityInterfaceInterface from "@/app/game/domain/EntityInterface"

const mockGame = {
  "personnage/character/1": {
    "@id": "personnage/character/1",
    "@type": "personnage/character",
    life: 50,
    position: {
      x: 1,
      y: 0,
      z: 1,
    },
  },
  "personnage/character/2": {
    "@id": "personnage/character/2",
    "@type": "personnage/character",
    life: 50,
    position: {
      x: -1,
      y: 0,
      z: -1,
    },
  },
} as ContainerInterface<EntityInterfaceInterface>

export default mockGame
