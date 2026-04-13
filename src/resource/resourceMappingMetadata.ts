import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import { InventoryItemMetadataInterface } from "@/src/game/inventory/InventoryItemInterface"
import {
  JsonLdIri,
  JsonLdType,
  JsonLdTypeContainerInterface,
} from "@/packages/jsonLd/jsonLd"
import { timberHouseEntityMetaData } from "@/src/game/entity/app/building/timberHouse/TimberHouseEntity"
import { treeEntityMetaData } from "@/src/game/entity/app/resource/tree/TreeEntity"
import { woodResourceMetadata } from "@/src/game/entity/app/resource/tree/woodResource"
import { goldResourceEntityResource } from "@/src/game/entity/app/resource/gold/goldResourceEntityResource"
import { goldResourceMetadata } from "@/src/game/entity/app/resource/gold/goldResource"
import { RepositoryInterface } from "@/packages/repository/repository"
import {
  metaDataFactory,
  MetadataInterface,
} from "@/packages/metadata/MetadataInterface"
import { goldMineBuildMetaDataEntity } from "@/src/game/entity/app/resource/gold/GoldMineBuildingEntityResource"

interface ResourceMapping {
  entityMetaDataResource: EntityResourceInterface
  entityMetaDataBuilding: EntityResourceInterface
  resource: InventoryItemMetadataInterface
}

const resourceMappingList: JsonLdTypeContainerInterface<ResourceMapping> = {
  [timberHouseEntityMetaData["@id"]]: {
    entityMetaDataResource: treeEntityMetaData,
    entityMetaDataBuilding: timberHouseEntityMetaData,
    resource: woodResourceMetadata,
  },
  [goldMineBuildMetaDataEntity["@id"]]: {
    entityMetaDataResource: goldResourceEntityResource,
    entityMetaDataBuilding: goldMineBuildMetaDataEntity,
    resource: goldResourceMetadata,
  },
}

export interface ResourceMappingMetadataInterface
  extends RepositoryInterface<ResourceMapping>, MetadataInterface {}

export const resourceMappingMetaData =
  metaDataFactory<ResourceMappingMetadataInterface>({
    "@id": "resourceMapping",
    getCollection: (): ResourceMapping[] => {
      return Object.values(resourceMappingList)
    },

    getItem: (buildingType: JsonLdType): ResourceMapping | undefined => {
      return resourceMappingList[buildingType] ?? undefined
    },

    persistItem: (game: ResourceMapping): void => {},

    removeItem: (iriSaveGame: JsonLdIri): void => {},
  })
