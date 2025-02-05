import GameInterface, { gameFactory } from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import { createJsonLdType, JsonLdIri } from "@/src/utils/jsonLd/jsonLd"
import {
  getItemsInLocalStorageByPrefix,
  getLocalStorage,
  persistLocalStorage,
  removeLocalStorage,
} from "@/src/utils/localStorage/localStorage"
import { appLdType } from "@/src/AppLdType"

export interface GameMetadataInterface extends BaseGameMetaDataInterface {
  factory: (game?: GameInterface) => GameInterface
  getItem: (iriSaveGame: JsonLdIri) => GameInterface | undefined
  getCollection: () => GameInterface[]
  persistItem: (game: GameInterface) => void
  removeItem: (iriSaveGame: JsonLdIri) => void
}

const ldType = createJsonLdType(appLdType.game)

export const gameMetadata: GameMetadataInterface = {
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
