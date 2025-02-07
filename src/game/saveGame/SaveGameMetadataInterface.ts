import GameInterface from "@/src/game/game/GameInterface"
import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
import {
  BaseJsonLdInterface,
  createJsonLd,
  createJsonLdType,
  JsonLdIri,
} from "@/src/utils/jsonLd/jsonLd"
import {
  getItemsInLocalStorageByPrefix,
  getLocalStorage,
  persistLocalStorage,
  removeLocalStorage,
} from "@/src/utils/localStorage/localStorage"
import { appLdType } from "@/src/AppLdType"
import { RepositoryInterface } from "@/src/utils/repository/repository"

interface SaveGameInterface extends BaseJsonLdInterface {
  name?: string
  game: GameInterface
  createdAt: Date | string
}

export interface SaveGameMetadataInterface
  extends BaseGameMetaDataInterface,
    RepositoryInterface<SaveGameInterface> {
  factory: (payload: {
    game: GameInterface
    saveGame: Partial<SaveGameInterface>
  }) => SaveGameInterface
}

const ldType = createJsonLdType(appLdType.saveGame)

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

    return createJsonLd(ldType, sameGame)
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
