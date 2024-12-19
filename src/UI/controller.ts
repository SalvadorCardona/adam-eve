import { aroundVector, Vector3Interface } from "@/src/game/3D/Vector"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { currentGame } from "@/src/game/game/gameFactory"
import { GameMetaDataInterface } from "@/src/game/GameMetaDataInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { playSound } from "@/src/game/3D/playSong"

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
  metaData?: GameMetaDataInterface
  action: ActionControllerList
}

export function controller({
  positon,
  entity,
  action,
  metaData,
}: PayloadInterface): void {
  const game = currentGame()
  if (entity && ActionControllerList.ClickOnEntity === action) {
    game.userControl.entitySelection = entity
  }

  if (
    positon &&
    ActionControllerList.ClickOnMap === action &&
    game.userControl.entityShouldBeCreated
  ) {
    const metaInterface = game.userControl
      .entityShouldBeCreated as EntityMetaDataInterface
    const newEntity = metaInterface.factory({
      entity: {
        position: aroundVector(positon),
      },
    })

    playSound("build_song.mp3")

    addEntityToGame(game, newEntity)
  }

  if (metaData && ActionControllerList.BuildRequest === action) {
    game.userControl.entityShouldBeCreated = metaData as EntityMetaDataInterface
  }
}
