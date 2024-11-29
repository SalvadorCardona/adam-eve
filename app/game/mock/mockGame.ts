import GameInterfaceInterface from "@/app/game/domain/GameInterface"

const mockGame: GameInterfaceInterface = {
  time: 0,
  entities: {
    "personnage/character/1": {
      "@id": "personnage/character/1",
      "@type": "personnage/character",
      life: 50,
      position: {
        x: 1,
        y: 0,
        z: 1
      },
      size: {
        x: 1,
        y: 1,
        z: 1
      }
    }

  }
}

export default mockGame
