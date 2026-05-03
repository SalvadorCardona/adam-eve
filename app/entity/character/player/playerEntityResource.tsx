import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityResourceInterface, EntityType } from "@/packages/game/entity/EntityResourceInterface"
import EntityInterface, { EntityFaction } from "@/packages/game/entity/EntityInterface"
import { EntityState } from "@/packages/game/entity/EntityState"
import { keysPressed } from "@/packages/ui/keysState"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { updateGame } from "@/packages/game/game/updateGame"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { bloodEntityResource } from "@/app/entity/effect/blood/BloodEntityResource"
import { hasCollisionInGame, hasCollisionWithGround } from "@/packages/game/entity/useCase/entityHasCollision"
import { playerAttackActionResource } from "@/app/entity/character/player/playerAttackActionResource"
import { addActionToEntity } from "@/packages/game/action/AddActionToEntity"
import { getByLdTypeIn } from "@/packages/jsonLd/jsonLd"
import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"
import { getResource } from "@/packages/resource/ResourceInterface"
import { createEntity } from "@/packages/game/entity/createEntity"
import GameInterface from "@/packages/game/game/GameInterface"
import { Vector3Interface, createVector3 } from "@/packages/math/vector"
import { roundVectorToDown } from "@/packages/math/round"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { playerBuildUserActionMetadata } from "@/app/actionUser/PlayerBuildUserAction/playerBuildUserActionMetadata"
import { hasActionUser } from "@/packages/game/actionUser/hasActionUser"
import { PlayerComponent } from "./PlayerComponent"
import healthyIcon from "./icon.png"
import { expandWorldAroundPlayer } from "@/app/game/proceduralSpawn"

const PLAYER_SPEED = 0.03

export type PlayerFacing = "north" | "south" | "east" | "west"

let currentPlayerEntity: EntityInterface | undefined
let wasSpacePressed = false
let wasEnterPressed = false
let wasEscapePressed = false
let playerFacing: PlayerFacing = "south"

export function getCurrentPlayerEntity(game: GameInterface): EntityInterface | undefined {
  if (currentPlayerEntity && game.entities[currentPlayerEntity["@id"]]) {
    return currentPlayerEntity
  }
  const found = entityQueryFindOne<EntityInterface>(game, {
    "@type": "resource/player",
  })
  currentPlayerEntity = found
  return found
}

export function getPlayerFacing(): PlayerFacing {
  return playerFacing
}

function getPendingBuildResource(game: GameInterface): EntityResourceInterface | undefined {
  if (!hasActionUser(game, playerBuildUserActionMetadata)) return undefined
  return playerBuildUserActionMetadata.data.entityMetaData
}

export function getPlayerBuildPosition(
  player: EntityInterface,
  buildingResource?: EntityResourceInterface,
): Vector3Interface {
  const playerSize = player.size?.x ?? 0.7
  const buildingSize = buildingResource?.propriety?.size?.x ?? 1
  const offset = playerSize / 2 + buildingSize / 2 + 0.5
  const px = player.position.x + playerSize / 2
  const pz = player.position.z + playerSize / 2
  let cx = px
  let cz = pz
  switch (playerFacing) {
    case "north":
      cz = pz - offset
      break
    case "south":
      cz = pz + offset
      break
    case "east":
      cx = px + offset
      break
    case "west":
      cx = px - offset
      break
  }
  return createVector3(
    cx - buildingSize / 2,
    player.position.y,
    cz - buildingSize / 2,
  )
}

