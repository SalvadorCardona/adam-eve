import GameInterface from "@/packages/game/game/GameInterface"
import { ActionBagInterface } from "@/packages/game/action/ActionBagInterface"
import EntityInterface, {
  BuildingEntityInterface,
  isGroundEntity,
} from "@/packages/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { getResource } from "@/packages/resource/ResourceInterface"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"

export function gameProcessor(game: GameInterface) {
  game.time++

  actionProcesseur(game.actions, game)

  const entities = game.entities
  for (const id in entities) {
    const entity = entities[id]
    if (isGroundEntity(entity)) continue

    const entityMetaData = getResource(entity) as EntityResourceInterface | undefined
    entityMetaData?.onFrame?.({ entity, game })

    if (entity.actions) {
      actionProcesseur(entity.actions, game, entity as BuildingEntityInterface)
    }
  }

  return game
}

// Module-level scratch slots: avoids per-tick allocation of a snapshot object.
let snapPosX = 0
let snapPosY = 0
let snapPosZ = 0
let snapState: string | undefined = undefined
let snapRotation: number | undefined = undefined
let snapLife: number | undefined = undefined
let snapHidden = false

function snapshotEntity(entity: EntityInterface): void {
  snapPosX = entity.position.x
  snapPosY = entity.position.y
  snapPosZ = entity.position.z
  snapState = entity.state
  snapRotation = entity.rotation
  snapLife = entity.life
  snapHidden = !!entity.hidden
}

function entityChangedSinceSnapshot(entity: EntityInterface): boolean {
  return (
    entity.position.x !== snapPosX ||
    entity.position.y !== snapPosY ||
    entity.position.z !== snapPosZ ||
    entity.state !== snapState ||
    entity.rotation !== snapRotation ||
    entity.life !== snapLife ||
    !!entity.hidden !== snapHidden
  )
}

function actionProcesseur(
  actionBag: ActionBagInterface,
  game: GameInterface,
  entity?: BuildingEntityInterface,
): void {
  for (const id in actionBag) {
    const action = actionBag[id]
    if (action?.nextTick && action.nextTick > game.time) continue

    action.nextTick = undefined
    const actionMeta = getResource<ActionResourceInterface>(action)

    if (!entity) {
      actionMeta?.onFrame?.({ entity, action, game })
      continue
    }

    snapshotEntity(entity)
    actionMeta?.onFrame?.({ entity, action, game })

    if (entityChangedSinceSnapshot(entity)) {
      updateEntityInGame(game, entity)
    }
  }
}
