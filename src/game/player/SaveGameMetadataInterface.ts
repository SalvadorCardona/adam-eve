import { BaseGameMetaDataInterface } from "@/src/game/BaseGameMetaDataInterface"
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

export interface PlayerInterface extends BaseJsonLdInterface {
  name?: string
}

export interface PlayerMetadataInterface extends BaseGameMetaDataInterface {
  factory: (payload: { player: Partial<PlayerInterface> }) => PlayerInterface
  getItem: (iriPlayer: JsonLdIri) => PlayerInterface | undefined
  getCollection: () => PlayerInterface[]
  persistItem: (player: PlayerInterface) => void
  removeItem: (iriPlayer: JsonLdIri) => void
  getPlayer: () => PlayerInterface
}

const ldType = JsonLdTypeFactory(appLdType.player)

export const playerMetadata: PlayerMetadataInterface = {
  "@type": ldType,
  factory: (payload: { player: Partial<PlayerInterface> }): PlayerInterface => {
    const sameGame = {
      "@type": ldType,
      name: "Unknown",
      ...payload.player,
    }

    return jsonLdFactory<PlayerInterface>(ldType, sameGame)
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
