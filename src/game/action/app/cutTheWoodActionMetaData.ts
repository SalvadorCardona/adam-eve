import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import {
  jsonLdFactory,
  JsonLdIri,
  JsonLdTypeFactory,
} from "@/src/utils/jsonLd/jsonLd"
import { findClosestInGame } from "@/src/utils/3Dmath/findClosest"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { getInventoryItem } from "@/src/game/inventory/getInventoryItem"
import { transfertInventory } from "@/src/game/inventory/transfertInventory"
import { addToInventory } from "@/src/game/inventory/addToInventory"
import { entityGoToEntityWithGround } from "@/src/game/entity/useCase/move/entityGoToEntityWithGround"
import { treeEntityMetaData } from "@/src/game/entity/app/ressource/tree/TreeEntity"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"

interface CutTheWoodDataInterface {
  treeEntityIri?: JsonLdIri
  timberHouseEntityIri?: JsonLdIri
}

export const cutTheWoodActionMetaData: ActionMetadataInterface<CutTheWoodDataInterface> =
  {
    ["@type"]: JsonLdTypeFactory(appLdType.typeAction, "cutTheWood"),
    onFrame: ({ entity, action, game }) => {
      const data = action.data
      if (!entity) return

      if (entity.state === EntityState.go_to_tree) {
        const newTreeEntity =
          data.treeEntityIri && game.entities[data.treeEntityIri]
            ? game.entities[data.treeEntityIri]
            : (findClosestInGame(entity, treeEntityMetaData["@type"], game) as
                | EntityInterface
                | undefined)

        if (!newTreeEntity) {
          entity.state = EntityState.wait
          return
        }

        data.treeEntityIri = newTreeEntity["@id"]

        entityGoToEntityWithGround(entity, newTreeEntity, game)

        if (entity?.currentPathOfCoordinate?.isFinish) {
          newTreeEntity.life -= 10
          entity.state = EntityState.cut_the_tree
        }
      }

      if (entity.state === EntityState.cut_the_tree) {
        addToInventory(entity.inventory, woodRessourceMetadata["@type"], 1)
        const woodRessource = getInventoryItem(
          entity.inventory,
          woodRessourceMetadata["@type"],
        )
        if (woodRessource.quantity > 50) {
          entity.state = EntityState.go_to_put_ressource
        }
      }

      if (entity.state === EntityState.go_to_put_ressource) {
        const newTimberHouseEntity = data.timberHouseEntityIri
          ? game.entities[data.timberHouseEntityIri]
          : (findClosestInGame(entity, appLdType.timberHouse, game) as
              | EntityInterface
              | undefined)

        if (!newTimberHouseEntity) return

        data.timberHouseEntityIri = newTimberHouseEntity["@id"]
        entityGoToEntityWithGround(entity, newTimberHouseEntity, game)

        if (entity?.currentPathOfCoordinate?.isFinish) {
          transfertInventory(
            entity.inventory,
            game.inventory,
            woodRessourceMetadata["@type"],
            10,
          )

          entity.state = EntityState.go_to_tree
        }
      }
    },
    factory: () => {
      return jsonLdFactory(cutTheWoodActionMetaData["@type"], {})
    },
  }
