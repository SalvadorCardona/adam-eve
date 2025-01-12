import GameInterface from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { JsonLdIri, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import {
  getItemsInLocalStorageByPrefix,
  getLocalStorage,
  persistLocalStorage,
  removeLocalStorage,
} from "@/src/utils/localStorage/localStorage"
import { appLdType } from "@/src/AppLdType"
import { gameFactory } from "@/src/game/game/gameFactory"

export interface GameMetadataInterface extends BaseGameMetaDataInterface {
  factory: (game?: GameInterface) => GameInterface
  getItem: (iriSaveGame: JsonLdIri) => GameInterface | undefined
  getCollection: () => GameInterface[]
  persistItem: (game: GameInterface) => void
  removeItem: (iriSaveGame: JsonLdIri) => void
  propriety: {
    gameFrame: number
  }
}

const ldType = JsonLdTypeFactory(appLdType.game)

export const gameMetadata: GameMetadataInterface = {
  propriety: {
    gameFrame: 45,
  },
  "@type": appLdType.game,
  factory: gameFactory,
  getCollection: (): GameInterface[] => {
    return getItemsInLocalStorageByPrefix<GameInterface>(ldType)
  },

  getItem: (iriSaveGame: JsonLdIri): GameInterface | undefined => {
    return getLocalStorage<GameInterface>(iriSaveGame) ?? undefined
  },

  persistItem: (game: GameInterface): void => {
    const iriSaveGame = game["@id"]
    if (iriSaveGame) {
      persistLocalStorage(iriSaveGame, game)
    }
  },

  removeItem: (iriSaveGame: JsonLdIri): void => {
    removeLocalStorage(iriSaveGame)
  },
}
