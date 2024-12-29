import GameInterface from "@/src/game/game/GameInterface"
import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import {
  BaseJsonLdInterface,
  jsonLdFactory,
  JsonLdIri,
} from "@/src/utils/jsonLd/jsonLd"
import {
  getItemsInLocalStorageByPrefix,
  getLocalStorage,
  persistLocalStorage,
  removeLocalStorage,
} from "@/src/utils/localStorage/localStorage"

interface SaveGameInterface extends BaseJsonLdInterface {
  name?: string
  game: GameInterface
  createdAt: Date
}

export interface SaveGameMetadataInterface extends GameMetaDataInterface {
  factory: (payload: {
    game: GameInterface
    saveGame: SaveGameInterface
  }) => SaveGameInterface
  getItem: (iriSaveGame: JsonLdIri) => SaveGameInterface | undefined
  getCollection: () => SaveGameInterface[]
  persistItem: (saveGame: SaveGameInterface) => void
  removeItem: (iriSaveGame: JsonLdIri) => void
}

export const saveGameMetadata: SaveGameMetadataInterface = {
  "@type": "save-game",

  factory: (payload: {
    game: GameInterface
    saveGame: Partial<SaveGameInterface>
  }): SaveGameInterface => {
    const sameGame = {
      "@type": "save-game",
      game: payload.game,
      ...payload.saveGame,
    }

    return jsonLdFactory("save-game", sameGame)
  },

  getCollection: (): SaveGameInterface[] => {
    return getItemsInLocalStorageByPrefix<SaveGameInterface>("save-game")
  },

  getItem: (iriSaveGame: JsonLdIri): SaveGameInterface | undefined => {
    return getLocalStorage<SaveGameInterface>(iriSaveGame) ?? undefined
  },

  persistItem: (saveGame: SaveGameInterface): void => {
    const iriSaveGame = saveGame["@id"]
    if (iriSaveGame) {
      persistLocalStorage(iriSaveGame, saveGame)
    }
  },

  removeItem: (iriSaveGame: JsonLdIri): void => {
    removeLocalStorage(iriSaveGame)
  },
}
