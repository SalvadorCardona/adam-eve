import { Vector3Interface } from "@/app/domain/3D/Vector"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { currentGame } from "@/app/domain/game/gameFactory"
import { MetaDataInterface } from "@/app/domain/MetaDataInterface"
import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { addEntityToGame } from "@/app/domain/entity/addEntityToGame"

export enum ActionControllerList {
  SelectedEntity = "SelectedEntity",
  BuildRequest = "BuildRequest",
  ClickOnEntity = "ClickOnEntity",
  ClickOnMap = "ClickOnMap",
}

interface PayloadInterface {
  positon?: Vector3Interface
  type?: "click"
  entity?: EntityInterface
  metaData?: MetaDataInterface
  action: ActionControllerList
}

export function controller({
  positon,
  type,
  entity,
  action,
  metaData,
}: PayloadInterface): void {
  const game = currentGame()
  if (entity && ActionControllerList.ClickOnEntity === action) {
    game.entitySelection = entity
  }

  if (positon && ActionControllerList.ClickOnMap === action) {
    if (game.entityShouldBeCreated) {
      const metaInterface = game.entityShouldBeCreated as EntityMetaDataInterface
      const newEntity = metaInterface.factory({
        entity: {
          position: {
            z: Math.round(positon.z),
            y: Math.round(positon.y ?? 0),
            x: Math.round(positon.x),
          },
        },
      })

      addEntityToGame(game, newEntity)
    }
  }

  if (metaData && ActionControllerList.BuildRequest === action) {
    game.entityShouldBeCreated = metaData as EntityMetaDataInterface
  }
}