export const playerEntityResource = createEntityResource({
  ["@id"]: "resource/player",
  entityType: EntityType.character,
  label: "Joueur",
  asset: {
    model2d: healthyIcon,
    icon: healthyIcon,
    asset2d: [healthyIcon],
  },
  propriety: {
    speed: PLAYER_SPEED,
    inventorySize: 20,
    attack: {
      damage: 5,
      attackRange: 1.5,
      attackSpeed: 30,
    },
    vision: {
      range: 6,
    },
    size: {
      x: 0.7,
      y: 0.7,
      z: 0.7,
    },
    health: {
      maxLife: 100,
    },
    defaultActions: [playerAttackActionResource["@id"]!],
  },
  defaultEntity: () => ({ faction: EntityFaction.self }),
  create: (payload: any): EntityInterface => {
    const game = payload?.game
    if (game) {
      const existing = getCurrentPlayerEntity(game)
      if (existing) return existing
    }
    const entity = createEntity(payload)
    currentPlayerEntity = entity
    return entity
  },
  component: PlayerComponent,
  onFrame: ({ entity, game }) => {
    if (
      !entity.actions ||
      getByLdTypeIn(entity.actions, playerAttackActionResource["@id"]!).length === 0
    ) {
      const meta = getResource<ActionResourceInterface>(playerAttackActionResource)
      if (meta) addActionToEntity(entity, meta.create({ item: { entity } }))
    }

    expandWorldAroundPlayer(game, entity)

    const tryMoveAxis = (axis: "x" | "z", delta: number): boolean => {
      const previous = entity.position[axis]
      entity.position[axis] = previous + delta
      const blockedByEntity = hasCollisionInGame(game, entity)
      const onGround = hasCollisionWithGround(game, entity)
      if (!onGround || blockedByEntity) {
        entity.position[axis] = previous
        return false
      }
      return true
    }

    let moved = false

    if (keysPressed["ArrowUp"]) {
      playerFacing = "north"
      if (tryMoveAxis("z", -PLAYER_SPEED)) moved = true
    }
    if (keysPressed["ArrowDown"]) {
      playerFacing = "south"
      if (tryMoveAxis("z", PLAYER_SPEED)) moved = true
    }
    if (keysPressed["ArrowLeft"]) {
      playerFacing = "west"
      entity.rotation = -1
      if (tryMoveAxis("x", -PLAYER_SPEED)) moved = true
    }
    if (keysPressed["ArrowRight"]) {
      playerFacing = "east"
      entity.rotation = 1
      if (tryMoveAxis("x", PLAYER_SPEED)) moved = true
    }

    const pendingBuildResource = getPendingBuildResource(game)
    const isInConstructionMode = !!pendingBuildResource

    if (moved) {
      entity.state = EntityState.move
    } else if (isInConstructionMode) {
      entity.state = EntityState.construction
    } else if (
      entity.state === EntityState.move ||
      entity.state === EntityState.construction
    ) {
      entity.state = EntityState.wait
    }

    if (moved) {
      updateEntityInGame(game, entity)

      const zoom = game.camera.zoom
      game.camera.position.x = window.innerWidth / 2 - entity.position.x * zoom
      game.camera.position.z = window.innerHeight / 2 - entity.position.z * zoom
      updateGame(game, game.camera)
    }

    const isSpacePressed = !!keysPressed["Space"]
    if (isSpacePressed && !wasSpacePressed) {
      game.userControl.entitySelected = entity["@id"]
      const zoom = game.camera.zoom
      game.camera.position.x = window.innerWidth / 2 - entity.position.x * zoom
      game.camera.position.z = window.innerHeight / 2 - entity.position.z * zoom
      updateGame(game, game.userControl)
      updateGame(game, game.camera)
    }
    wasSpacePressed = isSpacePressed

    const isEnterPressed = !!keysPressed["Enter"]
    if (isEnterPressed && !wasEnterPressed && pendingBuildResource) {
      const buildPosition = roundVectorToDown(
        getPlayerBuildPosition(entity, pendingBuildResource),
      )
      const ghost = pendingBuildResource.create({
        game,
        item: { position: buildPosition },
      })
      if (pendingBuildResource.canBeBuild({ entity: ghost, game })) {
        addEntityToGame(game, ghost)
        playerBuildUserActionMetadata.data.entityMetaData = undefined
        game.userControl.currentAction = undefined
        updateGame(game, game.userControl)
      }
    }
    wasEnterPressed = isEnterPressed

    const isEscapePressed = !!keysPressed["Escape"]
    if (isEscapePressed && !wasEscapePressed && pendingBuildResource) {
      playerBuildUserActionMetadata.data.entityMetaData = undefined
      game.userControl.currentAction = undefined
      updateGame(game, game.userControl)
    }
    wasEscapePressed = isEscapePressed
  },
  onHit: ({ entity, game }) => {
    const blood = bloodEntityResource.create({
      game,
      item: { position: entity.position },
    })
    addEntityToGame(game, blood)
  },
})
