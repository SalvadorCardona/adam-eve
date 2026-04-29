import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"
import { EntityState } from "@/packages/game/entity/EntityState"
import { keysPressed } from "@/packages/ui/keysState"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { updateGame } from "@/packages/game/game/updateGame"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { bloodEntityResource } from "@/app/entity/effect/blood/BloodEntityResource"
import { hasCollisionInGame, hasCollisionWithGround } from "@/packages/game/entity/useCase/entityHasCollision"
import { PlayerComponent } from "./PlayerComponent"
import healthyIcon from "./player_healthy.svg?url"

const PLAYER_SPEED = 0.03

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
  },
  defaultEntity: () => ({ faction: EntityFaction.self }),
  component: PlayerComponent,
  onFrame: ({ entity, game }) => {
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

    if (keysPressed["ArrowUp"] && tryMoveAxis("z", -PLAYER_SPEED)) {
      entity.state = EntityState.move
      moved = true
    }
    if (keysPressed["ArrowDown"] && tryMoveAxis("z", PLAYER_SPEED)) {
      entity.state = EntityState.move
      moved = true
    }
    if (keysPressed["ArrowLeft"] && tryMoveAxis("x", -PLAYER_SPEED)) {
      entity.rotation = -1
      entity.state = EntityState.move
      moved = true
    }
    if (keysPressed["ArrowRight"] && tryMoveAxis("x", PLAYER_SPEED)) {
      entity.rotation = 1
      entity.state = EntityState.move
      moved = true
    }

    if (!moved && entity.state === EntityState.move) {
      entity.state = EntityState.wait
    }

    if (moved) {
      updateEntityInGame(game, entity)

      const zoom = game.camera.zoom
      game.camera.position.x = window.innerWidth / 2 - entity.position.x * zoom
      game.camera.position.z = window.innerHeight / 2 - entity.position.z * zoom
      updateGame(game, game.camera)
    }
  },
  onHit: ({ entity, game }) => {
    const blood = bloodEntityResource.create({
      game,
      item: { position: entity.position },
    })
    addEntityToGame(game, blood)
  },
})
