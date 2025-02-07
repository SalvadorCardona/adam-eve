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

export interface PlayerInterface extends BaseJsonLdInterface {
  name?: string
}

export interface PlayerMetadataInterface
  extends BaseGameMetaDataInterface,
    RepositoryInterface<PlayerInterface> {
  factory: (payload: { player: Partial<PlayerInterface> }) => PlayerInterface
  getPlayer: () => PlayerInterface
}

const ldType = createJsonLdType(appLdType.players)

export const playerMetadata: PlayerMetadataInterface = {
  "@type": ldType,
  factory: (payload: { player: Partial<PlayerInterface> }): PlayerInterface => {
    const sameGame = {
      "@type": ldType,
      name: "Unknown",
      ...payload.player,
    }

    return createJsonLd<PlayerInterface>(ldType, sameGame)
  },

  getPlayer: () => {
    const players = playerMetadata.getCollection()
    if (players.length) return players[0]

    const player = playerMetadata.factory({ player: {} })

    playerMetadata.persistItem(player)

    return player
  },

  getCollection: (): PlayerInterface[] => {
    return getItemsInLocalStorageByPrefix<PlayerInterface>(ldType)
  },

  getItem: (iriPlayer: JsonLdIri): PlayerInterface | undefined => {
    return getLocalStorage<PlayerInterface>(iriPlayer) ?? undefined
  },

  persistItem: (player: PlayerInterface): void => {
    const iriPlayer = player["@id"]
    if (iriPlayer) {
      persistLocalStorage(iriPlayer, player)
    }
  },

  removeItem: (iriPlayer: JsonLdIri): void => {
    removeLocalStorage(iriPlayer)
  },
}
