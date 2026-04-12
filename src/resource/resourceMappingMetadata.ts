import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { InventoryItemMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import {
  JsonLdIri,
  JsonLdType,
  JsonLdTypeContainerInterface,
} from "@/packages/jsonLd/jsonLd"
import { timberHouseEntityMetaData } from "@/src/game/entity/app/building/timberHouse/TimberHouseEntity"
import { treeEntityMetaData } from "@/src/game/entity/app/resource/tree/TreeEntity"
import { woodResourceMetadata } from "@/src/game/entity/app/resource/tree/woodResource"
import {
  goldMineBuildMetaDataEntity,
  goldMineResourceMetaDataEntity,
} from "@/src/game/entity/app/resource/gold/GoldMineBuildMetaDataEntity"
import { goldResourceMetadata } from "@/src/game/entity/app/resource/gold/goldResource"
import { RepositoryInterface } from "@/packages/repository/repository"
import {
  metaDataFactory,
  MetadataInterface,
} from "@/packages/metadata/MetadataInterface"

interface ResourceMapping {
  entityMetaDataResource: EntityMetaDataInterface
  entityMetaDataBuilding: EntityMetaDataInterface
  resource: InventoryItemMetadataInterface
}

const resourceMappingList: JsonLdTypeContainerInterface<ResourceMapping> = {
  [timberHouseEntityMetaData["@type"]]: {
    entityMetaDataResource: treeEntityMetaData,
    entityMetaDataBuilding: timberHouseEntityMetaData,
    resource: woodResourceMetadata,
  },
  [goldMineBuildMetaDataEntity["@type"]]: {
    entityMetaDataResource: goldMineResourceMetaDataEntity,
    entityMetaDataBuilding: goldMineBuildMetaDataEntity,
    resource: goldResourceMetadata,
  },
}

export interface ResourceMappingMetadataInterface
  extends RepositoryInterface<ResourceMapping>,
    MetadataInterface {}

export const resourceMappingMetaData =
  metaDataFactory<ResourceMappingMetadataInterface>({
    "@type": "resourceMapping",
    getCollection: (): ResourceMapping[] => {
      return Object.values(resourceMappingList)
    },

    getItem: (buildingType: JsonLdType): ResourceMapping | undefined => {
      return resourceMappingList[buildingType] ?? undefined
    },

    persistItem: (game: ResourceMapping): void => {},

    removeItem: (iriSaveGame: JsonLdIri): void => {},
  })
