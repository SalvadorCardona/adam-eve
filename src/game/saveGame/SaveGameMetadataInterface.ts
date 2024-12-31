import GameInterface from "@/src/game/game/GameInterface"
import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import {
  BaseJsonLdInterface,
  jsonLdFactory,
  JsonLdIri,
  JsonLdTypeFactory,
} from "@/src/utils/jsonLd/jsonLd"
import {
  getItemsInLocalStorageByPrefix,
  getLocalStorage,
  persistLocalStorage,
  removeLocalStorage,
} from "@/src/utils/localStorage/localStorage"
import { appLdType } from "@/src/AppLdType"

interface SaveGameInterface extends BaseJsonLdInterface {
  name?: string
  game: GameInterface
  createdAt: Date | string
}

export interface SaveGameMetadataInterface extends GameMetaDataInterface {
  factory: (payload: {
    game: GameInterface
    saveGame: Partial<SaveGameInterface>
  }) => SaveGameInterface
  getItem: (iriSaveGame: JsonLdIri) => SaveGameInterface | undefined
  getCollection: () => SaveGameInterface[]
  persistItem: (saveGame: SaveGameInterface) => void
  removeItem: (iriSaveGame: JsonLdIri) => void
}

const ldType = JsonLdTypeFactory(appLdType.saveGame)

export const saveGameMetadata: SaveGameMetadataInterface = {
  "@type": ldType,

  factory: (payload: {
    game: GameInterface
    saveGame: Partial<SaveGameInterface>
  }): SaveGameInterface => {
    const sameGame = {
      "@type": ldType,
      game: payload.game,
      ...payload.saveGame,
    }

    return jsonLdFactory(ldType, sameGame)
  },

  getCollection: (): SaveGameInterface[] => {
    return getItemsInLocalStorageByPrefix<SaveGameInterface>(ldType)
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
