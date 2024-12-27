import imageSource from "./port.glb?url"
import imageIcon from "./icon.png?url"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"

export const portEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    model3d: imageSource,
    icon: imageIcon,
  },
  propriety: {
    ressourceForConstruction: {
      [woodRessourceMetadata["@type"]]: woodRessourceMetadata.factory({
        quantity: 10,
      }),
    },
  },
  ["@type"]: "entity/building/port",
  defaultEntity: () => {
    const entity: Partial<EntityInterface> = {
      speed: 0.1,
      life: 50,
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
    }

    return entity
  },
})
